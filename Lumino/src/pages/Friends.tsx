import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listGroups, listMembers, type GroupInfo } from '../lib/api';
import { useAuth, myName } from '../lib/auth';
import { UI } from '../lib/ui';

const FACES = ['avatar-blue', 'avatar-yellow', 'avatar-purple', 'avatar-gray'];

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
      <div className="grid">{people.map((p, i) => <div key={p.name} className="card friend"><img className="face img" src={UI[FACES[i % FACES.length]]} alt="" /><div><b>{p.name}</b><p className="muted small">{p.groups.join(', ')}</p></div></div>)}</div>
      {!people.length && <div className="panel"><p>No friends yet.</p><Link to="/groups"><button>{groups.length ? 'Share a group invite code' : 'Create a study group'}</button></Link></div>}
    </section>
  );
}
