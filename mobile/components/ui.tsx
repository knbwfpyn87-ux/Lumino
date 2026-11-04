import { type ReactNode, useEffect, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, StyleSheet, Text, View, type ViewStyle, type TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { SymbolView, type SymbolViewProps } from 'expo-symbols';
import { useTheme } from '@/lib/theme';
import { on } from '@/lib/events';

export function Screen({ children, scroll = true, pad = true }: { children: ReactNode; scroll?: boolean; pad?: boolean }) {
  const t = useTheme(); const ins = useSafeAreaInsets();
  const style = { padding: pad ? 18 : 0, paddingTop: (pad ? 10 : 0) + ins.top, paddingBottom: 110, gap: 14 };
  return scroll
    ? <ScrollView style={{ flex: 1, backgroundColor: t.bg }} contentContainerStyle={style} keyboardShouldPersistTaps="handled">{children}</ScrollView>
    : <View style={[{ flex: 1, backgroundColor: t.bg }, style]}>{children}</View>;
}
export function Card({ children, style, onPress }: { children: ReactNode; style?: ViewStyle; onPress?: () => void }) {
  const t = useTheme();
  const base: ViewStyle = { backgroundColor: t.card, borderRadius: 22, padding: 16, borderWidth: StyleSheet.hairlineWidth, borderColor: t.line, shadowColor: '#1e3c78', shadowOpacity: 0.06, shadowRadius: 14, shadowOffset: { width: 0, height: 4 } };
  return onPress
    ? <Pressable onPress={() => { Haptics.selectionAsync(); onPress(); }} style={({ pressed }) => [base, style, pressed && { transform: [{ scale: 0.98 }], opacity: 0.9 }]}>{children}</Pressable>
    : <View style={[base, style]}>{children}</View>;
}
export function T({ children, size = 16, weight = '400', color, style, mono, onPress, accessibilityLabel }: { children: ReactNode; size?: number; weight?: TextStyle['fontWeight']; color?: string; style?: TextStyle; mono?: boolean; onPress?: () => void; accessibilityLabel?: string }) {
  const t = useTheme();
  return <Text onPress={onPress} accessibilityLabel={accessibilityLabel} suppressHighlighting style={[{ fontSize: size, fontWeight: weight, color: color ?? t.text, fontFamily: mono ? 'SpaceMono' : undefined }, style]}>{children}</Text>;
}
export function Button({ title, onPress, kind = 'primary', disabled, style }: { title: string; onPress: () => void; kind?: 'primary' | 'ghost' | 'danger'; disabled?: boolean; style?: ViewStyle }) {
  const t = useTheme();
  const bg = kind === 'primary' ? t.accent : kind === 'danger' ? t.bad : 'transparent';
  const fg = kind === 'primary' ? t.onAccent : kind === 'danger' ? '#fff' : t.text;
  return (
    <Pressable disabled={disabled} accessibilityRole="button" onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); onPress(); }}
      style={({ pressed }) => [{ backgroundColor: bg, borderRadius: 16, minHeight: 50, paddingHorizontal: 18, alignItems: 'center', justifyContent: 'center', borderWidth: kind === 'ghost' ? 1 : 0, borderColor: t.line, opacity: disabled ? 0.4 : pressed ? 0.85 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] }, style]}>
      <Text style={{ color: fg, fontWeight: '700', fontSize: 16 }}>{title}</Text>
    </Pressable>
  );
}
export function Icon({ ios, size = 22, color }: { ios: SymbolViewProps['name'] extends infer N ? (N extends { ios?: infer I } ? I : N) : never; size?: number; color?: string }) {
  const t = useTheme();
  return <SymbolView name={ios as never} size={size} tintColor={color ?? t.accent} />;
}
export function Bar({ pct, height = 10 }: { pct: number; height?: number }) {
  const t = useTheme();
  return <View style={{ height, backgroundColor: t.line, borderRadius: 99, overflow: 'hidden' }}><View style={{ width: `${Math.max(0, Math.min(100, pct))}%`, height: '100%', backgroundColor: t.accent, borderRadius: 99 }} /></View>;
}
export function Pill({ text, color }: { text: string; color?: string }) {
  const t = useTheme();
  return <View style={{ backgroundColor: color ?? t.yellow, borderRadius: 99, paddingHorizontal: 10, paddingVertical: 3, alignSelf: 'flex-start' }}><Text style={{ fontSize: 12, fontWeight: '700', color: '#14161f' }}>{text}</Text></View>;
}

/** XP toasts and celebration banners, triggered from lib/progress. */
export function Feedback() {
  const t = useTheme(); const ins = useSafeAreaInsets();
  const [toast, setToast] = useState<string | null>(null); const [big, setBig] = useState<string | null>(null);
  const y = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const a = on('toast', d => { setToast(String(d)); y.setValue(0); Animated.spring(y, { toValue: 1, useNativeDriver: true }).start(); setTimeout(() => setToast(null), 1800); });
    const b = on('celebrate', d => { setBig(String(d)); Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success); setTimeout(() => setBig(null), 2400); });
    return () => { a(); b(); };
  }, [y]);
  return (<>
    {toast && <Animated.View pointerEvents="none" style={{ position: 'absolute', top: ins.top + 8, alignSelf: 'center', backgroundColor: t.accent, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 99, transform: [{ scale: y }], zIndex: 50 }}><Text style={{ color: t.onAccent, fontWeight: '800' }}>{toast}</Text></Animated.View>}
    {big && <View pointerEvents="none" style={{ position: 'absolute', top: '35%', alignSelf: 'center', backgroundColor: t.card, borderColor: t.yellow, borderWidth: 3, paddingHorizontal: 28, paddingVertical: 20, borderRadius: 24, zIndex: 51 }}><Text style={{ fontSize: 26, fontWeight: '900', color: t.text }}>🎉 {big}</Text></View>}
  </>);
}
