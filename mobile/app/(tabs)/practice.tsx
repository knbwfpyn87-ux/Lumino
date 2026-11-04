import { useMemo, useState } from 'react';
import { TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, Card, T, Pill } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { usePlan } from '@/lib/auth';
import { ALL_TESTS, tierOf, canAccess } from '@/lib/tests';
import { PLAN_INFO } from '@shared/plans';
import UIcon from '@/components/UIcon';

const FILTERS = ['All', 'SAT', 'AP', 'Math', 'English'];

export default function Practice() {
  const t = useTheme(); const plan = usePlan(); const [q, setQ] = useState(''); const [f, setF] = useState('All');
  const shown = useMemo(() => ALL_TESTS.filter(x => {
    const s = (x.subject + ' ' + x.title).toLowerCase();
    const okF = f === 'All' || (f === 'SAT' && x.subject === 'SAT') || (f === 'AP' && x.level === 'AP') || (f === 'Math' && /alg|geo|stat|calc|math/i.test(s)) || (f === 'English' && /reading|writing|english|lit/i.test(s));
    return okF && s.includes(q.toLowerCase());
  }).slice(0, 80), [q, f]);
  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><UIcon name="icon-book" size={32} ink /><T size={30} weight="900">Practice</T></View>
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Card onPress={() => router.push('/cards')} style={{ flex: 1, alignItems: 'center', gap: 8, backgroundColor: t.bg === '#0f111a' ? '#1c2a40' : '#e3f2ff' }}><UIcon name="tool-flashcards" size={38} ink keep /><T weight="800">Flashcards</T></Card>
        <Card onPress={() => router.push(`/quiz/sprint~${Date.now() % 1e9}`)} style={{ flex: 1, alignItems: 'center', gap: 8, backgroundColor: t.bg === '#0f111a' ? '#2d2716' : '#fff3d1' }}><UIcon name="tool-timer" size={38} ink keep /><T weight="800">Sprint</T></Card>
        <Card onPress={() => router.push('/tutor')} style={{ flex: 1, alignItems: 'center', gap: 8, backgroundColor: t.bg === '#0f111a' ? '#25213d' : '#ebe8ff' }}><UIcon name="tool-ai" size={38} ink keep /><T weight="800">AI Help</T></Card>
      </View>
      <TextInput placeholder="Search tests" placeholderTextColor={t.muted} value={q} onChangeText={setQ} style={{ backgroundColor: t.card, color: t.text, borderRadius: 14, padding: 14, fontSize: 16, borderWidth: 1, borderColor: t.line }} />
      <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
        {FILTERS.map(x => <T key={x} onPress={() => setF(x)} weight="700" color={f === x ? t.onAccent : t.text} style={{ backgroundColor: f === x ? t.accent : t.card, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, overflow: 'hidden', borderWidth: 1, borderColor: t.line }}>{x}</T>)}
      </View>
      {shown.map(x => { const tier = tierOf(x); const open = canAccess(plan, tier); return (
        <Card key={x.id} onPress={() => router.push(`/quiz/${x.id}`)} style={{ opacity: open ? 1 : 0.6, gap: 4 }}>
          <T weight="800">{open ? '' : '🔒 '}{x.title}</T>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><T size={13} color={t.muted}>{x.subject} · {x.questions.length} questions</T>{!open && <Pill text={PLAN_INFO[tier].name} />}</View>
        </Card>); })}
    </Screen>
  );
}
