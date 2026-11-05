// AP Computer Science A (Java). Unit order follows the AP CSA course as taught on CodeHS:
// 1 Primitive Types · 2 Using Objects · 3 Boolean Expressions & if · 4 Iteration · 5 Writing Classes
// 6 Array · 7 ArrayList · 8 2D Array · 9 Inheritance · 10 Recursion
// Every answer is computed by simulating the Java code in JS (int division truncates, % keeps the dividend's sign).
import type { Gen, Rng } from '../generated';

const idiv = (a: number, b: number) => Math.trunc(a / b);
const jd = (v: number) => (Number.isInteger(v) ? v.toFixed(1) : String(v)); // Java double printing
const list = (xs: (number | string)[]) => `[${xs.join(', ')}]`;
const near = (n: number) => [String(n + 1), String(n - 1), String(n + 2)];

// ---------- Unit 1: Primitive Types ----------
const u1a: Gen = r => { const a = r.int(1, 12), b = r.int(1, 9), c = r.int(2, 4), x = (a + b) * c;
  return { prompt: 'What is printed?', code: `int x = ${a};\nx += ${b};\nx *= ${c};\nSystem.out.println(x);`, correct: String(x), wrong: [String(a + b * c), String(a * c + b), String(x + c)], explanation: `x = ${a} → ${a + b} → ${x}.` }; };
const u1b: Gen = r => { const a = r.int(7, 40), b = r.int(2, 6), c = r.int(7, 30), d = r.int(2, 5), v = idiv(a, b) + (c % d);
  return { prompt: 'What is printed?', code: `System.out.println(${a} / ${b} + ${c} % ${d});`, correct: String(v), wrong: [jd(a / b + (c % d)), String(idiv(a, b) + idiv(c, d)), String(v + 1)], explanation: `${a} / ${b} = ${idiv(a, b)} (integer division), ${c} % ${d} = ${c % d}, total ${v}.` }; };
const u1c: Gen = r => { const a = r.int(3, 30), b = r.pick([2, 4, 5, 8]), mode = r.int(0, 1);
  if (mode === 0) { const v = a / b; return { prompt: 'What is printed?', code: `int a = ${a};\nint b = ${b};\nSystem.out.println((double) a / b);`, correct: jd(v), wrong: [jd(idiv(a, b)), String(idiv(a, b)), jd(v + 0.5)], explanation: `Casting a to double first gives real division: ${jd(v)}.` }; }
  const d = r.int(1, 9) + r.pick([0.25, 0.5, 0.75]), m = r.int(2, 5), v = Math.trunc(d * m);
  return { prompt: 'What is printed?', code: `double d = ${d};\nint n = (int) (d * ${m});\nSystem.out.println(n);`, correct: String(v), wrong: [jd(d * m), String(Math.round(d * m) === v ? v + 1 : Math.round(d * m)), String(Math.trunc(d) * m)], explanation: `${d} × ${m} = ${d * m}; casting to int truncates to ${v}.` }; };

// ---------- Unit 2: Using Objects ----------
const WORDS = ['computer', 'science', 'lumino', 'variable', 'abstract', 'boolean', 'recursion', 'algorithm', 'iterator', 'database'];
const u2a: Gen = r => { const w = r.pick(WORDS); return { prompt: 'What is printed?', code: `String s = "${w}";\nSystem.out.println(s.length());`, correct: String(w.length), wrong: near(w.length).slice(0, 2).concat(String(w.length - 2)), explanation: `"${w}" has ${w.length} characters.` }; };
const u2b: Gen = r => { const w = r.pick(WORDS), a = r.int(0, 3), b = r.int(a + 1, Math.min(w.length, a + 5)), v = w.substring(a, b);
  return { prompt: 'What is printed?', code: `String s = "${w}";\nSystem.out.println(s.substring(${a}, ${b}));`, correct: v, wrong: [w.substring(a, b + 1), w.substring(a + 1, b + 1), w.substring(a + 1, b)].map(x => x || '(empty string)'), explanation: `substring(${a}, ${b}) takes indexes ${a} through ${b - 1}: "${v}".` }; };
