import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { T, Button } from '@/components/ui';
import UIcon from '@/components/UIcon';
import { useTheme } from '@/lib/theme';
import { usePlan } from '@/lib/auth';
import { askTutor } from '@/lib/api';
import { ASSISTANTS, canAccess, PLAN_INFO } from '@shared/plans';

type Turn = { role: 'user' | 'assistant'; content: string };

export default function Tutor() {
  const t = useTheme(); const ins = useSafeAreaInsets(); const plan = usePlan();
  const [who, setWho] = useState('study-buddy'); const [turns, setTurns] = useState<Turn[]>([]); const [text, setText] = useState(''); const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  const scroll = useRef<React.ComponentRef<typeof ScrollView>>(null);
  if (plan === 'free') return (
    <View style={{ flex: 1, backgroundColor: t.bg, padding: 24, justifyContent: 'center', gap: 12, alignItems: 'center' }}>
      <T size={56}>✨</T><T size={22} weight="900" style={{ textAlign: 'center' }}>Lumino AI comes with Premium</T>
      <T color={t.muted} style={{ textAlign: 'center' }}>Get a tutor that explains step by step, any time.</T>
      <Button title="Close" kind="ghost" onPress={() => router.back()} style={{ alignSelf: 'stretch' }} />
    </View>
  );
  const send = async () => {
    const q = text.trim(); if (!q || busy) return; const next: Turn[] = [...turns, { role: 'user', content: q }];
    setTurns(next); setText(''); setBusy(true); setErr('');
    try { const reply = await askTutor(who, next); setTurns([...next, { role: 'assistant', content: reply }]); } catch (e) { setErr((e as Error).message); setTurns(turns); setText(q); }
    setBusy(false);
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: t.bg }} behavior="padding" keyboardVerticalOffset={60}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }} contentContainerStyle={{ gap: 8, padding: 12 }}>
        {ASSISTANTS.map(a => { const open = canAccess(plan, a.tier); return (
          <Pressable key={a.id} disabled={!open} onPress={() => { setWho(a.id); setTurns([]); }} style={{ paddingHorizontal: 14, paddingVertical: 8, borderRadius: 99, backgroundColor: who === a.id ? t.accent : t.card, borderWidth: 1, borderColor: t.line, opacity: open ? 1 : 0.5 }}>
            <T weight="700" color={who === a.id ? t.onAccent : t.text}>{a.emoji} {a.name}{open ? '' : ` 🔒 ${PLAN_INFO[a.tier].name}`}</T>
          </Pressable>); })}
      </ScrollView>
      <ScrollView ref={scroll} onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })} contentContainerStyle={{ padding: 14, gap: 10 }}>
        {!turns.length && <View style={{ alignItems: 'center', marginTop: 24 }}><UIcon name="mascot-hero" size={130} /></View>}
        {!turns.length && <T color={t.muted} style={{ textAlign: 'center', marginTop: 10 }}>Ask anything. Lumino AI teaches step by step.{'\n'}AI can make mistakes, so double-check important answers.</T>}
        {turns.map((m, i) => <View key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '86%', backgroundColor: m.role === 'user' ? t.accent : t.card, borderRadius: 20, padding: 12, borderWidth: m.role === 'user' ? 0 : 1, borderColor: t.line }}><T color={m.role === 'user' ? t.onAccent : t.text}>{m.content}</T></View>)}
        {busy && <T color={t.muted}>Lumino AI is thinking…</T>}
        {!!err && <T color={t.bad}>{err}</T>}
      </ScrollView>
      <View style={{ flexDirection: 'row', gap: 8, padding: 10, paddingBottom: ins.bottom + 8, borderTopWidth: 1, borderColor: t.line, backgroundColor: t.card }}>
        <TextInput placeholder="Ask a question…" placeholderTextColor={t.muted} value={text} onChangeText={setText} multiline maxLength={4000} style={{ flex: 1, backgroundColor: t.bg, color: t.text, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, fontSize: 16, maxHeight: 120 }} />
        <Pressable onPress={send} accessibilityLabel="Send" hitSlop={6} style={{ alignSelf: 'center' }}><UIcon name="btn-send" size={40} /></Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
