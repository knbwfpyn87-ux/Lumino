import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Screen, T, Pill } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { usePlan } from '@/lib/auth';
import { on } from '@/lib/events';
import { COURSES, unitTier, levelState, getCourseProgress, courseTestId, canAccess } from '@/lib/tests';
import { PLAN_INFO } from '@shared/plans';
import { isLessonDone } from '@shared/courses';

// A vertical "path": units stacked top to bottom, each with 3 level bubbles.
export default function ClassPath() {
  const { id } = useLocalSearchParams<{ id: string }>(); const t = useTheme(); const plan = usePlan(); const [, tick] = useState(0);
  useEffect(() => on('progress', () => tick(x => x + 1)), []);
  const c = COURSES.find(x => x.id === id); if (!c) return <Screen><T>Class not found.</T></Screen>;
  const prog = getCourseProgress();
  return (
    <Screen>
      <View style={{ height: 30 }} />
      <T size={44}>{c.emoji}</T>
      <T size={28} weight="900">{c.name}</T>
      {c.units.some(u => u.lessons.length) && <T size={13} color={t.muted}>Each unit teaches first: read the lessons with Mr. Lumino, try the quick checks, then practice.</T>}
      {c.units.map((u, ui) => {
        const tier = unitTier(c, ui); const open = canAccess(plan, tier);
        return (
          <View key={ui} style={{ backgroundColor: t.card, borderRadius: 22, padding: 16, gap: 12, borderWidth: 1, borderColor: t.line, opacity: open ? 1 : 0.6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: t.accent, alignItems: 'center', justifyContent: 'center' }}><T weight="900" color={t.onAccent}>{ui + 1}</T></View>
              <View style={{ flex: 1 }}><T weight="800" size={17}>{u.title}</T><T size={12} color={t.muted}>{u.topics}</T></View>
              {!open && <Pill text={`🔒 ${PLAN_INFO[tier].name}`} />}
            </View>
            {open && u.lessons.map((ls, li) => { const done = isLessonDone(c.id, ui, li);
              return <Pressable key={`l${li}`} onPress={() => router.push(`/lesson/${c.id}~${ui}~${li}`)} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 11, borderRadius: 14, backgroundColor: t.bg, opacity: pressed ? 0.7 : 1 })}>
                <View style={{ width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: done ? t.ok : t.card, borderWidth: 2, borderColor: done ? t.ok : t.line }}><T size={12} weight="900" color={done ? '#fff' : t.text}>{done ? '✓' : li + 1}</T></View>
                <T weight="700" style={{ flex: 1 }}>📖 {ls.title}</T>{ls.lab && <T size={12} weight="800" color={t.muted}>{ls.lab === 'lab' ? '🧪 Lab' : '📐 Demo'}</T>}</Pressable>; })}
            {open && <View style={{ flexDirection: 'row', gap: 10 }}>
              {[0, 1, 2].map(li => { const s = levelState(c.id, ui, li, prog);
                return (
                  <Pressable key={li} disabled={!s.unlocked} onPress={() => router.push(`/quiz/${courseTestId(c.id, ui, li, s.attempts)}`)}
                    style={({ pressed }) => ({ flex: 1, alignItems: 'center', gap: 4, paddingVertical: 12, borderRadius: 16, borderWidth: 2,
                      borderColor: s.passed ? t.ok : s.unlocked ? t.accent : t.line, backgroundColor: s.passed ? t.ok + '1f' : s.unlocked ? t.accentSoft : t.bg, opacity: s.unlocked ? 1 : 0.5, transform: [{ scale: pressed ? 0.95 : 1 }] })}>
                    <T size={22}>{s.passed ? '⭐️' : s.unlocked ? ['🌱', '🌿', '🌳'][li] : '🔒'}</T>
                    <T size={12} weight="700">Level {li + 1}</T>
                    <T size={11} color={t.muted}>{s.passed ? `${Math.round(s.best * 100)}%` : s.unlocked ? 'Start' : 'Locked'}</T>
                  </Pressable>
                ); })}
            </View>}
          </View>
        );
      })}
    </Screen>
  );
}