const u2c: Gen = r => { const w = r.pick(WORDS), ch = w[r.int(1, w.length - 1)], i = w.indexOf(ch), mode = r.int(0, 2);
  if (mode === 0) return { prompt: 'What is printed?', code: `String s = "${w}";\nint i = s.indexOf("${ch}");\nSystem.out.println(s.substring(i));`, correct: w.substring(i), wrong: [w.substring(i + 1), w.substring(0, i), w.substring(i, i + 1) === w.substring(i) ? w.substring(i - 1) : w.substring(i, i + 1)].map(x => x || '(empty string)'), explanation: `indexOf("${ch}") is ${i}, so substring(${i}) = "${w.substring(i)}".` };
  if (mode === 1) { const b = r.int(2, 4), e = r.int(2, 4), v = Math.pow(b, e); return { prompt: 'What is printed?', code: `System.out.println(Math.pow(${b}, ${e}));`, correct: jd(v), wrong: [String(v), jd(b * e), jd(Math.pow(e, b) === v ? v * b : Math.pow(e, b))], explanation: `Math.pow returns a double: ${jd(v)}.` }; }
  const a = r.int(-20, -1), b = r.int(1, 15), v = Math.abs(a) + b;
  return { prompt: 'What is printed?', code: `int a = ${a};\nSystem.out.println(Math.abs(a) + ${b});`, correct: String(v), wrong: [String(a + b), String(-v), String(Math.abs(a + b))].filter(x => x !== String(v)).concat(String(v + 1)).slice(0, 3), explanation: `Math.abs(${a}) = ${Math.abs(a)}; + ${b} = ${v}.` }; };

// ---------- Unit 3: Boolean Expressions and if Statements ----------
const u3a: Gen = r => { const x = r.int(0, 10), y = r.int(0, 10), p = r.int(1, 9), q = r.int(1, 9), v = x > p && y < q;
  return { prompt: 'What is printed?', code: `int x = ${x}, y = ${y};\nSystem.out.println(x > ${p} && y < ${q});`, correct: String(v), wrong: [String(!v), 'error', String(x > p)].filter((w, i, a) => a.indexOf(w) === i && w !== String(v)).concat(['0', '1']).slice(0, 3), explanation: `x > ${p} is ${x > p}; y < ${q} is ${y < q}; && gives ${v}.` }; };
const u3b: Gen = r => { const s = r.int(40, 100), a = r.pick([90, 85]), b = r.pick([80, 75]), c = r.pick([70, 65]), g = s >= a ? 'A' : s >= b ? 'B' : s >= c ? 'C' : 'F';
  return { prompt: 'What is printed?', code: `int score = ${s};\nif (score >= ${a}) System.out.println("A");\nelse if (score >= ${b}) System.out.println("B");\nelse if (score >= ${c}) System.out.println("C");\nelse System.out.println("F");`, correct: g, wrong: ['A', 'B', 'C', 'F'].filter(x => x !== g), explanation: `${s} first satisfies the "${g}" branch; else-if stops after the first true condition.` }; };
const u3c: Gen = r => { const a = r.int(0, 9), b = r.int(0, 9), c = r.int(1, 9), v = !(a == b) || (b > c && a < c), alt = !(a == b) && (b > c || a < c);
  return { prompt: 'What is printed?', code: `int a = ${a}, b = ${b}, c = ${c};\nboolean r = !(a == b) || (b > c && a < c);\nSystem.out.println(r);`, correct: String(v), wrong: [String(!v), 'compile error', alt === v ? 'nothing' : String(alt)].filter(x => x !== String(v)).concat(['null']).slice(0, 3), explanation: `!(a == b) is ${!(a == b)}${!(a == b) ? ', so || short-circuits to true' : `; (b > c && a < c) is ${b > c && a < c}`}.` }; };

// ---------- Unit 4: Iteration ----------
const u4a: Gen = r => { const s = r.int(0, 3), e = r.int(s + 3, s + 9), sum = Array.from({ length: e - s }, (_, i) => s + i).reduce((x, y) => x + y, 0);
  return { prompt: 'What is printed?', code: `int sum = 0;\nfor (int i = ${s}; i < ${e}; i++) {\n  sum += i;\n}\nSystem.out.println(sum);`, correct: String(sum), wrong: [String(sum + e), String(sum - s), String(e - s)].filter(x => x !== String(sum)).concat(String(sum + 1)).slice(0, 3), explanation: `Adds ${s} through ${e - 1} = ${sum}.` }; };
