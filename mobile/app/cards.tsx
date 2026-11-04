import { useRef, useState } from 'react';
import { Animated, PanResponder, Pressable, TextInput, View, useWindowDimensions } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { T, Button, Card } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { award } from '@/lib/progress';
import { db, review, isDue, uid, type Deck } from '@shared/store';

// Swipe right = got it, swipe left = again. Tap to flip. Same decks and schedule as the website.
export default function Cards() {
  const t = useTheme(); const ins = useSafeAreaInsets(); const { width } = useWindowDimensions();
  const [decks, setDecks] = useState<Deck[]>(db.decks()); const [deckId, setDeckId] = useState<string | null>(null);
  const [flip, setFlip] = useState(false); const [name, setName] = useState(''); const [bulk, setBulk] = useState(''); const [streak, setStreak] = useState(0);
  const deck = decks.find(d => d.id === deckId); const due = deck?.cards.filter(isDue) ?? []; const card = due[0];
  const persist = (d: Deck[]) => { setDecks(d); db.saveDecks(d); };
  const x = useRef(new Animated.Value(0)).current;
  const gradeRef = useRef<(g: 0 | 2) => void>(() => {});
  gradeRef.current = (g: 0 | 2) => {
    if (!deck || !card) return;
    persist(decks.map(d => d.id === deck.id ? { ...d, cards: d.cards.map(c => c.id === card.id ? review(c, g === 2 ? 1 : 0) : c) } : d));
    setFlip(false); x.setValue(0);
    if (g) { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium); const n = streak + 1; setStreak(n); award(n % 5 === 0 ? 10 : 2, n % 5 === 0 ? `${n} in a row!` : 'card'); } else { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setStreak(0); }
  };
  const pan = useRef(PanResponder.create({
    onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 8,
    onPanResponderMove: (_, g) => x.setValue(g.dx),
    onPanResponderRelease: (_, g) => {
      if (Math.abs(g.dx) > 110) Animated.timing(x, { toValue: Math.sign(g.dx) * width * 1.2, duration: 180, useNativeDriver: true }).start(() => gradeRef.current(g.dx > 0 ? 2 : 0));
      else Animated.spring(x, { toValue: 0, useNativeDriver: true }).start();
    },
  })).current;

  if (!deck) return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: ins.top + 10, padding: 18, gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><T size={28} weight="900">Flashcards</T><Pressable onPress={() => router.back()} hitSlop={12}><T size={22} color={t.muted}>✕</T></Pressable></View>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <TextInput placeholder="New deck name" placeholderTextColor={t.muted} value={name} onChangeText={setName} style={{ flex: 1, backgroundColor: t.card, color: t.text, borderRadius: 14, padding: 14, fontSize: 16, borderWidth: 1, borderColor: t.line }} />
        <Button title="Create" onPress={() => { if (!name.trim()) return; const d = { id: uid(), name: name.trim(), subject: 'General', cards: [] }; persist([...decks, d]); setName(''); setDeckId(d.id); }} />
      </View>
      {decks.map(d => <Card key={d.id} onPress={() => setDeckId(d.id)}><T weight="800">{d.name}</T><T size={13} color={t.muted}>{d.cards.length} cards · {d.cards.filter(isDue).length} due</T></Card>)}
      {!decks.length && <T color={t.muted}>No decks yet. Make one above.</T>}
    </View>
  );

  const rot = x.interpolate({ inputRange: [-width, 0, width], outputRange: ['-18deg', '0deg', '18deg'] });
  return (
    <View style={{ flex: 1, backgroundColor: t.bg, paddingTop: ins.top + 10, padding: 18, gap: 12 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Pressable onPress={() => setDeckId(null)} hitSlop={12}><T size={17} color={t.accent}>‹ Decks</T></Pressable>
        <T weight="800">{deck.name}</T>{streak >= 2 ? <T weight="900" color={t.accent}>🔥{streak}</T> : <T color={t.muted}>{due.length} due</T>}
      </View>
      {card ? (<>
        <Animated.View {...pan.panHandlers} style={{ flex: 1, maxHeight: 440, transform: [{ translateX: x }, { rotate: rot }] }}>
          <Pressable onPress={() => { Haptics.selectionAsync(); setFlip(!flip); }} style={{ flex: 1, backgroundColor: t.card, borderRadius: 28, borderWidth: 2, borderColor: flip ? t.accent : t.line, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <T size={13} color={t.muted} style={{ position: 'absolute', top: 18 }}>{flip ? 'ANSWER' : 'TAP TO FLIP'}</T>
            <T size={26} weight="800" style={{ textAlign: 'center' }}>{flip ? card.back : card.front}</T>
          </Pressable>
        </Animated.View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <Button title="← Again" kind="danger" style={{ flex: 1 }} onPress={() => gradeRef.current(0)} />
          <Button title="Got it →" style={{ flex: 1, backgroundColor: t.ok }} onPress={() => gradeRef.current(2)} />
        </View>
        <T size={12} color={t.muted} style={{ textAlign: 'center' }}>Swipe right if you knew it, left to see it again</T>
      </>) : (
        <View style={{ gap: 10 }}>
          <T size={56} style={{ textAlign: 'center' }}>🎉</T><T size={20} weight="800" style={{ textAlign: 'center' }}>All caught up!</T>
          <T weight="700" style={{ marginTop: 10 }}>Add cards (one per line: term - definition)</T>
          <TextInput multiline placeholder={'mitochondria - makes ATP\nribosome - builds proteins'} placeholderTextColor={t.muted} value={bulk} onChangeText={setBulk} style={{ minHeight: 120, backgroundColor: t.card, color: t.text, borderRadius: 14, padding: 14, fontSize: 16, borderWidth: 1, borderColor: t.line, textAlignVertical: 'top' }} />
          <Button title="Add cards" onPress={() => {
            const add = bulk.split('\n').map(l => l.split(/\t| - |:/)).filter(p => p.length >= 2 && p[0].trim()).map(([f, ...b]) => ({ id: uid(), front: f.trim(), back: b.join(':').trim() }));
            if (!add.length) return; persist(decks.map(d => d.id === deck.id ? { ...d, cards: [...d.cards, ...add] } : d)); setBulk('');
          }} />
        </View>
      )}
    </View>
  );
}
