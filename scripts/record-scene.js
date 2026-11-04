const { chromium } = require('playwright'); const fs = require('fs'); const { execFileSync } = require('child_process');
const [,, scene, outDir, ttsDir, outMp4] = process.argv;
const dur = JSON.parse(fs.readFileSync(ttsDir + '/durations.json', 'utf8'));
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1920, height: 1080 }, recordVideo: { dir: outDir, size: { width: 1920, height: 1080 } } });
  await ctx.addInitScript(d => { window.__luminoDur = d; localStorage.setItem('lumino:theme', 'light'); localStorage.setItem('lumino:voice', 'off'); }, dur);
  const t0 = Date.now(); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(`http://localhost:4196/#/lumino-scene?s=${scene}`);
  await p.waitForSelector('.scene[data-done="1"]', { timeout: 120000 }); await p.waitForTimeout(1500);
  const marks = await p.evaluate(() => window.__marks || []); const v = p.video(); await ctx.close(); const webm = await v.path(); await b.close();
  // Audio: each line starts exactly when its bubble starts (ms from the start of the recording)
  const TRIM = 600; const inputs = [], filters = [];
  marks.forEach((m, i) => { const f = `${ttsDir}/clip-${m.k.replace(':', '-')}.wav`; if (!fs.existsSync(f)) return;
    inputs.push('-i', f); const delay = Math.max(0, m.t - t0 - TRIM); filters.push(`[${inputs.length / 2}:a]adelay=${delay}|${delay}[a${i}]`); });
  const labels = filters.map(f => f.match(/\[(a\d+)\]$/)[0]).join('');
  const fc = filters.join(';') + `;${labels}amix=inputs=${filters.length}:normalize=0,loudnorm=I=-16:TP=-1.5,apad[aout]`;
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(TRIM / 1000), '-i', webm, ...inputs, '-filter_complex', fc, '-map', '0:v', '-map', '[aout]',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', '30', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', outMp4]);
  console.log(JSON.stringify({ scene, lines: marks.length, errs, offsets: marks.map(m => [m.k, m.t - t0 - TRIM]) }));
})();