const u4b: Gen = r => { let n = r.int(20, 200); const d = r.pick([2, 3]); let count = 0; const n0 = n; while (n > 1) { n = idiv(n, d); count++; }
  return { prompt: 'What is printed?', code: `int n = ${n0};\nint count = 0;\nwhile (n > 1) {\n  n /= ${d};\n  count++;\n}\nSystem.out.println(count);`, correct: String(count), wrong: near(count), explanation: `n is divided by ${d} (integer division) ${count} times before reaching 1 or less.` }; };
const u4c: Gen = r => { const a = r.int(2, 6), mode = r.int(0, 1);
  if (mode === 0) { let c = 0; for (let i = 0; i < a; i++) for (let j = i; j < a; j++) c++;
    return { prompt: 'How many times is "*" printed?', code: `for (int i = 0; i < ${a}; i++) {\n  for (int j = i; j < ${a}; j++) {\n    System.out.print("*");\n  }\n}`, correct: String(c), wrong: [String(a * a), String(c - a), String(c + 1)].filter(x => x !== String(c)).concat(String(c + a)).slice(0, 3), explanation: `Inner loop runs ${a}, ${a - 1}, …, 1 times: total ${c}.` }; }
  const w = r.pick(WORDS); let out = ''; for (let i = w.length - 1; i >= 0; i -= 2) out += w.substring(i, i + 1);
  let off = ''; for (let i = w.length - 2; i >= 0; i -= 2) off += w.substring(i, i + 1);
  return { prompt: 'What is printed?', code: `String s = "${w}";\nString out = "";\nfor (int i = s.length() - 1; i >= 0; i -= 2) {\n  out += s.substring(i, i + 1);\n}\nSystem.out.println(out);`, correct: out, wrong: [off, w.split('').reverse().join(''), out.split('').reverse().join('')].filter(x => x !== out), explanation: `Starts at the last index and takes every other character backward: "${out}".` }; };

// ---------- Unit 5: Writing Classes ----------
const u5a: Gen = r => { const start = r.int(0, 10), step = r.int(1, 5), calls = r.int(2, 5), v = start + step * calls;
  return { prompt: 'What is printed?', code: `public class Counter {\n  private int count;\n  public Counter(int start) { count = start; }\n  public void add(int n) { count += n; }\n  public int getCount() { return count; }\n}\n\nCounter c = new Counter(${start});\nfor (int i = 0; i < ${calls}; i++) c.add(${step});\nSystem.out.println(c.getCount());`, correct: String(v), wrong: [String(step * calls), String(start + step), String(v + step)], explanation: `${start} + ${step} × ${calls} = ${v}.` }; };
const U5_CONCEPT: [string, string, string[], string][] = [
  ['Which keyword makes an instance variable accessible only inside its class?', 'private', ['public', 'static', 'final'], 'private hides the variable from other classes (encapsulation).'],
  ['What is a constructor\'s return type?', 'It has no return type', ['void', 'The class name', 'Object'], 'Constructors have no return type, not even void.'],
  ['A static method can be called…', 'using the class name, without an object', ['only from a constructor', 'only on an object', 'only from another class'], 'Static methods belong to the class.'],
  ['What does "this" refer to inside an instance method?', 'The current object', ['The class', 'The parent class', 'The method\'s return value'], '"this" is the object the method was called on.'],
  ['Which is an accessor (getter) method?', 'public int getAge() { return age; }', ['public void setAge(int a) { age = a; }', 'public Person(int a) { age = a; }', 'private int age;'], 'Accessors return the value of an instance variable.'],
];
const u5b: Gen = r => { const [q, a, w, e] = r.pick(U5_CONCEPT); return { prompt: q, correct: a, wrong: w, explanation: e }; };
const u5c: Gen = r => { const bal = r.int(5, 20) * 10, dep = r.int(1, 10) * 10, wd = r.int(1, 30) * 10, after = bal + dep - (wd <= bal + dep ? wd : 0);
  return { prompt: 'What is printed?', code: `public class Account {\n  private int balance;\n  public Account(int b) { balance = b; }\n  public void deposit(int amt) { balance += amt; }\n  public boolean withdraw(int amt) {\n    if (amt > balance) return false;\n    balance -= amt;\n    return true;\n  }\n  public int getBalance() { return balance; }\n}\n\nAccount a = new Account(${bal});\na.deposit(${dep});\na.withdraw(${wd});\nSystem.out.println(a.getBalance());`, correct: String(after), wrong: [String(bal + dep - wd), String(bal - wd), String(bal + dep)].filter(x => x !== String(after)).concat(String(after + 10)).slice(0, 3), explanation: wd <= bal + dep ? `${bal} + ${dep} − ${wd} = ${after}.` : `The withdrawal of ${wd} is more than ${bal + dep}, so it is refused. Balance stays ${after}.` }; };

