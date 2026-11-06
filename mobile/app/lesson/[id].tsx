// One lesson: Mr. Lumino introduces it, the lesson teaches (worked examples reveal step by step), then a quick check.
import { useEffect, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Screen, T, Button } from '@/components/ui';
import { useTheme } from '@/lib/theme';
import { usePlan } from '@/lib/auth';
import { award } from '@/lib/progress';
import { emit } from '@/lib/events';
import { COURSES, unitTier, canAccess, courseTestId, levelState, getCourseProgress } from '@/lib/tests';
import { loadLessonText, markLessonDone, isLessonDone, isLabDone, markLabDone, type Block, type LessonText } from '@shared/courses';
import { Lab } from '@/components/Lab';
import { DesmosBlock, DesmosButton } from '@/components/Desmos';
import { HelpWalk } from '@/components/HelpWalk';
import { recordAnswer } from '@shared/play';
import { courseUsesDesmos } from '@shared/desmos';
import { PLAN_INFO } from '@shared/plans';
import { LuminoSays } from '@/components/Lumino';
import { speak, stopSpeaking, voiceOn } from '@/lib/voice';

function spokenBlock(b: Block): string | null {
  switch (b.t) {
    case 'p': case 'h': return b.text;
    case 'key': return `Big idea: ${b.text}`;
    case 'tip': return `Tip: ${b.text}`;
    case 'oops': return `Watch out: ${b.text}`;
    case 'list': return b.items.join('. ');
    case 'ex': return `Example: ${b.problem}. ${b.steps.join('. ')}. Answer: ${b.answer}.`;
    case 'lab': return `${b.kind === 'lab' ? 'Virtual lab' : 'Try it'}: ${b.title}. ${b.aim} ${b.steps.join(' ')}`;
    default: return null;
  }
}

function Box({ tag, bg, border, color, children }: { tag: string; bg: string; border: string; color?: string; children: React.ReactNode }) {
  const t = useTheme();
  return <View style={{ backgroundColor: bg, borderColor: border, borderWidth: 1, borderRadius: 16, padding: 14, gap: 6 }}>
    <T size={11} weight="900" color={color ?? t.muted} style={{ letterSpacing: 0.6 }}>{tag}</T>{children}</View>;
}

function Example({ b }: { b: Extract<Block, { t: 'ex' }> }) {
  const t = useTheme(); const [shown, setShown] = useState(0); const done = shown >= b.steps.length;
  return (
    <View style={{ borderWidth: 2, borderStyle: 'dashed', borderColor: t.accent, borderRadius: 16, padding: 14, gap: 8, backgroundColor: t.card }}>
      <T size={11} weight="900" color={t.muted} style={{ letterSpacing: 0.6 }}>✏️ WORKED EXAMPLE</T>
      <T weight="800">{b.problem}</T>
      {b.steps.slice(0, shown).map((s, i) => <T key={i}>{i + 1}. {s}</T>)}
      {done ? <T weight="900" color={t.ok}>✅ {b.answer}</T>
        : <Button title={shown ? 'Next step' : 'Show the first step'} onPress={() => { Haptics.selectionAsync(); setShown(shown + 1); }} />}
    </View>
  );
}

function BlockView({ b, active, onLab }: { b: Block; active: boolean; onLab: (title: string) => void }) {
  const t = useTheme(); const hl = active ? { backgroundColor: t.accentSoft, borderRadius: 12, padding: 6, margin: -6 } : null;
  switch (b.t) {
    case 'h': return <T size={19} weight="900" style={{ marginTop: 6, ...hl }}>{b.text}</T>;
    case 'p': return <T size={17} style={{ lineHeight: 25, ...hl }}>{b.text}</T>;
    case 'list': return <View style={{ gap: 6, ...hl }}>{b.items.map((x, i) => <View key={i} style={{ flexDirection: 'row', gap: 8 }}><T size={17}>•</T><T size={17} style={{ flex: 1, lineHeight: 24 }}>{x}</T></View>)}</View>;
    case 'key': return <Box tag="💡 BIG IDEA" bg="#fff3b8" border="#ffe066" color="#8a6d00"><T weight="700" color="#3b2f00" size={17}>{b.text}</T></Box>;
    case 'tip': return <Box tag="✨ TIP" bg={t.accentSoft} border={t.accentSoft}><T size={16}>{b.text}</T></Box>;
    case 'oops': return <Box tag="⚠️ WATCH OUT" bg={t.bad + '1a'} border={t.bad + '40'} color={t.bad}><T size={16}>{b.text}</T></Box>;
    case 'code': return <View style={{ backgroundColor: t.code, borderRadius: 12, padding: 12 }}><T mono color="#e8ecff" size={14}>{b.text}</T></View>;
    case 'ex': return <Example b={b} />;
    case 'lab': return <Lab b={b} onDone={() => onLab(b.title)} />;
    case 'desmos': return <DesmosBlock lines={b.lines} />;
  }
}

