// A tiny 2D physics engine for virtual labs. Meters, seconds, kilograms; y points up.
// Circles only, plus springs and rods between a body and a fixed point or another body.
// Fixed time step with semi-implicit Euler: simple and stable enough for classroom scenes.

export type Vec = { x: number; y: number };
export type Body = {
  pos: Vec; vel: Vec; r: number; m: number;  // m = Infinity means fixed in place
  color?: string; trail?: Vec[];             // trail: set to [] to record the path
};
export type Link = { a: Body; b: Body | Vec; kind: 'rod' | 'spring'; len: number; k?: number; damp?: number };
export type World = {
  bodies: Body[]; links: Link[];
  g: number;          // gravity (m/s²), pulls toward −y
  drag: number;       // linear air drag coefficient (1/s), 0 = none
  ground: boolean;    // a floor at y = 0
  bounce: number;     // restitution for floor and collisions, 0..1
  collide: boolean;   // circle–circle collisions
  t: number;
};

export const world = (o: Partial<World> = {}): World =>
  ({ bodies: [], links: [], g: 9.8, drag: 0, ground: true, bounce: 0.6, collide: true, t: 0, ...o });
export const body = (x: number, y: number, o: Partial<Body> = {}): Body =>
  ({ pos: { x, y }, vel: { x: 0, y: 0 }, r: 0.1, m: 1, ...o });

const isBody = (p: Body | Vec): p is Body => 'pos' in p;
const anchor = (p: Body | Vec) => (isBody(p) ? p.pos : p);
const inv = (b: Body | Vec) => (isBody(b) && Number.isFinite(b.m) ? 1 / b.m : 0);

/** Advances the world by dt seconds (in small fixed steps). */
export function step(w: World, dt: number, h = 1 / 240) {
  const n = Math.max(1, Math.round(dt / h)); for (let i = 0; i < n; i++) tick(w, dt / n);
}

function tick(w: World, h: number) {
  // 1. forces: gravity, drag, springs
  for (const b of w.bodies) if (Number.isFinite(b.m)) {
    b.vel.y -= w.g * h;
    b.vel.x -= w.drag * b.vel.x * h; b.vel.y -= w.drag * b.vel.y * h;
  }
  for (const l of w.links) if (l.kind === 'spring') {
    const p = anchor(l.b), dx = p.x - l.a.pos.x, dy = p.y - l.a.pos.y, d = Math.hypot(dx, dy) || 1e-9;
    const f = (l.k ?? 50) * (d - l.len); const ux = dx / d, uy = dy / d;
    const rv = ((isBody(l.b) ? l.b.vel.x : 0) - l.a.vel.x) * ux + ((isBody(l.b) ? l.b.vel.y : 0) - l.a.vel.y) * uy;
    const F = f + (l.damp ?? 0) * rv;
    l.a.vel.x += F * ux * inv(l.a) * h; l.a.vel.y += F * uy * inv(l.a) * h;
    if (isBody(l.b)) { l.b.vel.x -= F * ux * inv(l.b) * h; l.b.vel.y -= F * uy * inv(l.b) * h; }
  }
  // 2. move
  for (const b of w.bodies) if (Number.isFinite(b.m)) { b.pos.x += b.vel.x * h; b.pos.y += b.vel.y * h; }
  // 3. constraints: rods keep a fixed length (a few passes)
  for (let it = 0; it < 4; it++) for (const l of w.links) if (l.kind === 'rod') {
    const p = anchor(l.b), dx = p.x - l.a.pos.x, dy = p.y - l.a.pos.y, d = Math.hypot(dx, dy) || 1e-9;
    const wa = inv(l.a), wb = inv(l.b); if (wa + wb === 0) continue;
    const c = (d - l.len) / (wa + wb), ux = dx / d, uy = dy / d;
    l.a.pos.x += ux * c * wa; l.a.pos.y += uy * c * wa;
    if (isBody(l.b)) { l.b.pos.x -= ux * c * wb; l.b.pos.y -= uy * c * wb; }
    // remove velocity along the rod
    const rv = ((isBody(l.b) ? l.b.vel.x : 0) - l.a.vel.x) * ux + ((isBody(l.b) ? l.b.vel.y : 0) - l.a.vel.y) * uy;
    const j = rv / (wa + wb);
    l.a.vel.x += ux * j * wa; l.a.vel.y += uy * j * wa;
    if (isBody(l.b)) { l.b.vel.x -= ux * j * wb; l.b.vel.y -= uy * j * wb; }
  }
  // 4. collisions
  if (w.ground) for (const b of w.bodies) if (Number.isFinite(b.m) && b.pos.y < b.r) {
    b.pos.y = b.r; if (b.vel.y < 0) b.vel.y = -b.vel.y * w.bounce;
    if (Math.abs(b.vel.y) < 0.05) b.vel.y = 0;
  }
  if (w.collide) for (let i = 0; i < w.bodies.length; i++) for (let k = i + 1; k < w.bodies.length; k++) {
    const a = w.bodies[i], b = w.bodies[k]; const dx = b.pos.x - a.pos.x, dy = b.pos.y - a.pos.y, d = Math.hypot(dx, dy);
    const wa = inv(a), wb = inv(b); if (d >= a.r + b.r || d === 0 || wa + wb === 0) continue;
    const nx = dx / d, ny = dy / d, over = (a.r + b.r - d) / (wa + wb);
    a.pos.x -= nx * over * wa; a.pos.y -= ny * over * wa; b.pos.x += nx * over * wb; b.pos.y += ny * over * wb;
    const rv = (b.vel.x - a.vel.x) * nx + (b.vel.y - a.vel.y) * ny; if (rv > 0) continue;
    const j = -(1 + w.bounce) * rv / (wa + wb);
    a.vel.x -= j * nx * wa; a.vel.y -= j * ny * wa; b.vel.x += j * nx * wb; b.vel.y += j * ny * wb;
  }
  for (const b of w.bodies) if (b.trail) { b.trail.push({ ...b.pos }); if (b.trail.length > 600) b.trail.shift(); }
  w.t += h;
}

