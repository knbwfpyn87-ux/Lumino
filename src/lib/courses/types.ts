import type { Block, Check } from './dsl';
export type { Block, Check };
/** Practice data for one lesson (loads with the app). */
export type CurriculumLesson = { title: string; gens: string[]; terms: [string, string][]; checks: Check[]; lab?: 'lab' | 'demo' };
export type CurriculumUnit = { title: string; summary: string; lessons: CurriculumLesson[] };
export type CurriculumCourse = { id: string; name: string; level: string; emoji: string; category: string; subject: string; units: CurriculumUnit[] };
/** Teaching text for one lesson (loads when the lesson is opened). */
export type LessonText = { say: string; blocks: Block[] };
