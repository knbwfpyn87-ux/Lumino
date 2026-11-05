import type { Test } from './store';
// Original SAT-style practice written for Lumino (not copied from College Board material).
type Q = [prompt: string, choices: string[], answer: number, explanation: string];
const mk = (id: string, title: string, qs: Q[]): Test => ({ id, title, subject: 'SAT', level: 'Standard', author: 'Lumino',
  questions: qs.map(([prompt, choices, answer, explanation], i) => ({ id: `${id}-${i}`, prompt, choices, answer, explanation })) });

export const SAT_TESTS: Test[] = [
  mk('sat-alg-1', 'SAT Math · Linear Equations', [
    ['If 3x + 7 = 22, what is x?', ['3', '5', '7', '15'], 1, '3x = 15, so x = 5.'],
    ['What is the slope of the line 4x − 2y = 10?', ['−2', '2', '4', '−5'], 1, 'y = 2x − 5, slope 2.'],
    ['A gym charges $25 to join plus $15 per month. Which gives the total cost C after m months?', ['C = 15m + 25', 'C = 25m + 15', 'C = 40m', 'C = 15(m + 25)'], 0, 'Fixed $25 plus $15 each month.'],
    ['If 2(x − 3) = x + 4, what is x?', ['1', '7', '10', '−2'], 2, '2x − 6 = x + 4 → x = 10.'],
    ['Line ℓ passes through (0, 3) and (2, 7). What is its y-intercept?', ['2', '3', '4', '7'], 1, 'It passes through (0, 3).'],
    ['Which line is parallel to y = −3x + 1?', ['y = 3x − 1', 'y = −3x + 8', 'y = (1/3)x', 'y = −(1/3)x + 1'], 1, 'Parallel lines share slope −3.'],
    ['If 5 − 2k > 11, which is true?', ['k > 3', 'k < −3', 'k > −3', 'k < 3'], 1, '−2k > 6 → k < −3 (flip sign).'],
    ['The system x + y = 10 and x − y = 4 has solution (x, y) =', ['(7, 3)', '(3, 7)', '(6, 4)', '(5, 5)'], 0, 'Add: 2x = 14, x = 7, y = 3.'],
  ]),
  mk('sat-alg-2', 'SAT Math · Systems & Inequalities', [
    ['How many solutions does the system y = 2x + 1 and y = 2x − 4 have?', ['0', '1', '2', 'Infinitely many'], 0, 'Same slope, different intercepts: parallel.'],
    ['If 3x + 2y = 12 and x = 2, what is y?', ['2', '3', '4', '6'], 1, '6 + 2y = 12 → y = 3.'],
    ['Tickets cost $8 for adults and $5 for kids. 20 tickets sold for $130. How many adult tickets?', ['5', '10', '12', '15'], 1, 'a + k = 20, 8a + 5k = 130 → 3a = 30, a = 10.'],
    ['Which point satisfies y ≤ x − 2?', ['(0, 0)', '(1, 0)', '(4, 1)', '(2, 3)'], 2, '1 ≤ 4 − 2 = 2 ✓.'],
    ['For what value of k does kx + 6y = 12 have no solution with 2x + 3y = 5?', ['2', '4', '6', '12'], 1, 'Parallel requires k/2 = 6/3 → k = 4, and 12 ≠ 10.'],
    ['If x + 2y = 7 and 3x + 6y = c has infinitely many solutions, c =', ['7', '14', '21', '28'], 2, 'Second equation is 3× the first.'],
  ]),
  mk('sat-adv-1', 'SAT Math · Advanced Math', [
    ['What are the solutions of x² − 5x + 6 = 0?', ['2 and 3', '−2 and −3', '1 and 6', '−1 and 6'], 0, '(x − 2)(x − 3) = 0.'],
    ['If f(x) = 2x² − 3, what is f(−2)?', ['−11', '5', '11', '−5'], 1, '2(4) − 3 = 5.'],
    ['Which is equivalent to (x + 4)²?', ['x² + 16', 'x² + 8x + 16', 'x² + 4x + 16', '2x + 8'], 1, 'x² + 2·4x + 16.'],
    ['What is the vertex of y = (x − 3)² + 2?', ['(3, 2)', '(−3, 2)', '(3, −2)', '(2, 3)'], 0, 'Vertex form (h, k).'],
    ['If 2ˣ = 32, what is x?', ['4', '5', '6', '16'], 1, '2⁵ = 32.'],
    ['A population of 500 doubles every 3 years. Which models it after t years?', ['500(2)^(t/3)', '500(3)^(t/2)', '500 + 2t', '500(2t)'], 0, 'One doubling per 3 years.'],
    ['Which is equivalent to (x² − 9)/(x − 3) for x ≠ 3?', ['x − 3', 'x + 3', 'x² − 3', 'x + 9'], 1, 'Difference of squares.'],
    ['How many real solutions does x² + 4x + 5 = 0 have?', ['0', '1', '2', 'Infinitely many'], 0, 'Discriminant 16 − 20 < 0.'],
  ]),
  mk('sat-data-1', 'SAT Math · Problem Solving & Data', [
    ['A shirt is $40 after a 20% discount. What was the original price?', ['$48', '$50', '$52', '$60'], 1, '0.8p = 40 → p = 50.'],
    ['The mean of 4, 8, 10, and x is 8. What is x?', ['8', '9', '10', '12'], 2, 'Sum must be 32 → x = 10.'],
    ['A car travels 150 miles in 2.5 hours. Average speed?', ['50 mph', '55 mph', '60 mph', '65 mph'], 2, '150 / 2.5 = 60.'],
    ['What is the median of 3, 9, 4, 7, 12?', ['4', '7', '7.5', '9'], 1, 'Sorted: 3, 4, 7, 9, 12.'],
    ['A recipe uses 3 cups flour for 12 cookies. How much for 30 cookies?', ['6', '7.5', '8', '10'], 1, '3/12 × 30 = 7.5.'],
    ['A random sample of 200 students found 60 bike to school. Estimate for 1,500 students?', ['300', '450', '600', '900'], 1, '30% of 1,500.'],
    ['Price rises from $80 to $100. Percent increase?', ['20%', '25%', '80%', '125%'], 1, '20 / 80 = 25%.'],
  ]),
  mk('sat-geo-1', 'SAT Math · Geometry & Trig', [
    ['A right triangle has legs 6 and 8. Hypotenuse?', ['10', '12', '14', '48'], 0, '√(36 + 64) = 10.'],
    ['Area of a circle with radius 5?', ['10π', '25π', '5π', '100π'], 1, 'πr².'],
    ['In a right triangle, sin A = 3/5. What is cos A?', ['3/4', '4/5', '5/3', '4/3'], 1, '3-4-5 triangle.'],
    ['Two angles of a triangle are 50° and 60°. The third angle is', ['60°', '70°', '80°', '90°'], 1, '180 − 110.'],
    ['Volume of a cube with edge 4?', ['16', '48', '64', '96'], 2, '4³.'],
    ['A circle has equation (x − 2)² + (y + 1)² = 9. Its radius is', ['3', '9', '2', '81'], 0, 'r² = 9.'],
    ['How many degrees are in π/3 radians?', ['30°', '45°', '60°', '90°'], 2, 'π = 180°.'],
  ]),
  mk('sat-rw-1', 'SAT Reading & Writing · Words in Context', [
    ['The scientist was ____ about the results, refusing to draw conclusions until more data arrived. Which word fits best?', ['cautious', 'reckless', 'jubilant', 'indifferent'], 0, '"Refusing to draw conclusions" signals caution.'],
    ['Though the novel was long, its ____ prose kept readers engaged. Which word fits best?', ['tedious', 'lively', 'obscure', 'redundant'], 1, '"Though… long" sets up a positive contrast.'],
    ['The mayor\'s plan was ____: it addressed traffic, pollution, and housing at once. Which word fits best?', ['narrow', 'comprehensive', 'vague', 'temporary'], 1, 'Covering many issues = comprehensive.'],
    ['In "The committee will table the proposal until next month," table most nearly means', ['present', 'postpone', 'reject', 'approve'], 1, '"Until next month" signals delay.'],
    ['Critics found the film ____; its plot twists were obvious from the first scene. Which word fits best?', ['predictable', 'innovative', 'baffling', 'profound'], 0, 'Obvious twists = predictable.'],
    ['The once-bustling town became ____ after the factory closed. Which word fits best?', ['crowded', 'desolate', 'prosperous', 'festive'], 1, 'Contrast with "bustling."'],
  ]),
  mk('sat-rw-2', 'SAT Reading & Writing · Grammar & Transitions', [
    ['Choose the correct option: "Each of the students ____ a project."', ['have', 'has', 'are having', 'were having'], 1, '"Each" is singular.'],
    ['Choose the correct punctuation: "She packed three things ____ a map, a flashlight, and water."', [',', ';', ':', '—and'], 2, 'A colon introduces a list after a full clause.'],
    ['Rainfall was low this year. ____, crop yields fell. Best transition?', ['However', 'As a result', 'For example', 'In contrast'], 1, 'Cause → effect.'],
    ['The museum is popular with tourists. ____, many locals have never visited. Best transition?', ['Therefore', 'Similarly', 'However', 'Thus'], 2, 'Contrast.'],
    ['Choose the correct option: "The team celebrated ____ victory."', ['it\'s', 'its', 'their\'s', 'its\''], 1, 'Possessive "its" has no apostrophe.'],
    ['Which avoids a comma splice?', ['I was tired, I went to bed.', 'I was tired; I went to bed.', 'I was tired I went to bed.', 'I was tired, and, I went to bed.'], 1, 'A semicolon joins two independent clauses.'],
    ['Choose the correct option: "Neither the coach nor the players ____ ready."', ['was', 'is', 'were', 'be'], 2, 'Verb agrees with the nearer subject, "players."'],
  ]),
];
