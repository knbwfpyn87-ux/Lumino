import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, Card, T, Bar, Pill } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { getMyClasses, setMyClasses } from '@/lib/progress';
import { on } from '@/lib/events';
import { COURSES, levelState, getCourseProgress } from '@/lib/tests';

export default function Classes() {
  const t = useTheme(); const [mine, setMine] = useState(getMyClasses()); const [, tick] = useState(0);
  useEffect(() => on('planner', () => setMine(getMyClasses())), []);
  useEffect(() => on('progress', () => tick(x => x + 1)), []);
  const prog = getCourseProgress();
  const toggle = (id: string) => { const n = mine.includes(id) ? mine.filter(x => x !== id) : [...mine, id]; setMine(n); setMyClasses(n); };
  return (
    <Screen>
      <T size={30} weight="900">Classes</T>
      <T color={t.muted}>Each unit has 3 levels that get harder. Tap ☆ to add a class to your Today screen.</T>
      {COURSES.map(c => {
        const total = c.units.length * 3; const passed = c.units.reduce((n, _, u) => n + [0, 1, 2].filter(l => levelState(c.id, u, l, prog).passed).length, 0);
        return (
          <Card key={c.id} onPress={() => router.push(`/class/${c.id}`)} style={{ gap: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View style={{ width: 50, height: 50, borderRadius: 16, backgroundColor: t.accentSoft, alignItems: 'center', justifyContent: 'center' }}><T size={26}>{c.emoji}</T></View>
              <View style={{ flex: 1 }}><T size={17} weight="800">{c.name}</T><T size={13} color={t.muted}>{c.units.length} units · {c.level}</T></View>
              <Pressable hitSlop={12} onPress={() => toggle(c.id)} accessibilityLabel={mine.includes(c.id) ? 'Remove from my classes' : 'Add to my classes'}><T size={28} color={mine.includes(c.id) ? t.yellow : t.muted}>{mine.includes(c.id) ? '★' : '☆'}</T></Pressable>
            </View>
            <Bar pct={(passed / total) * 100} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T size={12} color={t.muted}>{passed}/{total} levels passed</T>{c.id === 'ap-csa' && <Pill text="Java" />}</View>
          </Card>
        );
      })}
    </Screen>
  );
}
