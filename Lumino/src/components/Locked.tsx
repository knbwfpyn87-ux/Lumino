import { Link } from 'react-router-dom';
import { PLAN_INFO, type Tier } from '../lib/plans';
export default function Locked({ tier, what }: { tier: Tier; what: string }) {
  return (
    <div className="locked">
      <div className="big">🔒</div>
      <h2>{what} is part of {PLAN_INFO[tier].name}</h2>
      <p className="muted">Unlock it for {PLAN_INFO[tier].price}. Cancel anytime.</p>
      <Link to="/pricing"><button>See plans</button></Link>
    </div>
  );
}
