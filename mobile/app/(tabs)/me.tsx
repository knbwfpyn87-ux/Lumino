import { Alert, Linking, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Screen, Card, T, Button, Bar } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { useAuth } from '@/lib/auth';
import { useProgress, levelOf, setGoal } from '@/lib/progress';
import { isCloud, SITE_URL } from '@/lib/supabase';
import { PLAN_INFO, type Plan } from '@shared/plans';

export default function Me() {
  const t = useTheme(); const { profile, session, signOut } = useAuth(); const p = useProgress(); const L = levelOf(p.xp);
  const plan: Plan = profile?.plan ?? 'free'; const info = PLAN_INFO[plan];
  return (
    <Screen>
      <View style={{ alignItems: 'center', gap: 6, marginTop: 10 }}>
        <View style={{ width: 86, height: 86, borderRadius: 43, backgroundColor: t.accent, alignItems: 'center', justifyContent: 'center' }}><T size={36} weight="900" color={t.onAccent}>{(profile?.username ?? 'S').slice(0, 1).toUpperCase()}</T></View>
        <T size={24} weight="900">{profile?.username ?? 'Student'}</T>
        {session?.user.email && <T color={t.muted}>{session.user.email}</T>}
      </View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        {[['🔥', p.streak, 'streak'], ['⚡️', L.lvl, 'level'], ['⭐️', p.xp, 'total XP']].map(([e, v, l]) => (
          <Card key={String(l)} style={{ flex: 1, alignItems: 'center', gap: 2 }}><T size={22}>{e}</T><T size={22} weight="900">{v}</T><T size={12} color={t.muted}>{l}</T></Card>))}
      </View>
      <Card style={{ gap: 8 }}>
        <T weight="800">Level {L.lvl}</T><Bar pct={(L.into / L.need) * 100} /><T size={13} color={t.muted}>{L.need - L.into} XP to level {L.lvl + 1}</T>
        <T weight="800" style={{ marginTop: 8 }}>Daily goal</T>
        <View style={{ flexDirection: 'row', gap: 8 }}>{[50, 100, 200, 300].map(g => <Button key={g} title={`${g}`} kind={p.goal === g ? 'primary' : 'ghost'} style={{ flex: 1, minHeight: 42 }} onPress={() => setGoal(g)} />)}</View>
      </Card>
      <Card style={{ gap: 6 }}>
        <T weight="800" size={17}>{info.name} · {info.price}</T>
        {info.features.slice(0, 4).map(f => <T key={f} size={14} color={t.muted}>✓ {f}</T>)}
        {/* Subscriptions are managed on the website (Stripe). See README for App Store rules before enabling purchase links. */}
        <Button title={plan === 'free' ? 'See plans on lumino web' : 'Manage plan on the web'} kind="ghost" style={{ marginTop: 8 }} onPress={() => WebBrowser.openBrowserAsync(`${SITE_URL}#/pricing`)} />
      </Card>
      <Card style={{ gap: 10 }}>
        <Button title="Terms of Use" kind="ghost" onPress={() => WebBrowser.openBrowserAsync(`${SITE_URL}#/terms`)} />
        <Button title="Privacy Policy" kind="ghost" onPress={() => WebBrowser.openBrowserAsync(`${SITE_URL}#/privacy`)} />
        <Button title="Contact support" kind="ghost" onPress={() => Linking.openURL('mailto:support@lumino.example')} />
        {isCloud && <Button title="Sign out" kind="ghost" onPress={signOut} />}
        {isCloud && <Button title="Delete account" kind="danger" onPress={() => Alert.alert('Delete account?', 'This permanently deletes your account and data.', [{ text: 'Cancel', style: 'cancel' }, { text: 'Continue on web', style: 'destructive', onPress: () => WebBrowser.openBrowserAsync(`${SITE_URL}#/account`) }])} />}
      </Card>
    </Screen>
  );
}