// ---------- Unit 6: Array ----------
const arr = (r: Rng, n: number) => Array.from({ length: n }, () => r.int(-5, 20));
const u6a: Gen = r => { const a = arr(r, r.int(4, 6)), i = r.int(0, a.length - 1);
  return { prompt: 'What is printed?', code: `int[] arr = {${a.join(', ')}};\nSystem.out.println(arr[${i}] + arr.length);`, correct: String(a[i] + a.length), wrong: [String((a[i + 1] ?? a[0]) + a.length), String(a[i] + a.length - 1), String(a[i])].filter(x => x !== String(a[i] + a.length)).concat(String(a[i] + a.length + 1)).slice(0, 3), explanation: `arr[${i}] is ${a[i]} (indexes start at 0), length is ${a.length}.` }; };
const u6b: Gen = r => { const a = arr(r, r.int(5, 7)), s = a.filter(x => x % 2 === 0).reduce((x, y) => x + y, 0), all = a.reduce((x, y) => x + y, 0), odd = all - s;
  return { prompt: 'What is printed?', code: `int[] arr = {${a.join(', ')}};\nint total = 0;\nfor (int v : arr) {\n  if (v % 2 == 0) total += v;\n}\nSystem.out.println(total);`, correct: String(s), wrong: [String(all), String(odd), String(a.filter(x => x % 2 === 0).length)].filter(x => x !== String(s)).concat(String(s + 2)).slice(0, 3), explanation: `Even values: ${a.filter(x => x % 2 === 0).join(', ') || 'none'} → ${s}. (Negative evens count too; −4 % 2 == 0.)` }; };
const u6c: Gen = r => { const a = arr(r, r.int(5, 6)); const b = [...a]; for (let i = 1; i < b.length; i++) b[i] = b[i] + b[i - 1];
  const wrong1 = a.map((v, i) => (i === 0 ? v : v + a[i - 1]));
  return { prompt: 'What is printed?', code: `int[] arr = {${a.join(', ')}};\nfor (int i = 1; i < arr.length; i++) {\n  arr[i] = arr[i] + arr[i - 1];\n}\nSystem.out.println(Arrays.toString(arr));`, correct: list(b), wrong: [list(wrong1), list(a), list(b.map((v, i) => (i === b.length - 1 ? v + 1 : v)))].filter(x => x !== list(b)), explanation: 'Each element becomes a running total because arr[i − 1] was already updated.' }; };

// ---------- Unit 7: ArrayList ----------
const u7a: Gen = r => { const xs = [r.int(1, 9), r.int(1, 9), r.int(1, 9)], add = r.int(10, 20), at = r.int(0, 2), l = [...xs]; l.splice(at, 0, add);
  return { prompt: 'What is printed?', code: `ArrayList<Integer> list = new ArrayList<>();\n${xs.map(x => `list.add(${x});`).join('\n')}\nlist.add(${at}, ${add});\nSystem.out.println(list);`, correct: list(l), wrong: [list([...xs, add]), list(xs.map((x, i) => (i === at ? add : x))), list([add, ...xs])].filter(x => x !== list(l)).concat(list([...xs].reverse())).slice(0, 3), explanation: `add(${at}, ${add}) inserts at index ${at} and shifts the rest right.` }; };
