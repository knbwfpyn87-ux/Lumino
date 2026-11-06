// Google Classroom connection status for the Upcoming Assignments panel.
import { useEffect, useState } from 'react';
import { useAuth } from '../lib/auth';
import { connectClassroom, syncClassroom, disconnectClassroom, getClassroomState } from '../lib/classroom';
import { isCloud } from '../lib/supabase';

export default function ClassroomConnect() {
  const { session } = useAuth(); const [st, setSt] = useState(getClassroomState()); const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  useEffect(() => { const h = () => setSt(getClassroomState()); window.addEventListener('lumino:classroom', h); return () => window.removeEventListener('lumino:classroom', h); }, []);
  // Shown once the server side is set up (see README → Google Classroom sync): build with VITE_ENABLE_CLASSROOM=true.
  if (!isCloud || !session || (import.meta.env.VITE_ENABLE_CLASSROOM !== 'true' && !st.connected)) return null;
  const ago = st.lastSync ? Math.round((Date.now() - st.lastSync) / 60000) : null;
  if (!st.connected) return (
    <div className="gcconnect">
      <button className="ghost small" disabled={busy} onClick={async () => { setBusy(true); setErr(''); try { await connectClassroom(); } catch (e) { setErr((e as Error).message); setBusy(false); } }}>🏫 Connect Google Classroom</button>
      {(err || st.error) && <span className="small bad">{err || st.error}</span>}
    </div>);
  return (
    <div className="gcconnect">
      <span className="small muted">🏫 Synced from Google Classroom{ago != null ? ` · ${ago < 1 ? 'just now' : `${ago} min ago`}` : ''}</span>
      <button className="link small" disabled={busy} onClick={async () => { setBusy(true); await syncClassroom(true); setBusy(false); }}>{busy ? 'Syncing…' : 'Sync now'}</button>
      <button className="link small" onClick={() => { if (confirm('Disconnect Google Classroom? Imported assignments that aren\'t done will be removed.')) disconnectClassroom(); }}>Disconnect</button>
      {st.error && <span className="small bad">{st.error}</span>}
    </div>);
}
