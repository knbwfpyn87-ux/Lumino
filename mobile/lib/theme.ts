import { useColorScheme } from 'react-native';
export const light = { bg: '#f5f8fd', card: '#ffffff', text: '#1c1f2e', muted: '#6b7090', line: '#e6e8f2', accent: '#1e90d6', accentSoft: '#e3f4ff', onAccent: '#ffffff', yellow: '#ffd233', ok: '#12a671', bad: '#e0475e', code: '#0f1222' };
export const dark = { bg: '#0f111a', card: '#1b1e2b', text: '#ffffff', muted: '#d5d8e6', line: '#2c3042', accent: '#ffd233', accentSoft: '#3a3420', onAccent: '#14161f', yellow: '#ffd233', ok: '#22c38e', bad: '#ff6b81', code: '#0b0d16' };
export type Theme = typeof light;
export function useTheme(): Theme { return useColorScheme() === 'dark' ? dark : light; }