const u7b: Gen = r => { const xs = Array.from({ length: 5 }, () => r.int(1, 9)), i = r.int(0, 3), j = r.int(0, 2), l = [...xs]; l.splice(i, 1); const setv = r.int(10, 30); l[j] = setv;
  const w1 = [...xs]; w1[j] = setv; w1.splice(i, 1);
  return { prompt: 'What is printed?', code: `ArrayList<Integer> list = new ArrayList<>(List.of(${xs.join(', ')}));\nlist.remove(${i});\nlist.set(${j}, ${setv});\nSystem.out.println(list);`, correct: list(l), wrong: [list(w1), list(xs.map((x, k) => (k === j ? setv : x))), list(l.map((x, k) => (k === j + 1 ? setv : k === j ? xs[j] : x)))].filter((x, k, a) => x !== list(l) && a.indexOf(x) === k).concat(list([...l].reverse()), list(xs)).slice(0, 3), explanation: `remove(${i}) deletes the element at index ${i} (shifting left), then set(${j}, ${setv}) replaces index ${j}.` }; };
const u7c: Gen = r => { const xs = Array.from({ length: 6 }, () => r.int(1, 9)), t = r.int(3, 6); const l = [...xs]; for (let i = 0; i < l.length; i++) if (l[i] < t) { l.splice(i, 1); } // buggy forward loop, like the Java code
  const correctRemoval = xs.filter(x => x >= t);
  return { prompt: 'What is printed? (Watch the index after a removal.)', code: `ArrayList<Integer> list = new ArrayList<>(List.of(${xs.join(', ')}));\nfor (int i = 0; i < list.size(); i++) {\n  if (list.get(i) < ${t}) list.remove(i);\n}\nSystem.out.println(list);`, correct: list(l), wrong: [list(correctRemoval), list(xs), list(xs.filter(x => x < t))].filter((x, k, a) => x !== list(l) && a.indexOf(x) === k).concat(list([...l, 0])).slice(0, 3), explanation: 'Removing shifts the next element into index i, and i++ then skips it, so back-to-back small values can survive.' }; };

// ---------- Unit 8: 2D Array ----------
const grid = (r: Rng, rows: number, cols: number) => Array.from({ length: rows }, () => Array.from({ length: cols }, () => r.int(0, 9)));
const g2s = (g: number[][]) => `{${g.map(row => `{${row.join(', ')}}`).join(', ')}}`;
const u8a: Gen = r => { const g = grid(r, 3, 4), i = r.int(0, 2), j = r.int(0, 3);
  return { prompt: 'What is printed?', code: `int[][] g = ${g2s(g)};\nSystem.out.println(g[${i}][${j}] + g.length + g[0].length);`, correct: String(g[i][j] + 7), wrong: [String((g[j]?.[i] ?? g[0][0]) + 7), String(g[i][j] + 12), String(g[i][j])].filter(x => x !== String(g[i][j] + 7)).concat(String(g[i][j] + 8)).slice(0, 3), explanation: `g[${i}][${j}] is ${g[i][j]} (row ${i}, column ${j}); 3 rows and 4 columns add 7.` }; };
const u8b: Gen = r => { const g = grid(r, 3, 3), c = r.int(0, 2), s = g.reduce((t, row) => t + row[c], 0), rs = g[c].reduce((a, b) => a + b, 0);
  return { prompt: 'What is printed?', code: `int[][] g = ${g2s(g)};\nint sum = 0;\nfor (int r = 0; r < g.length; r++) {\n  sum += g[r][${c}];\n}\nSystem.out.println(sum);`, correct: String(s), wrong: [String(rs), String(s + g[0][0]), String(g.flat().reduce((a, b) => a + b, 0))].filter((x, k, a) => x !== String(s) && a.indexOf(x) === k).concat(String(s + 1), String(s - 1)).slice(0, 3), explanation: `Sums column ${c}: ${g.map(row => row[c]).join(' + ')} = ${s}.` }; };
