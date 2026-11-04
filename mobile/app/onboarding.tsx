import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, TextInput, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { useAuth } from '@/lib/auth';
import { supabase, SITE_URL } from '@/lib/supabase';

export default function Onboarding() {
  const t = useTheme(); const { session, refresh, signOut } = useAuth();
  const [username, setUsername] = useState(''); const [role, setRole] = useState('student'); const [level, setLevel] = useState('high_school'); const [year, setYear] = useState(''); const [agree, setAgree] = useState(false); const [err, setErr] = useState('');
  const save = async () => {
    const y = Number(year); setErr('');
    if (username.trim().length < 2) return setErr('Pick a username.');
    if (!y || new Date().getFullYear() - y < 13) return setErr('You need to be at least 13 to use Lumino.');
    if (!agree) return setErr('Please accept the Terms and Privacy Policy.');
    const { error } = await supabase!.from('profiles').insert({ id: session!.user.id, username: username.trim(), role, school_level: level, birth_year: y });
    if (error) return setErr(error.code === '23505' ? 'That username is taken.' : error.message);
    await refresh();
  };
  const seg = (opts: [string, string][], val: string, set: (v: string) => void) => <View style={{ flexDirection: 'row', gap: 8 }}>{opts.map(([v, l]) => <Button key={v} title={l} kind={val === v ? 'primary' : 'ghost'} style={{ flex: 1 }} onPress={() => set(v)} />)}</View>;
  const input = { backgroundColor: t.card, color: t.text, borderRadius: 16, padding: 16, fontSize: 17, borderWidth: 1, borderColor: t.line } as const;
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: t.bg, justifyContent: 'center', padding: 24, gap: 12 }}>
      <T size={30} weight="900">Set up your profile</T>
      <TextInput placeholder="Username" placeholderTextColor={t.muted} autoCapitalize="none" value={username} onChangeText={setUsername} style={input} maxLength={30} />
      {seg([['student', '🎒 Student'], ['teacher', '🍎 Teacher']], role, setRole)}
      {seg([['high_school', 'High school'], ['college', 'College']], level, setLevel)}
      <TextInput placeholder="Birth year (e.g. 2009)" placeholderTextColor={t.muted} keyboardType="number-pad" maxLength={4} value={year} onChangeText={v => setYear(v.replace(/\D/g, ''))} style={input} />
      <Pressable onPress={() => setAgree(!agree)} style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <T size={22}>{agree ? '☑️' : '⬜️'}</T>
        <T size={14} color={t.muted} style={{ flex: 1 }}>I agree to the <T size={14} color={t.accent} onPress={() => WebBrowser.openBrowserAsync(`${SITE_URL}#/terms`)}>Terms</T> and <T size={14} color={t.accent} onPress={() => WebBrowser.openBrowserAsync(`${SITE_URL}#/privacy`)}>Privacy Policy</T> (under 18: with a parent's OK)</T>
      </Pressable>
      <Button title="Let's go" onPress={save} />
      {!!err && <T color={t.bad}>{err}</T>}
      <T color={t.muted} style={{ textAlign: 'center' }} onPress={signOut}>Sign out</T>
    </KeyboardAvoidingView>
  );
}
