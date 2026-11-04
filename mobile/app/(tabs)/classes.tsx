import { useEffect, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, Card, T, Bar, Pill } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { getMyClasses, setMyClasses } from '@/lib/progress';
import { on } from '@/lib/events';
import { COURSES, levelState, getCourseProgress } from '@/lib/tests';
import { CATEGORIES } from '@shared/courses';
import UIcon from '@/components/UIcon';

export default function Classes() {
  const t = useTheme(); const [mine, setMine] = useState(getMyClasses()); const [, tick] = useState(0); const [q, setQ] = useState(''); const [cat, setCat] = useState('All');
  useEffect(() => on('planner', () => setMine(getMyClasses())), []);
  useEffect(() => on('progress', () => tick(x => x + 1)), []);
  const prog = getCourseProgress();
  const toggle = (id: string) => { const n = mine.includes(id) ? mine.filter(x => x !== id) : [...mine, id]; setMine(n); setMyClasses(n); };
  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><UIcon name="icon-classes" size={32} ink /><T size={30} weight="900">Classes</T></View>
      <T color={t.muted}>{COURSES.length} classes. Each unit has 3 levels that get harder. Tap ☆ to add a class to your Today screen.</T>
      <TextInput placeholder="Search classes or topics" placeholderTextColor={t.muted} value={q} onChangeText={setQ} clearButtonMode="while-editing"
        style={{ backgroundColor: t.card, color: t.text, borderRadius: 14, padding: 14, fontSize: 16, borderWidth: 1, borderColor: t.line }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {['All', 'Mine', ...CATEGORIES].map(k => <Pressable key={k} onPress={() => setCat(k)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, backgroundColor: cat === k ? t.accent : t.card, borderWidth: 1, borderColor: t.line }}>
          <T weight="700" size={14} color={cat === k ? t.onAccent : t.text}>{k === 'Mine' ? `★ Mine (${mine.length})` : k}</T></Pressable>)}
      </ScrollView>
      {COURSES.filter(c => (cat === 'All' || (cat === 'Mine' ? mine.includes(c.id) : c.category === cat)) && (c.name + ' ' + c.units.map(u => u.title).join(' ')).toLowerCase().includes(q.toLowerCase())).map(c => {
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
