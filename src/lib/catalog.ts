import type { Test } from './store';

// Course catalog: standard levels + AP. Built-in tests are seeds; add more under /content later.
export const LEVELS = ['Standard', 'Honors', 'AP'] as const;
export const SUBJECTS = [
  'Algebra I', 'Geometry', 'Algebra II', 'Precalculus', 'Biology', 'Chemistry', 'Physics', 'English', 'World History', 'US History',
  'AP Calculus AB', 'AP Calculus BC', 'AP Statistics', 'AP Biology', 'AP Chemistry', 'AP Physics 1', 'AP Physics 2', 'AP Physics C',
  'AP Environmental Science', 'AP Computer Science A', 'AP Computer Science Principles', 'AP English Language', 'AP English Literature',
  'AP US History', 'AP World History', 'AP European History', 'AP US Government', 'AP Comparative Government', 'AP Human Geography',
  'AP Psychology', 'AP Macroeconomics', 'AP Microeconomics', 'AP Spanish Language', 'AP French Language', 'AP Art History', 'AP Music Theory',
  'SAT', 'ACT', 'PSAT',
];

export const BUILTIN_TESTS: Test[] = [
  { id: 'b-calc', title: 'Limits & Derivatives Warm-up', subject: 'AP Calculus AB', level: 'AP', author: 'Lumino', questions: [
    { id: 'q1', prompt: 'd/dx of x³ is', choices: ['3x²', 'x²', '3x', 'x³/3'], answer: 0 },
    { id: 'q2', prompt: 'lim x→0 of sin(x)/x', choices: ['0', '1', '∞', 'undefined'], answer: 1 },
    { id: 'q3', prompt: 'd/dx of eˣ is', choices: ['xeˣ⁻¹', 'eˣ', 'ln x', '1'], answer: 1 },
  ]},
  { id: 'b-bio', title: 'Cell Biology Basics', subject: 'Biology', level: 'Standard', author: 'Lumino', questions: [
    { id: 'q1', prompt: 'Powerhouse of the cell', choices: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi'], answer: 2 },
    { id: 'q2', prompt: 'Site of protein synthesis', choices: ['Ribosome', 'Lysosome', 'Vacuole', 'Cell wall'], answer: 0 },
  ]},
  { id: 'b-apush', title: 'Founding Era', subject: 'AP US History', level: 'AP', author: 'Lumino', questions: [
    { id: 'q1', prompt: 'Year the Constitution was signed', choices: ['1776', '1781', '1787', '1791'], answer: 2 },
    { id: 'q2', prompt: 'Author of Federalist No. 10', choices: ['Hamilton', 'Madison', 'Jay', 'Jefferson'], answer: 1 },
  ]},
];
