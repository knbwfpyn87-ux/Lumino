// "Walk me through it": step-by-step help for the current question (same steps as the website).
import { useState } from 'react';
import { View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { walkthrough, type HelpQ } from '@shared/walkthrough';
import { speak, voiceOn } from '@/lib/voice';

export function HelpWalk({ q, desmos }: { q: HelpQ; desmos?: boolean }) {
  const t = useTheme(); const steps = walkthrough(q, { desmos }); const [n, setN] = useState(0);
  const next = () => { Haptics.selectionAsync(); const k = n + 1; setN(k); const s = steps[k - 1]; if (s && voiceOn()) speak(`${s.title}. ${s.text}`, {}); };
  if (n === 0) return <Button kind="ghost" title="🆘 Walk me through it" onPress={next} />;
  const nextStep = steps[n];
  return (
    <View style={{ backgroundColor: t.accentSoft, borderRadius: 16, padding: 14, gap: 8 }}>
      <T size={11} weight="900" color={t.muted} style={{ letterSpacing: 0.6 }}>🆘 WALKTHROUGH · STEP {Math.min(n, steps.length)} OF {steps.length}</T>
      {steps.slice(0, n).map((s, i) => <T key={i} size={15} weight={s.final ? '700' : '400'}><T size={15} weight="800">{s.title}: </T>{s.text}</T>)}
      {nextStep ? <Button kind={nextStep.final ? 'ghost' : 'primary'} onPress={next}
        title={nextStep.final ? 'Show the answer' : nextStep.title === 'Narrow it down' ? 'Rule out two choices' : 'Next step'} />
        : <T size={13} color={t.muted}>Now pick the answer and make sure you see why it works.</T>}
    </View>
  );
}