const u8c: Gen = r => { const g = grid(r, 3, 3); let s = 0; for (let i = 0; i < 3; i++) s += g[i][i] + g[i][2 - i]; s -= g[1][1]; const both = s + g[1][1];
  return { prompt: 'What is printed? (sum of both diagonals, center counted once)', code: `int[][] g = ${g2s(g)};\nint sum = 0;\nfor (int i = 0; i < g.length; i++) {\n  sum += g[i][i] + g[i][g.length - 1 - i];\n}\nsum -= g[1][1];\nSystem.out.println(sum);`, correct: String(s), wrong: [String(both), String(g[0][0] + g[1][1] + g[2][2]), String(s + 1)].filter((x, k, a) => x !== String(s) && a.indexOf(x) === k).concat(String(s - 1), String(s + 2)).slice(0, 3), explanation: `Main diagonal ${g[0][0]}+${g[1][1]}+${g[2][2]}, other diagonal ${g[0][2]}+${g[1][1]}+${g[2][0]}, minus the center once = ${s}.` }; };

// ---------- Unit 9: Inheritance ----------
const ANIMALS: [string, string, string, string][] = [['Animal', 'Dog', '"..."', '"Woof"'], ['Vehicle', 'Car', '"Moving"', '"Driving"'], ['Shape', 'Circle', '"Shape"', '"Circle"'], ['Employee', 'Manager', '"Working"', '"Managing"']];
const u9a: Gen = r => { const [P, C, ps, cs] = r.pick(ANIMALS), m = r.pick(['speak', 'describe', 'act']);
  return { prompt: 'What is printed?', code: `class ${P} {\n  public String ${m}() { return ${ps}; }\n}\nclass ${C} extends ${P} {\n  public String ${m}() { return ${cs}; }\n}\n\n${P} x = new ${C}();\nSystem.out.println(x.${m}());`, correct: cs.replace(/"/g, ''), wrong: [ps.replace(/"/g, ''), 'compile error', `${ps.replace(/"/g, '')}${cs.replace(/"/g, '')}`], explanation: `The object is really a ${C}, so the overridden ${m}() runs (polymorphism / dynamic dispatch).` }; };
const U9_CONCEPT: [string, string, string[], string][] = [
  ['What does super(...) do in a subclass constructor?', 'Calls the superclass constructor', ['Calls the subclass constructor again', 'Creates a new superclass object', 'Overrides a method'], 'super(...) must be the first line and runs the parent constructor.'],
  ['If class B extends A, which statement compiles?', 'A obj = new B();', ['B obj = new A();', 'B obj = (A) new A();', 'A obj = B;'], 'A subclass object can be stored in a superclass reference.'],
  ['Every Java class ultimately extends which class?', 'Object', ['Main', 'Class', 'String'], 'All classes inherit from java.lang.Object.'],
  ['Overriding a method means…', 'a subclass defines a method with the same signature', ['two methods share a name but differ in parameters', 'a method calls itself', 'a method is marked static'], 'Same signature in the subclass = override; different parameters = overload.'],
  ['A subclass can directly access a private instance variable of its superclass.', 'False', ['True', 'Only in the constructor', 'Only if it is static'], 'private members are not accessible in subclasses; use public getters or protected.'],
];
const u9b: Gen = r => { const [q, a, w, e] = r.pick(U9_CONCEPT); return { prompt: q, correct: a, wrong: w, explanation: e }; };
const u9c: Gen = r => { const a = r.int(1, 9), b = r.int(1, 9), v = a + b * 2;
  return { prompt: 'What is printed?', code: `class A {\n  public int value() { return ${a}; }\n  public int total() { return value() * 2; }\n}\nclass B extends A {\n  public int value() { return ${b}; }\n  public int total() { return super.total() + ${a}; }\n}\n\nA x = new B();\nSystem.out.println(x.total());`, correct: String(v), wrong: [String(a * 2 + a), String(b * 2), String(a * 2 + b)].filter((x, k, arr2) => x !== String(v) && arr2.indexOf(x) === k).concat(String(v + 1), String(v - 1)).slice(0, 3), explanation: `B.total() calls A.total(), whose value() call dispatches to B.value() = ${b}: ${b} × 2 + ${a} = ${v}.` }; };

// ---------- Unit 10: Recursion ----------
const u10a: Gen = r => { const n = r.int(3, 7), f = (k: number): number => (k <= 1 ? 1 : k * f(k - 1)), v = f(n);
  return { prompt: 'What does mystery(' + n + ') return?', code: `public static int mystery(int n) {\n  if (n <= 1) return 1;\n  return n * mystery(n - 1);\n}`, correct: String(v), wrong: [String(f(n - 1)), String(n * (n + 1) / 2), String(f(n + 1))], explanation: `This is factorial: ${n}! = ${v}.` }; };
