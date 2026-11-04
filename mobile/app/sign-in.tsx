import { useState } from 'react';
import { KeyboardAvoidingView, TextInput, View } from 'react-native';
import { T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { supabase } from '@/lib/supabase';
import { Image } from 'react-native';
import { UI_SRC } from '@/lib/ui-assets';

export default function SignIn() {
  const t = useTheme(); const [mode, setMode] = useState<'in' | 'up' | 'reset'>('in');
  const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [msg, setMsg] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
  const go = async () => {
    if (!supabase) return; setBusy(true); setErr(''); setMsg('');
    const r = mode === 'in' ? await supabase.auth.signInWithPassword({ email, password: pw }) : mode === 'up' ? await supabase.auth.signUp({ email, password: pw }) : await supabase.auth.resetPasswordForEmail(email);
    setBusy(false);
    if (r.error) return setErr(r.error.message);
    if (mode === 'up') setMsg('Check your email to confirm, then sign in.'); if (mode === 'reset') setMsg('Reset link sent.');
  };
  const input = { backgroundColor: t.card, color: t.text, borderRadius: 16, padding: 16, fontSize: 17, borderWidth: 1, borderColor: t.line } as const;
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: t.bg, justifyContent: 'center', padding: 24, gap: 12 }}>
      <Image source={UI_SRC['logo-full']} style={{ width: 190, height: 149, alignSelf: 'center' }} resizeMode="contain" accessibilityLabel="Lumino" />
      <T color={t.muted} style={{ textAlign: 'center', marginBottom: 10 }}>{mode === 'up' ? 'Create your account' : mode === 'reset' ? 'Reset your password' : 'Study smarter, together.'}</T>
      <TextInput placeholder="Email" placeholderTextColor={t.muted} autoCapitalize="none" keyboardType="email-address" textContentType="emailAddress" autoComplete="email" value={email} onChangeText={setEmail} style={input} />
      {mode !== 'reset' && <TextInput placeholder="Password (8+ characters)" placeholderTextColor={t.muted} secureTextEntry textContentType={mode === 'up' ? 'newPassword' : 'password'} value={pw} onChangeText={setPw} style={input} />}
      <Button title={busy ? '…' : mode === 'up' ? 'Sign up' : mode === 'reset' ? 'Send link' : 'Sign in'} onPress={go} disabled={busy} />
      {!!err && <T color={t.bad} style={{ textAlign: 'center' }}>{err}</T>}{!!msg && <T color={t.ok} style={{ textAlign: 'center' }}>{msg}</T>}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 6 }}>
        {mode !== 'in' && <T color={t.accent} weight="700" onPress={() => setMode('in')}>Sign in</T>}
        {mode !== 'up' && <T color={t.accent} weight="700" onPress={() => setMode('up')}>Create account</T>}
        {mode === 'in' && <T color={t.accent} weight="700" onPress={() => setMode('reset')}>Forgot password?</T>}
      </View>
    </KeyboardAvoidingView>
  );
}
