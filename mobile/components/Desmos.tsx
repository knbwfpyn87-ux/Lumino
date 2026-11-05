// Desmos on iPhone: opens the Desmos graphing calculator in an in-app browser.
import { View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { DESMOS_URL } from '@shared/desmos';

export const openDesmos = () => WebBrowser.openBrowserAsync(DESMOS_URL);

/** A small "📈 Desmos" button for screens in classes that allow the calculator. */
export function DesmosButton() {
  return <Button kind="ghost" title="📈 Open Desmos calculator" onPress={openDesmos} />;
}

/** Lesson block: example lines to type, and a button to open Desmos. */
export function DesmosBlock({ lines }: { lines: string[] }) {
  const t = useTheme();
  return (
    <View style={{ borderWidth: 1, borderColor: t.accent, borderRadius: 16, padding: 14, gap: 8, backgroundColor: t.card }}>
      <T size={11} weight="900" color={t.muted} style={{ letterSpacing: 0.6 }}>📈 TRY IT IN DESMOS</T>
      <View style={{ backgroundColor: t.code, borderRadius: 12, padding: 12 }}><T mono color="#e8ecff" size={14}>{lines.join('\n')}</T></View>
      <T size={13} color={t.muted}>Type these lines into Desmos.</T>
      <Button title="Open Desmos" onPress={openDesmos} />
    </View>
  );
}