// Ready-made scenes. Each takes the lab's slider values (by name) so sims follow the sliders.
type P = Record<string, number>;
const deg = Math.PI / 180;
export const SCENES: Record<string, (p: P) => World> = {
  /** Drop a ball from height h (with optional air drag). */
  drop: p => { const w = world({ drag: p.drag ?? 0, bounce: 0.5 }); w.bodies.push(body(0, p.h ?? 5, { r: 0.15 * Math.cbrt(p.m ?? 1), m: p.m ?? 1, trail: [] })); return w; },
  /** Launch at speed v and angle a (degrees) from height h. */
  projectile: p => { const w = world({ bounce: 0.3, drag: p.drag ?? 0 }); const v = p.v ?? 15, a = (p.a ?? 45) * deg;
    const b = body(0, (p.h ?? 0) + 0.1, { r: 0.1, trail: [] }); b.vel = { x: v * Math.cos(a), y: v * Math.sin(a) }; w.bodies.push(b); return w; },
  /** Pendulum of length L released from angle a (degrees). */
  pendulum: p => { const w = world({ ground: false, collide: false }); const L = p.L ?? 1, a = (p.a ?? 20) * deg; const top = { x: 0, y: L + 0.2 };
    const b = body(top.x + L * Math.sin(a), top.y - L * Math.cos(a), { r: 0.06, m: p.m ?? 1, trail: [] }); w.bodies.push(b); w.links.push({ a: b, b: top, kind: 'rod', len: L }); return w; },
  /** Mass m on a vertical spring with constant k, pulled down by A meters. */
  spring: p => { const w = world({ ground: false, collide: false }); const m = p.m ?? 0.2, k = p.k ?? 20; const top = { x: 0, y: 2 };
    const rest = 1, eq = rest + m * w.g / k; const b = body(0, top.y - eq - (p.A ?? 0.1), { r: 0.08, m });
    w.bodies.push(b); w.links.push({ a: b, b: top, kind: 'spring', len: rest, k }); return w; },
  /** Cart m1 at v1 hits cart m2 at rest (e = bounce: 1 elastic, 0 sticky-ish). */
  collision: p => { const w = world({ g: 0, ground: false, bounce: p.e ?? 1 }); const m1 = p.m1 ?? 1, m2 = p.m2 ?? 1;
    const a = body(-1.5, 0.5, { m: m1, r: 0.12 * Math.cbrt(m1) }); a.vel.x = p.v1 ?? 2; w.bodies.push(a, body(0.5, 0.5, { m: m2, r: 0.12 * Math.cbrt(m2) })); return w; },
};
