import { useEffect, useRef, useState } from 'react';
import { Room, RoomEvent, Track, type RemoteTrack, type Participant, AudioPresets, VideoPresets } from 'livekit-client';
import { getCallToken } from '../lib/api';

// Group voice/video call. Peer media is encrypted in transit and never recorded.
// Audio tuned for iPhone + MacBook: echo cancellation (laptop speakers bleed into the mic),
// noise suppression, auto gain, mono 48 kHz speech preset, and iOS-safe playback.
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

export default function Call({ groupId, onLeave }: { groupId: string; onLeave: () => void }) {
  const room = useRef<Room | null>(null);
  const [people, setPeople] = useState<Participant[]>([]);
  const [muted, setMuted] = useState(false); const [video, setVideo] = useState(false);
  const [needsTap, setNeedsTap] = useState(false); const [status, setStatus] = useState('Connecting…'); const [err, setErr] = useState('');
  const [speaker, setSpeaker] = useState(true); const audioEls = useRef(new Map<string, HTMLAudioElement>());

  useEffect(() => {
    let cancelled = false;
    const r = new Room({
      adaptiveStream: true, dynacast: true,
      audioCaptureDefaults: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1, sampleRate: 48000 },
      publishDefaults: { audioPreset: AudioPresets.speech, dtx: true, red: true, videoSimulcastLayers: [VideoPresets.h180, VideoPresets.h360] },
      videoCaptureDefaults: { resolution: VideoPresets.h540.resolution, facingMode: 'user' },
    });
    room.current = r;
    const refresh = () => setPeople([r.localParticipant, ...r.remoteParticipants.values()]);
    r.on(RoomEvent.ParticipantConnected, refresh).on(RoomEvent.ParticipantDisconnected, refresh)
      .on(RoomEvent.TrackMuted, refresh).on(RoomEvent.TrackUnmuted, refresh).on(RoomEvent.LocalTrackPublished, refresh).on(RoomEvent.LocalTrackUnpublished, refresh)
      .on(RoomEvent.ActiveSpeakersChanged, refresh)
      .on(RoomEvent.AudioPlaybackStatusChanged, () => setNeedsTap(!r.canPlaybackAudio))
      .on(RoomEvent.TrackSubscribed, (track: RemoteTrack, _p, participant) => {
        if (track.kind === Track.Kind.Audio) {
          const el = track.attach() as HTMLAudioElement; el.setAttribute('playsinline', 'true'); el.autoplay = true;
          document.body.appendChild(el); audioEls.current.set(participant.identity + track.sid, el);
        }
        refresh();
      })
      .on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => { track.detach().forEach(el => el.remove()); refresh(); })
      .on(RoomEvent.Disconnected, () => setStatus('Disconnected'))
      .on(RoomEvent.Reconnecting, () => setStatus('Reconnecting…')).on(RoomEvent.Reconnected, () => setStatus(''));

    (async () => {
      try {
        const { token, url } = await getCallToken(groupId);
        if (cancelled) return;
        await r.connect(url, token);
        await r.localParticipant.setMicrophoneEnabled(true);
        // iOS Safari only plays remote audio after a user gesture; joining was a tap, so try now.
        await r.startAudio().catch(() => setNeedsTap(true));
        setStatus(''); refresh();
      } catch (e) { setErr((e as Error).message); setStatus(''); }
    })();
    return () => { cancelled = true; r.disconnect(); audioEls.current.forEach(el => el.remove()); audioEls.current.clear(); };
  }, [groupId]);

  const toggleMute = async () => { const r = room.current; if (!r) return; await r.localParticipant.setMicrophoneEnabled(muted); setMuted(!muted); };
  const toggleVideo = async () => { const r = room.current; if (!r) return; try { await r.localParticipant.setCameraEnabled(!video); setVideo(!video); } catch (e) { setErr((e as Error).message); } };
  // Desktop browsers can pick an output device (e.g. MacBook speakers vs headphones). iOS routes audio itself.
  const toggleSpeaker = () => { audioEls.current.forEach(el => { el.volume = speaker ? 0.35 : 1; }); setSpeaker(!speaker); };
  const leave = () => { room.current?.disconnect(); onLeave(); };

  return (
    <div className="call">
      <div className="row between"><b>📞 Group call</b><span className="muted small">🔒 Encrypted · not recorded</span></div>
      {status && <p className="muted">{status}</p>}
      {err && <p className="wrong">{err}</p>}
      {needsTap && <button className="tapaudio" onClick={async () => { await room.current?.startAudio(); setNeedsTap(false); }}>🔊 Tap to hear the call</button>}
      <div className="tiles">{people.map(p => <Tile key={p.identity} p={p} />)}</div>
      <div className="callbar">
        <button className={muted ? 'bad' : 'ghost'} onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>{muted ? '🔇' : '🎙️'}</button>
        <button className={video ? '' : 'ghost'} onClick={toggleVideo} aria-label="Camera">{video ? '📹' : '📷'}</button>
        {!isIOS && <button className="ghost" onClick={toggleSpeaker} aria-label="Volume">{speaker ? '🔊' : '🔉'}</button>}
        <button className="bad" onClick={leave}>Leave</button>
      </div>
    </div>
  );
}

function Tile({ p }: { p: Participant }) {
  const ref = useRef<HTMLVideoElement>(null);
  const cam = p.getTrackPublication(Track.Source.Camera);
  const track = cam?.track && !cam.isMuted ? cam.track : undefined;
  useEffect(() => { if (track && ref.current) { track.attach(ref.current); return () => { track.detach(ref.current!); }; } }, [track]);
  const mic = p.getTrackPublication(Track.Source.Microphone);
  return (
    <div className={'tile' + (p.isSpeaking ? ' speaking' : '')}>
      {track ? <video ref={ref} autoPlay playsInline muted={p.isLocal} /> : <div className="avatar">{(p.name || '?').slice(0, 1).toUpperCase()}</div>}
      <span className="tname">{p.name}{p.isLocal ? ' (you)' : ''} {!mic || mic.isMuted ? '🔇' : ''}</span>
    </div>
  );
}
