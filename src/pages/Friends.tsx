import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listGroups, listMembers, type GroupInfo } from '../lib/api';
import { useAuth, myName } from '../lib/auth';

const COLORS = ['#38b6ff', '#ffc928', '#b39dff', '#9aa8bd', '#34d399', '#f472b6'];

// Everyone you study with, gathered from your groups.
export default function Friends() {
  const { profile } = useAuth(); const me = myName(profile);
  const [people, setPeople] = useState<{ name: string; groups: string[] }[]>([]); const [groups, setGroups] = useState<GroupInfo[]>([]);
  useEffect(() => { listGroups().then(async gs => { setGroups(gs); const m = new Map<string, string[]>();
    for (const g of gs) for (const n of await listMembers(g.id)) if (n !== me) m.set(n, [...(m.get(n) ?? []), g.name]);
    setPeople([...m].map(([name, gr]) => ({ name, groups: gr }))); }).catch(() => {}); }, [me]);
  return (
    <section>
      <h1 className="greet">Friends</h1>
      <p className="muted">People you study with. Add friends by sharing a group's invite code.</p>
      <div className="grid">{people.map((p, i) => <div key={p.name} className="card friend"><span className="avatar" style={{ background: COLORS[i % COLORS.length] }}>{p.name.slice(0, 1).toUpperCase()}</span><div><b>{p.name}</b><p className="muted small">{p.groups.join(', ')}</p></div></div>)}</div>
      {!people.length && <div className="panel"><p>No friends yet.</p><Link to="/groups"><button>{groups.length ? 'Share a group invite code' : 'Create a study group'}</button></Link></div>}
    </section>
  );
}
