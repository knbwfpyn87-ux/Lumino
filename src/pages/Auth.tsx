import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/auth';

type Mode = 'signin' | 'signup' | 'reset';

export function SignIn({ logo }: { logo: string }) {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!supabase) return; setBusy(true); setErr(''); setMsg('');
    const redirect = window.location.origin + window.location.pathname;
    const r = mode === 'signin' ? await supabase.auth.signInWithPassword({ email, password })
      : mode === 'signup' ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirect } })
      : await supabase.auth.resetPasswordForEmail(email, { redirectTo: redirect });
    setBusy(false);
    if (r.error) return setErr(r.error.message);
    if (mode === 'signup' && !('session' in (r.data ?? {}) && (r.data as { session: unknown }).session)) setMsg('Check your email to confirm your account, then sign in.');
    if (mode === 'reset') setMsg('Password reset link sent. Check your email.');
  };
  const google = () => supabase?.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } });

  return (
    <div className="auth">
      <form className="authcard" onSubmit={submit}>
        <img src={logo} alt="" className="authlogo" />
        <h1>Lumino</h1>
        <p className="muted">{mode === 'signup' ? 'Create your account' : mode === 'reset' ? 'Reset your password' : 'Welcome back. Keep that streak going 🔥'}</p>
        <input type="email" required placeholder="Email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} />
        {mode !== 'reset' && <input type="password" required minLength={8} placeholder="Password (8+ characters)" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} />}
        <button disabled={busy}>{busy ? '…' : mode === 'signup' ? 'Sign up' : mode === 'reset' ? 'Send reset link' : 'Sign in'}</button>
        {mode !== 'reset' && <button type="button" className="ghost" onClick={google}>Continue with Google</button>}
        {err && <p className="wrong">{err}</p>}{msg && <p className="note">{msg}</p>}
        <p className="muted small">
          {mode === 'signin' ? <>New here? <a onClick={() => setMode('signup')}>Create an account</a> · <a onClick={() => setMode('reset')}>Forgot password?</a></>
            : <>Have an account? <a onClick={() => setMode('signin')}>Sign in</a></>}
        </p>
      </form>
    </div>
  );
}

// Shown once after sign-up to pick a username and role.
export function Onboarding({ logo }: { logo: string }) {
  const { session, refresh, signOut } = useAuth();
  const [username, setUsername] = useState(''); const [role, setRole] = useState('student'); const [level, setLevel] = useState('high_school'); const [birthYear, setBirthYear] = useState(''); const [agree, setAgree] = useState(false);
  const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const save = async (e: React.FormEvent) => {
    e.preventDefault(); if (!supabase || !session) return; setErr('');
    const y = Number(birthYear), age = new Date().getFullYear() - y;
    if (!y || y < 1900) return setErr('Enter your birth year.');
    if (age < 13) return setErr('Sorry, you need to be at least 13 to use Lumino.');
    if (!agree) return setErr('Please accept the Terms and Privacy Policy.');
    setBusy(true);
    const { error } = await supabase.from('profiles').insert({ id: session.user.id, username: username.trim(), role, school_level: level, birth_year: y });
    setBusy(false);
    if (error) return setErr(error.code === '23505' ? 'That username is taken.' : error.message);
    await refresh();
  };
  return (
    <div className="auth">
      <form className="authcard" onSubmit={save}>
        <img src={logo} alt="" className="authlogo" />
        <h1>Set up your profile</h1>
        <input required minLength={2} maxLength={30} placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <div className="seg">{[['student', '🎒 Student'], ['teacher', '🍎 Teacher']].map(([v, l]) => <button type="button" key={v} className={role === v ? '' : 'ghost'} onClick={() => setRole(v)}>{l}</button>)}</div>
        <div className="seg">{[['high_school', 'High school'], ['college', 'College']].map(([v, l]) => <button type="button" key={v} className={level === v ? '' : 'ghost'} onClick={() => setLevel(v)}>{l}</button>)}</div>
        <input inputMode="numeric" maxLength={4} placeholder="Birth year (e.g. 2009)" value={birthYear} onChange={e => setBirthYear(e.target.value.replace(/\D/g, ''))} />
        <label className="small muted" style={{ textAlign: 'left' }}><input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} /> I agree to the <a href="#/terms" target="_blank">Terms</a> and <a href="#/privacy" target="_blank">Privacy Policy</a>{' '}(under 18: with a parent's OK)</label>
        <button disabled={busy}>Let's go</button>
        {err && <p className="wrong">{err}</p>}
        <p className="muted small"><a onClick={signOut}>Sign out</a></p>
      </form>
    </div>
  );
}
