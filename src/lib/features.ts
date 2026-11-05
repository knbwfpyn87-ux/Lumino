// Feature switches. AI features stay hidden until launch: set VITE_ENABLE_AI=true (GitHub secret or .env) to turn them on.
export const AI_ENABLED = import.meta.env.VITE_ENABLE_AI === 'true';
