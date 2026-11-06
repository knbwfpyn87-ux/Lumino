// The graphing calculator on iPhone: opens Lumino's calculator screen (app/calculator.tsx).
import { View } from 'react-native';
import { router } from 'expo-router';
import { T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';

export const openDesmos = (lines: string[] = []) => router.push(lines.length ? { pathname: '/calculator', params: { lines: JSON.stringify(lines) } } : '/calculator');

/** A small "📈 Desmos" button for screens in classes that allow the calculator. */
export function DesmosButton() {
  return <Button kind="ghost" title="📈 Graphing calculator" onPress={() => openDesmos()} />;
}

/** Lesson block: example lines to type, and a button to open Desmos. */
export function DesmosBlock({ lines }: { lines: string[] }) {
  const t = useTheme();
  return (
    <View style={{ borderWidth: 1, borderColor: t.accent, borderRadius: 16, padding: 14, gap: 8, backgroundColor: t.card }}>
      <T size={11} weight="900" color={t.muted} style={{ letterSpacing: 0.6 }}>📈 TRY IT IN THE GRAPHING CALCULATOR</T>
      <View style={{ backgroundColor: t.code, borderRadius: 12, padding: 12 }}><T mono color="#e8ecff" size={14}>{lines.join('\n')}</T></View>
      <T size={13} color={t.muted}>Type the same lines into Desmos on test day.</T>
      <Button title="Graph it" onPress={() => openDesmos(lines)} />
    </View>
  );
}