export default function LessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>(); const [cid, us, ls] = String(id).split('~'); const u = Number(us), l = Number(ls);
  const t = useTheme(); const plan = usePlan();
  const c = COURSES.find(x => x.id === cid); const unit = c?.units[u]; const lesson = unit?.lessons[l];
  const [text, setText] = useState<LessonText | null | undefined>(undefined);
  const [reading, setReading] = useState(-1); const run = useRef(0);
  const [qi, setQi] = useState(0); const [picks, setPicks] = useState<Record<number, number>>({});
  useEffect(() => { loadLessonText(cid).then(x => setText(x?.[u]?.[l] ?? null)); return () => { run.current++; stopSpeaking(); }; }, [cid, u, l]);

  if (!c || !unit || !lesson) return <Screen><T>Lesson not found.</T></Screen>;
  const tier = unitTier(c, u);
  if (!canAccess(plan, tier)) return <Screen><T size={56}>🔒</T><T size={22} weight="900">This unit is part of {PLAN_INFO[tier].name}</T><Button title="See plans" onPress={() => router.replace('/(tabs)/me')} /></Screen>;

  const checks = lesson.checks; const q = checks[qi]; const picked = picks[qi]; const allDone = Object.keys(picks).length === checks.length;
  const right = checks.filter((x, i) => picks[i] === x.answer).length;
  const nextLesson = l + 1 < unit.lessons.length ? `${cid}~${u}~${l + 1}` : u + 1 < c.units.length && c.units[u + 1].lessons.length ? `${cid}~${u + 1}~0` : null;

  const labDone = (title: string) => { if (!isLabDone(cid, u, l, title)) { markLabDone(cid, u, l, title); award(10, title); emit('progress'); } };
  const readAloud = () => {
    if (reading >= 0) { run.current++; stopSpeaking(); setReading(-1); return; }
    if (!text) return; const r = ++run.current;
    const go = (i: number) => {
      if (r !== run.current) return;
      while (i < text.blocks.length && !spokenBlock(text.blocks[i])) i++;
      if (i >= text.blocks.length) { setReading(-1); return; }
      setReading(i); speak(spokenBlock(text.blocks[i])!, { onEnd: () => go(i + 1) }).then(ok => { if (!ok) setReading(-1); });
    };
    go(0);
  };
  const pick = (ci: number) => {
    if (picked != null) return; const n = { ...picks, [qi]: ci }; setPicks(n);
    recordAnswer({ id: `${cid}~${u}~${l}~${qi}`, prompt: q.q, choices: q.choices, answer: q.answer, explanation: q.why, code: q.code }, ci === q.answer, `${c.name}: ${lesson.title}`);
    Haptics.notificationAsync(ci === q.answer ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error);
    if (Object.keys(n).length === checks.length) {
      const score = checks.filter((x, i) => n[i] === x.answer).length;
      if (!isLessonDone(cid, u, l)) award(15 + score * 5, `Lesson: ${lesson.title}`);
      markLessonDone(cid, u, l); emit('progress');
    }
  };

  return (
    <Screen>
      <View style={{ height: 30 }} />
      <View style={{ flexDirection: 'row', gap: 6 }}>{unit.lessons.map((_, i) => <View key={i} style={{ flex: 1, height: 6, borderRadius: 3, backgroundColor: i === l ? t.accent : isLessonDone(cid, u, i) ? t.ok : t.line }} />)}</View>
      <T size={12} weight="800" color={t.muted}>UNIT {u + 1} · LESSON {l + 1} OF {unit.lessons.length}</T>
      <T size={26} weight="900">{lesson.title}</T>
      {courseUsesDesmos(c) && <DesmosButton />}
      {text === undefined ? <T color={t.muted}>Loading…</T> : text === null ? <T color={t.muted}>This lesson couldn't load.</T> : <>
        <LuminoSays key={String(id)} text={text.say} mood="teach" after="idle" size={100} />
        {voiceOn() && <Button kind="ghost" title={reading >= 0 ? '⏹ Stop reading' : '🔊 Read this lesson to me'} onPress={readAloud} />}
        <View style={{ gap: 14 }}>{text.blocks.map((b, i) => <BlockView key={i} b={b} active={i === reading} onLab={labDone} />)}</View>
        {lesson.terms.length > 0 && <View style={{ gap: 8 }}><T size={19} weight="900">🔑 Key terms</T>
          {lesson.terms.map(([term, d]) => <View key={term} style={{ backgroundColor: t.card, borderRadius: 12, borderWidth: 1, borderColor: t.line, padding: 12 }}><T weight="800">{term}</T><T size={14} color={t.muted}>{d}</T></View>)}</View>}

        <View style={{ backgroundColor: t.card, borderRadius: 20, borderWidth: 2, borderColor: t.accentSoft, padding: 16, gap: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><T size={19} weight="900">✅ Quick check</T><T color={t.muted}>{qi + 1} of {checks.length}</T></View>
          <T size={17} weight="800">{q.q}</T>
          {q.code && <View style={{ backgroundColor: t.code, borderRadius: 12, padding: 12 }}><T mono color="#e8ecff" size={14}>{q.code}</T></View>}
          {picked == null && <HelpWalk key={`${id}-${qi}`} q={{ id: `${id}~${qi}`, prompt: q.q, choices: q.choices, answer: q.answer, explanation: q.why }} desmos={courseUsesDesmos(c)} />}
          {q.choices.map((ch, ci) => {
            const isAns = picked != null && ci === q.answer; const isWrong = picked === ci && ci !== q.answer;
            return <Pressable key={ci} onPress={() => pick(ci)} disabled={picked != null} style={({ pressed }) => ({ flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 14, borderWidth: 2,
              borderColor: isAns ? t.ok : isWrong ? t.bad : t.line, backgroundColor: isAns ? t.ok + '1f' : isWrong ? t.bad + '1a' : t.bg, opacity: picked != null && !isAns && !isWrong ? 0.55 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] })}>
              <T weight="800">{String.fromCharCode(65 + ci)}</T><T style={{ flex: 1 }}>{ch}</T></Pressable>;
          })}
          {picked != null && <LuminoSays key={`why-${qi}`} size={80} mood={picked === q.answer ? 'correct' : 'wrong'} after={picked === q.answer ? 'correct' : 'teach'}
            text={picked === q.answer ? `Yes! ${q.why}` : `Not quite. It's ${String.fromCharCode(65 + q.answer)}. ${q.why}`} />}
          {picked != null && qi < checks.length - 1 && <Button title="Next question →" onPress={() => setQi(qi + 1)} />}
          {allDone && qi === checks.length - 1 && <View style={{ gap: 10 }}>
            <T weight="800">{right} of {checks.length} right. {right === checks.length ? 'You nailed this lesson! 🎉' : 'Nice work! Re-read the part you missed, then keep going.'}</T>
            {nextLesson && <Button title="Next lesson →" onPress={() => router.replace(`/lesson/${nextLesson}`)} />}
            <Button kind={nextLesson ? 'ghost' : 'primary'} title={`Practice Unit ${u + 1}`} onPress={() => router.push(`/quiz/${courseTestId(cid, u, 0, levelState(cid, u, 0, getCourseProgress()).attempts)}`)} />
          </View>}
        </View>
      </>}
      <View style={{ height: 40 }} />
    </Screen>
  );
}
