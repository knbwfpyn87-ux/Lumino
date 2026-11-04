import { useEffect, useState } from 'react';
import * as api from '../lib/api';

// Moderators only (profiles.is_moderator). Database rules enforce this too.
export default function Moderation() {
  const [ok, setOk] = useState<boolean | null>(null); const [reports, setReports] = useState<api.Report[]>([]); const [err, setErr] = useState('');
  const load = () => api.listReports().then(setReports).catch(e => setErr(e.message));
  useEffect(() => { api.amModerator().then(m => { setOk(m); if (m) load(); }); }, []);
  if (ok === null) return <p className="muted">Loading…</p>;
  if (!ok) return <p>Moderators only.</p>;
  const act = async (fn: () => Promise<void>) => { try { await fn(); load(); } catch (e) { setErr((e as Error).message); } };
  return (
    <section>
      <h2>🚩 Reports</h2>
      {err && <p className="wrong">{err}</p>}
      {!reports.length && <p className="muted">No open reports. 🎉</p>}
      <div className="list">{reports.map(r => (
        <div key={r.id} className="item col">
          <div className="row between"><b>{r.reason}</b><small className="muted">{new Date(r.created_at).toLocaleString()}</small></div>
          <p className="quote">"{r.message_text}" — {r.reported}</p>
          {r.details && <p className="muted">Reporter note: {r.details}</p>}
          <p className="muted small">Reported by {r.reporter_name}</p>
          <div className="row">
            <button className="ghost" onClick={() => act(() => api.resolveReport(r.id, 'dismissed'))}>Dismiss</button>
            <button onClick={() => act(() => api.resolveReport(r.id, 'actioned'))}>Mark handled</button>
            <button className="bad" onClick={() => { if (confirm(`Ban ${r.reported}? They won't be able to post or join calls.`)) act(async () => { await api.banUser(r.reported_user); await api.resolveReport(r.id, 'actioned'); }); }}>Ban {r.reported}</button>
          </div>
        </div>))}</div>
    </section>
  );
}
