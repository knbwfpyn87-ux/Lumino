// Daily boss battle on iPhone: today's spaced-review questions (same rules as the website's /boss).
import { useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { todaysBoss, recordAnswer, bossDefeated } from '@shared/play';

export default function BossScreen() {
  const t = useTheme(); const [boss] = useState(todaysBoss); const [qs] = useState(() => [...boss.questions].sort(() => Math.random() - 0.5));
  const [i, setI] = useState(0); const [hp, setHp] = useState(qs.length); const [hearts, setHearts] = useState(3);
  const [picked, setPicked] = useState<number | null>(null); const [over, setOver] = useState<'won' | 'lost' | null>(null);
  const shake = useRef(new Animated.Value(0)).current;
  const hitAnim = () => Animated.sequence([-12, 10, -6, 0].map(v => Animated.timing(shake, { toValue: v, duration: 70, useNativeDriver: true }))).start();
  if (boss.defeated || !qs.length) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24, backgroundColor: t.bg }}>
    <T size={72}>{boss.defeated ? '🏆' : '😴'}</T><T size={22} weight="900">{boss.defeated ? "You already beat today's boss!" : 'No boss today'}</T>
    <T color={t.muted} style={{ textAlign: 'center' }}>{boss.defeated ? 'A new one appears tomorrow.' : 'Questions you miss come back here for review.'}</T><Button title="Done" onPress={() => router.back()} /></View>;
  const q = qs[i];
  const choose = (ci: number) => {
    if (picked !== null || over) return; setPicked(ci); const ok = ci === q.answer; recordAnswer(q, ok, 'Daily boss');
    if (ok) { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); hitAnim(); const left = hp - 1; setHp(left); if (left === 0) { setOver('won'); bossDefeated(qs.length); } }
    else { Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error); const h = hearts - 1; setHearts(h); if (h === 0) setOver('lost'); }
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={{ padding: 18, gap: 12, paddingBottom: 60 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><Pressable onPress={() => router.back()} hitSlop={12}><T size={22} color={t.muted}>✕</T></Pressable><T size={20}>{'❤️'.repeat(hearts)}{'🖤'.repeat(3 - hearts)}</T></View>
      <View style={{ alignItems: 'center', gap: 6 }}>
        <Animated.Text style={{ fontSize: 80, transform: [{ translateX: shake }] }}>{over === 'won' ? '💥' : boss.emoji}</Animated.Text>
        <T weight="800">{boss.name}</T>
        <View style={{ width: '80%', height: 14, borderRadius: 7, backgroundColor: t.line, overflow: 'hidden' }}><View style={{ width: `${(hp / qs.length) * 100}%`, height: 14, backgroundColor: '#ef4444' }} /></View>
      </View>
      {over ? <View style={{ alignItems: 'center', gap: 10 }}>
        <T size={24} weight="900">{over === 'won' ? 'Victory! 🏆' : 'The boss got away!'}</T>
        <T color={t.muted} style={{ textAlign: 'center' }}>{over === 'won' ? 'Questions you got right move further out in your review schedule, so they stick.' : 'The questions you missed stay in your review deck. Try again!'}</T>
        {over === 'lost' && <Button title="Try again" onPress={() => { setHearts(3); setHp(qs.length); setI(0); setPicked(null); setOver(null); }} />}
        <Button kind="ghost" title="Done" onPress={() => router.back()} />
      </View> : <>
        <T size={12} color={t.muted}>REVIEW QUESTION · FROM A PAST MISTAKE</T>
        <T size={20} weight="800">{q.prompt}</T>
        {q.choices.map((c, ci) => { const isAns = picked !== null && ci === q.answer; const isWrong = picked === ci && ci !== q.answer;
          return <Pressable key={ci} onPress={() => choose(ci)} disabled={picked !== null} style={{ padding: 14, borderRadius: 14, borderWidth: 2, borderColor: isAns ? t.ok : isWrong ? t.bad : t.line, backgroundColor: isAns ? t.ok + '22' : isWrong ? t.bad + '22' : t.card }}>
            <T>{String.fromCharCode(65 + ci)}. {c}</T></Pressable>; })}
        {picked !== null && <View style={{ gap: 8, backgroundColor: t.accentSoft, borderRadius: 14, padding: 12 }}>
          <T>{picked === q.answer ? `Hit! ⚔️ ${q.explanation ?? ''}` : `Ouch, you lost a heart. The answer is ${String.fromCharCode(65 + q.answer)}. ${q.explanation ?? ''}`}</T>
          <Button title="Next →" onPress={() => { setPicked(null); setI((i + 1) % qs.length); }} /></View>}
      </>}
    </ScrollView>
  );
}
