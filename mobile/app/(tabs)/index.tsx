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
import UIcon from '@/components/UIcon';
import { AI_ENABLED } from '@/lib/features';
import { Image } from 'react-native';
import { UI_SRC } from '@/lib/ui-assets';

const greet = () => { const h = new Date().getHours(); return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; };

export default function Today() {
  const t = useTheme(); const p = useProgress(); const L = levelOf(p.xp); const plan = usePlan(); const { profile } = useAuth();
  const [mine, setMine] = useState(getMyClasses()); useEffect(() => on('planner', () => setMine(getMyClasses())), []);
  const week = lastWeek(p); const goalPct = Math.min(100, (p.todayXp / p.goal) * 100);
  const next = mine.map(id => nextLevel(id, plan)).find(Boolean);
  return (
    <Screen>
      <Image source={UI_SRC['wave-topright']} style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 79, opacity: t.bg === '#0f111a' ? 0.35 : 1 }} />
      <UIcon name="logo-full" size={72} />
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', gap: 8, flex: 1 }}><UIcon name="sparkle-greeting" size={28} ink keep /><View style={{ flex: 1 }}><T size={15} color={t.muted}>{greet()}</T><T size={28} weight="900">{profile?.username ?? 'Student'}!</T></View></View>
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
        <UIcon name="mascot-hero" size={104} />
      </LinearGradient>

      <Card onPress={() => router.push(`/quiz/sprint~${Date.now() % 1e9}`)} style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: '#fff3d1', alignItems: 'center', justifyContent: 'center' }}><UIcon name="tool-timer" size={32} ink keep /></View>
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
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}><UIcon name="icon-progress" size={24} ink /><T weight="800" size={17}>This week</T></View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
          {week.map(d => <View key={d.date} style={{ alignItems: 'center', gap: 6 }}>
            <View style={{ width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: d.studied ? t.ok : t.bg, borderWidth: d.studied ? 0 : 2, borderColor: t.line }}>{d.studied && <T color="#fff" weight="900">✓</T>}</View>
            <T size={12} color={t.muted}>{d.label}</T></View>)}
        </View>
      </Card>

      {mine.length > 0 && <View style={{ gap: 10 }}>
        <T weight="800" size={17}>My classes</T>
        {mine.map(id => { const c = COURSES.find(x => x.id === id); return c && <Card key={id} onPress={() => router.push(`/class/${id}`)} style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14 }}><View style={{ width: 34, height: 26, borderRadius: 7, backgroundColor: ['#7cc8ff', '#ff9aa2', '#c4b5fd', '#ffd666'][mine.indexOf(id) % 4] }} /><T weight="700" style={{ flex: 1 }}>{c.name}</T><Icon ios="chevron.right" size={16} color={t.muted} /></Card>; })}
      </View>}

      {AI_ENABLED &&       <Card onPress={() => router.push('/tutor')} style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <UIcon name="icon-ai-yellow" size={30} ink keep /><T weight="800" size={17} style={{ flex: 1 }}>AI Tutor</T>
        <T color={t.muted} size={14}>Ask a question…</T><UIcon name="btn-send" size={34} />
      </Card>}
    </Screen>
  );
}
