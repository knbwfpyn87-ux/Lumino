import { useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { T, Button, Bar } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { usePlan } from '@/lib/auth';
import { award, getMyClasses } from '@/lib/progress';
import { saveResult } from '@/lib/api';
import { resolveTest, tierOf, canAccess, COURSES } from '@/lib/tests';
import { courseUsesDesmos, testUsesDesmos } from '@shared/desmos';
import { openDesmos } from '@/components/Desmos';
import { HelpWalk } from '@/components/HelpWalk';
import { recordCourseResult, parseCourseTestId, courseTestId } from '@shared/courses';
import { PLAN_INFO } from '@shared/plans';
import { teachLine } from '@shared/lines';
import Lumino, { LuminoSays } from '@/components/Lumino';

export default function Quiz() {
  const { id } = useLocalSearchParams<{ id: string }>(); const t = useTheme(); const ins = useSafeAreaInsets(); const plan = usePlan();
  const test = useMemo(() => resolveTest(String(id), getMyClasses(), plan), [id, plan]);
  const [i, setI] = useState(0); const [picked, setPicked] = useState<number | null>(null); const [score, setScore] = useState(0); const [combo, setCombo] = useState(0); const [done, setDone] = useState(false);

  if (!test) return <View style={{ flex: 1, backgroundColor: t.bg, justifyContent: 'center', padding: 24 }}><T>Test not found.</T><Button title="Close" onPress={() => router.back()} /></View>;
  const tier = tierOf(test);
  if (!canAccess(plan, tier)) return (
    <View style={{ flex: 1, backgroundColor: t.bg, justifyContent: 'center', padding: 24, gap: 14, alignItems: 'center' }}>
      <T size={56}>🔒</T><T size={22} weight="900" style={{ textAlign: 'center' }}>{test.title} is part of {PLAN_INFO[tier].name}</T>
      <Button title="See plans" onPress={() => router.replace('/(tabs)/me')} style={{ alignSelf: 'stretch' }} /><Button title="Close" kind="ghost" onPress={() => router.back()} style={{ alignSelf: 'stretch' }} />
    </View>
  );

  const qs = test.questions; const q = qs[i];
  const choose = (ci: number) => {
    if (picked !== null) return; setPicked(ci);
    if (ci === q.answer) { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); setScore(s => s + 1); setCombo(c => c + 1); }
    else { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); setCombo(0); }
  };
  const next = () => {
    if (i < qs.length - 1) { setI(i + 1); setPicked(null); return; }
    setDone(true);
    const final = score; const pct = final / qs.length;
    if (parseCourseTestId(test.id)) recordCourseResult(test.id, pct);
    award(10 + final * 5, `${final}/${qs.length}`);
    saveResult({ testId: test.id, title: test.title, score: final, total: qs.length }).catch(() => {});
  };

  if (done) {
    const pct = score / qs.length; const c = parseCourseTestId(test.id);
    return (
      <View style={{ flex: 1, backgroundColor: t.bg, padding: 24, paddingTop: ins.top + 40, gap: 16, alignItems: 'center' }}>
        <Lumino mood={pct === 1 ? 'cheer' : pct >= 0.7 ? 'love' : pct >= 0.5 ? 'teach' : 'wrong'} size={190} />
        <T size={40} weight="900">{score}/{qs.length}</T>
        <T color={t.muted} style={{ textAlign: 'center' }}>{c ? (pct >= 0.7 ? 'Level passed! The next one is unlocked.' : 'Score 70% to unlock the next level.') : pct >= 0.7 ? 'Great work!' : 'Keep going, you\'ve got this.'}</T>
        <View style={{ alignSelf: 'stretch', gap: 10, marginTop: 'auto', paddingBottom: ins.bottom + 10 }}>
          {c ? <Button title="New questions" onPress={() => router.replace(`/quiz/${courseTestId(c.courseId, c.u, c.l, c.attempt + 1)}`)} />
            : <Button title="Go again" onPress={() => router.replace(`/quiz/${test.id.startsWith('sprint~') ? `sprint~${Date.now() % 1e9}` : test.id}`)} />}
          <Button title="Done" kind="ghost" onPress={() => router.back()} />
        </View>
      </View>
    );
  }

  const right = picked !== null && picked === q.answer;
  const pcd = parseCourseTestId(test.id); const desmos = pcd ? courseUsesDesmos(COURSES.find(x => x.id === pcd.courseId)) : testUsesDesmos(test);
  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: ins.top + 6 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 18 }}>
        <Pressable accessibilityLabel="Close" onPress={() => router.back()} hitSlop={12}><T size={22} color={t.muted}>✕</T></Pressable>
        <View style={{ flex: 1 }}><Bar pct={((i + (picked !== null ? 1 : 0)) / qs.length) * 100} height={12} /></View>
        {combo >= 2 ? <T weight="900" color={t.accent}>🔥{combo}</T> : <T color={t.muted}>{i + 1}/{qs.length}</T>}
        {desmos &&
          <Pressable accessibilityLabel="Open the graphing calculator" onPress={() => openDesmos()} hitSlop={10}><T size={20}>📈</T></Pressable>}
      </View>
      <ScrollView contentContainerStyle={{ padding: 18, gap: 12, paddingBottom: 140 }}>
        <T size={13} color={t.muted}>{test.title}</T>
        <T size={22} weight="800">{q.prompt}</T>
        {q.code && <ScrollView horizontal style={{ backgroundColor: t.code, borderRadius: 14 }} contentContainerStyle={{ padding: 14 }}><T mono size={13} color="#e8ecff">{q.code}</T></ScrollView>}
        {picked === null && <HelpWalk key={q.id} q={q} desmos={desmos} />}
        {q.choices.map((c, ci) => {
          const isAns = picked !== null && ci === q.answer; const isWrong = picked === ci && ci !== q.answer;
          return (
            <Pressable key={ci} onPress={() => choose(ci)} accessibilityRole="button"
              style={({ pressed }) => ({ borderRadius: 18, borderWidth: 2, padding: 16, flexDirection: 'row', gap: 12, alignItems: 'center',
                borderColor: isAns ? t.ok : isWrong ? t.bad : picked === null && pressed ? t.accent : t.line,
                backgroundColor: isAns ? t.ok + '22' : isWrong ? t.bad + '22' : t.card, transform: [{ scale: pressed && picked === null ? 0.98 : 1 }] })}>
              <View style={{ width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: t.bg }}><T weight="800">{String.fromCharCode(65 + ci)}</T></View>
              <T size={17} style={{ flex: 1 }}>{c}</T>
              {isAns && <T size={20}>✅</T>}{isWrong && <T size={20}>❌</T>}
            </Pressable>
          );
        })}
      </ScrollView>
      {picked !== null && (
        <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 18, paddingBottom: ins.bottom + 14, gap: 10, backgroundColor: right ? '#e7f8f0' : '#fde9ec', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
          <T size={20} weight="900" color={right ? '#0b7a52' : '#b4233a'}>{right ? (combo >= 3 ? `On fire! ${combo} in a row 🔥` : 'Nice! ✨') : 'Not quite'}</T>
          <LuminoSays key={q.id} size={96} mood={right ? 'correct' : 'wrong'} after={right ? 'correct' : 'teach'}
            text={teachLine(i, q, true, right)} />
          <Button title={i < qs.length - 1 ? 'Continue' : 'See results'} onPress={next} />
        </View>
      )}
    </View>
  );
}
