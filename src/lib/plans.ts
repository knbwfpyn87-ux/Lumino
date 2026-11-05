// Plans and what each one unlocks. Prices are set in Stripe; these labels are for display.
export type Plan = 'free' | 'plus' | 'pro';
export type Tier = Plan;
export const PLAN_RANK: Record<Plan, number> = { free: 0, plus: 1, pro: 2 };
export const canAccess = (plan: Plan, tier: Tier = 'free') => PLAN_RANK[plan] >= PLAN_RANK[tier];

import { AI_ENABLED } from './features';
const PLAN_INFO_ALL: Record<Plan, { name: string; price: string; tagline: string; features: string[] }> = {
  free: { name: 'Basic', price: 'Free', tagline: 'Get started', features: ['100+ practice questions', 'First 2 units of every class', 'Flashcards & study groups', 'Group chat, calls & photo quizzes', 'Community-uploaded tests', 'XP, levels & streaks'] },
  plus: { name: 'Premium', price: '$1.99/mo', tagline: 'Most students', features: ['Everything in Basic', '500+ practice questions', 'Most class units', 'Most SAT practice', '1 AI assistant (Study Buddy)', '30 AI messages a day'] },
  pro: { name: 'Premium+', price: '$3.99/mo', tagline: 'Everything', features: ['Everything in Premium', '1,000+ practice questions', 'All class units', 'All SAT practice', '4 AI assistants (Study Buddy, SAT Coach, Essay Coach, Science Lab)', 'AI-powered test uploads (photo or PDF → quiz)', '150 AI messages a day'] },
};

// Until launch, AI lines are left off the plans
export const PLAN_INFO = Object.fromEntries(Object.entries(PLAN_INFO_ALL).map(([k, v]) => [k, { ...v, features: v.features.filter(f => AI_ENABLED || !/\bAI\b/.test(f)) }])) as typeof PLAN_INFO_ALL;

export const ASSISTANTS: { id: string; name: string; emoji: string; blurb: string; tier: Tier }[] = [
  { id: 'study-buddy', name: 'Study Buddy', emoji: '🤓', blurb: 'Any subject, step by step', tier: 'plus' },
  { id: 'sat-coach', name: 'SAT Coach', emoji: '🎯', blurb: 'SAT strategy & practice', tier: 'pro' },
  { id: 'essay-coach', name: 'Essay Coach', emoji: '✍️', blurb: 'Brainstorm, outline, revise', tier: 'pro' },
  { id: 'science-lab', name: 'Science Lab', emoji: '🧪', blurb: 'Bio, chem & physics', tier: 'pro' },
];

// Which built-in tests need which plan. Anything not listed (and all community uploads) is free.
export const TEST_TIERS: Record<string, Tier> = {
  'b-bio': 'plus', 'b-apush': 'pro',
  'sat-alg-2': 'plus', 'sat-adv-1': 'plus', 'sat-data-1': 'plus', 'sat-rw-1': 'plus',
  'sat-geo-1': 'pro', 'sat-rw-2': 'pro',
};
export const tierOf = (t: { id: string; tier?: Tier }): Tier => t.tier ?? TEST_TIERS[t.id] ?? 'free';
