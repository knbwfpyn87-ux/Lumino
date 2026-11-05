// Feature switches, shared by the website and the iPhone app.
// AI stays hidden until launch. Turn it on with VITE_ENABLE_AI=true (website; vite.config.ts maps it)
// or EXPO_PUBLIC_ENABLE_AI=true (iPhone app; Expo inlines EXPO_PUBLIC_* values at build time).
declare const process: { env: Record<string, string | undefined> };
export const AI_ENABLED = process.env.EXPO_PUBLIC_ENABLE_AI === 'true';
