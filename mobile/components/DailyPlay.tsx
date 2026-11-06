// Home "Today" card on iPhone: daily boss (spaced review) and daily quests you choose. Same rules as the website.
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Card, T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { on } from '@/lib/events';
import { useProgress } from '@/lib/progress';
import { todaysBoss, getQuests, pickQuest, deckStats } from '@shared/play';

export function DailyPlay() {
  const t = useTheme(); const p = useProgress(); const [, setTick] = useState(0);
  useEffect(() => on('progress', () => setTick(x => x + 1)), []);
  const boss = todaysBoss(); const q = getQuests(); const deck = deckStats(); const freezes = p.freezes ?? 0;
  return (
    <Card style={{ gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <T size={13} weight="800" color={t.accent}>🎮 TODAY</T><T size={12} color={t.muted}>🧊 {freezes} streak freeze{freezes === 1 ? '' : 's'}</T>
      </View>
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center', backgroundColor: boss.defeated ? '#e6f7ec' : '#fde8e8', borderRadius: 16, padding: 12 }}>
        <T size={40}>{boss.defeated ? '🏆' : boss.emoji}</T>
        <View style={{ flex: 1, gap: 2 }}>
          <T weight="800" color="#3b1d1d">{boss.defeated ? `${boss.name} defeated!` : `Boss: ${boss.name}`}</T>
          <T size={13} color="#5b4040">{boss.defeated ? 'A new boss appears tomorrow.' : boss.ready ? `${boss.hp} review questions you missed before.` :
            deck.total ? `Review unlocks in a day or two (${deck.total} in your deck).` : 'Questions you miss come back here for spaced review.'}</T>
        </View>
        {boss.ready && !boss.defeated && <Button title="⚔️ Fight" onPress={() => router.push('/boss')} />}
      </View>
      {q.picking ? <View style={{ gap: 6 }}>
        <T weight="800">Choose 3 quests for today</T>
        {q.offered.map(x => <Pressable key={x.id} onPress={() => { Haptics.selectionAsync(); pickQuest(x.id); setTick(n => n + 1); }}
          style={{ padding: 10, borderRadius: 12, borderWidth: 2, borderColor: x.picked ? t.accent : t.line, backgroundColor: x.picked ? t.accentSoft : t.bg }}>
          <T>{x.icon} {x.title}{x.picked ? '  ✓' : ''}</T></Pressable>)}
      </View> : <View style={{ gap: 6 }}>
        <T weight="800">Daily quests {q.chest ? '· 🎁 opened' : '· all 3 = 🎁'}</T>
        {q.offered.filter(x => x.picked).map(x => <View key={x.id} style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <T style={{ flex: 1, textDecorationLine: x.done ? 'line-through' : 'none' }} color={x.done ? t.muted : t.text}>{x.icon} {x.title}</T>
          <View style={{ width: 70, height: 8, borderRadius: 4, backgroundColor: t.line, overflow: 'hidden' }}><View style={{ width: `${(x.progress / x.goal) * 100}%`, height: 8, backgroundColor: t.ok }} /></View>
          <T size={12} color={t.muted}>{x.done ? '✓' : `${x.progress}/${x.goal}`}</T>
        </View>)}
      </View>}
    </Card>
  );
}
