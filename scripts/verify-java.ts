// Compiles and runs generated AP CSA questions with real Java and compares output to the answer key.
// Usage: npx tsx scripts/verify-java.ts   (needs javac/java on PATH)
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { COURSES, buildCourseTest, courseTestId } from '../src/lib/courses/index.ts';

const dir = process.env.OUT ?? 'scratch-java'; rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
const csa = COURSES.find(c => c.id === 'ap-csa')!;
type Item = { id: string; decls: string; stmts: string; expect: string; countStars: boolean };
const items: Item[] = [];

for (let u = 0; u < csa.units.length; u++) for (let l = 0; l < 3; l++) for (let a = 0; a < 25; a++) {
  for (const q of buildCourseTest(courseTestId('ap-csa', u, l, a))!.questions) {
    if (!q.code) continue; // conceptual questions are checked by hand
    const decls: string[] = []; const stmts: string[] = []; let depth = 0; let cur: string[] | null = null;
    for (const line of q.code.split('\n')) {
      const t = line.trim();
      if (depth === 0 && /^(public )?(static )?(class|int|String|boolean|double|void)\b.*\(.*\)\s*\{$|^(public )?class\b/.test(t) && !t.startsWith('int[]') && !/=/.test(t.split('(')[0])) cur = decls;
      const target = cur ?? stmts;
      target.push(line.replace(/^(\s*)public class /, '$1static class ').replace(/^(\s*)class /, '$1static class '));
      depth += (line.match(/\{/g) ?? []).length - (line.match(/\}/g) ?? []).length;
      if (depth === 0) cur = null;
    }
    const call = q.prompt.match(/^What does (.+\)) return\?$/);
    if (call) stmts.push(`System.out.println(${call[1]});`);
    items.push({ id: q.id, decls: decls.join('\n'), stmts: stmts.join('\n'), expect: q.choices[q.answer], countStars: q.prompt.includes('How many times') });
  }
}

const CHUNK = 400; let checked = 0, failed = 0;
for (let c = 0; c * CHUNK < items.length; c++) {
  const part = items.slice(c * CHUNK, (c + 1) * CHUNK);
  const holders = part.map((it, i) => `static class Q${i} {\n${it.decls}\nstatic void run() {\n${it.stmts}\n}\n}`).join('\n');
  const runs = part.map((_, i) => `cap(${i}, () -> Q${i}.run());`).join('\n');
  const src = `import java.util.*;\nimport java.io.*;\npublic class V${c} {\n${holders}\nstatic String[] out = new String[${part.length}];\nstatic void cap(int i, Runnable r) { PrintStream o = System.out; ByteArrayOutputStream b = new ByteArrayOutputStream(); System.setOut(new PrintStream(b)); try { r.run(); } catch (Throwable t) { System.out.print("EXC:" + t); } System.setOut(o); out[i] = b.toString().trim(); }\npublic static void main(String[] a) {\n${runs}\nfor (String s : out) System.out.println(s.replace("\\n", "\\\\n"));\n}\n}`;
  writeFileSync(`${dir}/V${c}.java`, src);
  execSync(`javac -nowarn -d ${dir} ${dir}/V${c}.java 2>&1 | grep -v JAVA_TOOL || true`, { stdio: 'inherit' });
  const lines = execSync(`java -cp ${dir} V${c} 2>/dev/null`, { maxBuffer: 64 << 20 }).toString().split('\n');
  part.forEach((it, i) => {
    checked++;
    const got = it.countStars ? String((lines[i] ?? '').split('*').length - 1) : (lines[i] ?? '').trim();
    if (got !== it.expect) { failed++; if (failed <= 15) console.error(`✗ ${it.id}: java printed "${got}", key says "${it.expect}"`); }
  });
}
rmSync(dir, { recursive: true, force: true });
console.log(`${checked} Java questions run · ${failed ? failed + ' mismatches' : '✓ every answer key matches real Java output'}`);
process.exit(failed ? 1 : 0);
