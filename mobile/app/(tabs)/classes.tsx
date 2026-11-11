import { useEffect, useState } from 'react';
import { Pressable, ScrollView, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Screen, Card, T, Bar, Pill } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { getMyClasses, setMyClasses } from '@/lib/progress';
import { on } from '@/lib/events';
import { COURSES, levelState, getCourseProgress } from '@/lib/tests';
import { SUBJECTS, LEVEL_FILTERS, PREP_GROUPS, groupBySubject, isTestPrep, matchesLevel, type LevelFilter } from '@shared/courses';
import UIcon from '@/components/UIcon';

export default function Classes() {
  const t = useTheme(); const [mine, setMine] = useState(getMyClasses()); const [, tick] = useState(0); const [q, setQ] = useState(''); const [cat, setCat] = useState('All'); const [lvl, setLvl] = useState<LevelFilter>('all');
  useEffect(() => on('planner', () => setMine(getMyClasses())), []);
  useEffect(() => on('progress', () => tick(x => x + 1)), []);
  const prog = getCourseProgress();
  const toggle = (id: string) => { const n = mine.includes(id) ? mine.filter(x => x !== id) : [...mine, id]; setMine(n); setMyClasses(n); };
  return (
    <Screen>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}><UIcon name="icon-classes" size={32} ink /><T size={30} weight="900">Classes</T></View>
      <T color={t.muted}>Classes grouped by subject, plus SAT & ACT prep. Tap ☆ to add a class to your Today screen.</T>
      <TextInput placeholder="Search classes or topics" placeholderTextColor={t.muted} value={q} onChangeText={setQ} clearButtonMode="while-editing"
        style={{ backgroundColor: t.card, color: t.text, borderRadius: 14, padding: 14, fontSize: 16, borderWidth: 1, borderColor: t.line }} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
        {['All', 'Mine', 'SAT & ACT', ...SUBJECTS].map(k => <Pressable key={k} onPress={() => setCat(k)} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, backgroundColor: cat === k ? t.accent : t.card, borderWidth: 1, borderColor: t.line }}>
          <T weight="700" size={14} color={cat === k ? t.onAccent : t.text}>{k === 'Mine' ? `★ Mine (${mine.length})` : k === 'SAT & ACT' ? '🎯 SAT & ACT' : k}</T></Pressable>)}
      </ScrollView>
      {cat !== 'Mine' && cat !== 'SAT & ACT' && <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
        {LEVEL_FILTERS.map(f => <Pressable key={f.key} onPress={() => setLvl(f.key)} style={{ paddingHorizontal: 12, paddingVertical: 6, borderRadius: 99, backgroundColor: lvl === f.key ? t.accentSoft : 'transparent', borderWidth: 1, borderColor: lvl === f.key ? t.accent : t.line }}>
          <T size={13} weight="700">{f.label}</T></Pressable>)}
      </ScrollView>}
      {(() => {
        const text = (c: typeof COURSES[number]) => (c.name + ' ' + c.units.map(u => u.title).join(' ')).toLowerCase().includes(q.toLowerCase());
        const groups: { title: string; list: typeof COURSES }[] = cat === 'Mine' ? [{ title: '', list: COURSES.filter(c => mine.includes(c.id) && text(c)) }]
          : cat === 'SAT & ACT' ? PREP_GROUPS.map(g => ({ title: g.exam, list: g.ids.map(id => COURSES.find(c => c.id === id)!).filter(c => c && text(c)) }))
          : groupBySubject(COURSES.filter(c => !isTestPrep(c) && matchesLevel(c, lvl) && text(c))).filter(g => cat === 'All' || g.subject === cat).map(g => ({ title: g.subject, list: g.courses }));
        return <>
          {cat === 'All' && !q && <Card onPress={() => setCat('SAT & ACT')} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: t.accentSoft }}><T size={22}>🎯</T><T weight="800" style={{ flex: 1 }}>SAT, PSAT & ACT prep</T><T color={t.muted}>›</T></Card>}
          {groups.filter(g => g.list.length).map(g => <View key={g.title || 'mine'} style={{ gap: 10 }}>
            {!!g.title && <T size={20} weight="900" style={{ marginTop: 8 }}>{g.title}</T>}
            {g.list.map(c => {
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
          </View>)}
          {!groups.some(g => g.list.length) && <T color={t.muted}>{cat === 'Mine' ? 'No classes yet. Tap ☆ on any class to add it.' : 'No classes match.'}</T>}
        </>;
      })()}
    </Screen>
  );
}
