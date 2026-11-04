import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Screen, Card, T, Button, Bar, Icon } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { useAuth, usePlan } from '@/lib/auth';
import { useProgress, levelOf, lastWeek, getMyClasses } from '@/lib/progress';
import { on } from '@/lib/events';
import { nextLevel, COURSES } from '@/lib/tests';

const greet = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };

export default function Today() {
  const t = useTheme(); const p = useProgress(); const L = levelOf(p.xp); const plan = usePlan(); const { profile } = useAuth();
  const [mine, setMine] = useState(getMyClasses()); useEffect(() => on('planner', () => setMine(getMyClasses())), []);
  const week = lastWeek(p); const goalPct = Math.min(100, (p.todayXp / p.goal) * 100);
  const next = mine.map(id => nextLevel(id, plan)).find(Boolean);
  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View><T size={15} color={t.muted}>{greet()}</T><T size={30} weight="900">{profile?.username ?? 'Student'} 👋</T></View>
        <Pressable onPress={() => router.push('/(tabs)/me')} style={{ alignItems: 'center', backgroundColor: t.card, borderRadius: 18, paddingHorizontal: 14, paddingVertical: 8, borderWidth: 1, borderColor: t.line }}>
          <T size={22} weight="900">🔥 {p.streak}</T><T size={11} color={t.muted}>day streak</T>
        </Pressable>
      </View>

      <LinearGradient colors={t.bg === '#0f111a' ? ['#1b2840', '#2a2516'] : ['#e3f4ff', '#fff3c4']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 26, padding: 20, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flex: 1, gap: 8 }}>
          <T size={13} weight="800" color={t.accent}>TODAY'S MISSION</T>
          <T size={22} weight="900">{goalPct >= 100 ? 'Mission complete! 🎉' : `Earn ${p.goal - p.todayXp} more XP`}</T>
          <Bar pct={goalPct} height={12} />
          <T size={13} color={t.muted}>{p.todayXp}/{p.goal} XP · Level {L.lvl}</T>
        </View>
        <T size={64}>💡</T>
      </LinearGradient>

      <Card onPress={() => router.push(`/quiz/sprint~${Date.now() % 1e9}`)} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: t.yellow, alignItems: 'center', justifyContent: 'center' }}><T size={26}>⚡️</T></View>
        <View style={{ flex: 1 }}><T weight="800" size={17}>60-second sprint</T><T size={13} color={t.muted}>5 quick questions from your classes</T></View>
        <Icon ios="chevron.right" size={18} color={t.muted} />
      </Card>

      {next ? (
        <Card onPress={() => router.push(next.locked ? '/(tabs)/me' : `/quiz/${next.id}`)}>
          <T size={13} weight="800" color={t.accent}>CONTINUE</T>
          <T size={18} weight="800" style={{ marginTop: 4 }}>{next.course.emoji} {next.course.name}</T>
          <T color={t.muted}>Unit {next.u + 1}: {next.course.units[next.u].title} · Level {next.l + 1}{next.locked ? ' · 🔒 upgrade' : ''}</T>
        </Card>
      ) : (
        <Card onPress={() => router.push('/(tabs)/classes')}><T weight="800" size={17}>Add your classes</T><T color={t.muted}>Pick what you're taking to get a daily path.</T></Card>
      )}

      <Card>
        <T weight="800" size={17}>This week</T>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          {week.map(d => <View key={d.date} style={{ alignItems: 'center', gap: 6 }}>
            <View style={{ width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: d.studied ? t.ok : t.bg, borderWidth: d.studied ? 0 : 2, borderColor: t.line }}>{d.studied && <T color="#fff" weight="900">✓</T>}</View>
            <T size={12} color={t.muted}>{d.label}</T></View>)}
        </View>
      </Card>

      {mine.length > 0 && <View style={{ gap: 10 }}>
        <T weight="800" size={17}>My classes</T>
        {mine.map(id => { const c = COURSES.find(x => x.id === id); return c && <Card key={id} onPress={() => router.push(`/class/${id}`)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}><T size={24}>{c.emoji}</T><T weight="700" style={{ flex: 1 }}>{c.name}</T><Icon ios="chevron.right" size={16} color={t.muted} /></Card>; })}
      </View>}

      <Button title="✨ Ask Lumino AI" kind="ghost" onPress={() => router.push('/tutor')} />
    </Screen>
  );
}