const u10b: Gen = r => { const n = r.int(3, 9), k = r.int(1, 4), f = (m: number): number => (m == 0 ? 0 : k + f(m - 1)), v = f(n);
  return { prompt: `What does f(${n}) return?`, code: `public static int f(int n) {\n  if (n == 0) return 0;\n  return ${k} + f(n - 1);\n}`, correct: String(v), wrong: [String(k * (n - 1)), String(k + n), String(v + k)], explanation: `Adds ${k} once for each call from ${n} down to 1: ${k} × ${n} = ${v}.` }; };
const u10c: Gen = r => { const w = r.pick(WORDS).slice(0, r.int(4, 6)), rev = (s: string): string => (s.length <= 1 ? s : rev(s.substring(1)) + s.substring(0, 1)), v = rev(w);
  const n = r.int(5, 9), fib = (m: number): number => (m <= 1 ? m : fib(m - 1) + fib(m - 2));
  return r.next() < 0.5
    ? { prompt: `What does rev("${w}") return?`, code: `public static String rev(String s) {\n  if (s.length() <= 1) return s;\n  return rev(s.substring(1)) + s.substring(0, 1);\n}`, correct: v, wrong: [w, w.substring(1) + w[0], v.substring(1) + v[0]].filter((x, k, a) => x !== v && a.indexOf(x) === k).concat(v.toUpperCase()).slice(0, 3), explanation: `It moves the first letter to the end of the reversed rest: "${v}".` }
    : { prompt: `What does fib(${n}) return?`, code: `public static int fib(int n) {\n  if (n <= 1) return n;\n  return fib(n - 1) + fib(n - 2);\n}`, correct: String(fib(n)), wrong: [String(fib(n - 1)), String(fib(n + 1)), String(fib(n) + 1)], explanation: `Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34 … fib(${n}) = ${fib(n)}.` }; };

export const CSA_UNITS: import('./ladder').Unit[] = [
  { title: 'Primitive Types', topics: 'variables, int/double, arithmetic, casting', levels: [[u1a], [u1a, u1b], [u1b, u1c]] , lessons: [] },
  { title: 'Using Objects', topics: 'String methods, Math class', levels: [[u2a, u2b], [u2b, u2c], [u2c, u1c]] , lessons: [] },
  { title: 'Boolean Expressions & if', topics: 'relational/logical operators, if/else-if, short-circuit', levels: [[u3a], [u3a, u3b], [u3b, u3c]] , lessons: [] },
  { title: 'Iteration', topics: 'for, while, nested loops, String traversal', levels: [[u4a], [u4a, u4b], [u4b, u4c]] , lessons: [] },
  { title: 'Writing Classes', topics: 'constructors, accessors/mutators, encapsulation, static', levels: [[u5b], [u5a, u5b], [u5a, u5c]] , lessons: [] },
  { title: 'Array', topics: 'indexing, traversal, enhanced for, algorithms', levels: [[u6a], [u6a, u6b], [u6b, u6c]] , lessons: [] },
  { title: 'ArrayList', topics: 'add, remove, set, traversing while removing', levels: [[u7a], [u7a, u7b], [u7b, u7c]] , lessons: [] },
  { title: '2D Array', topics: 'row-major traversal, rows/columns, diagonals', levels: [[u8a], [u8a, u8b], [u8b, u8c]] , lessons: [] },
  { title: 'Inheritance', topics: 'extends, super, overriding, polymorphism', levels: [[u9b], [u9a, u9b], [u9a, u9c]] , lessons: [] },
  { title: 'Recursion', topics: 'base case, tracing recursive calls', levels: [[u10a, u10b], [u10a, u10b, u10c], [u10c, u10a]] , lessons: [] },
];

/** Every AP CSA generator by name, for lessons (gen: csa.u1a). */
export const CSA_GENS = { u1a, u1b, u1c, u2a, u2b, u2c, u3a, u3b, u3c, u4a, u4b, u4c, u5a, u5b, u5c, u6a, u6b, u6c, u7a, u7b, u7c, u8a, u8b, u8c, u9a, u9b, u9c, u10a, u10b, u10c };
