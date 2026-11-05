# Lumino — information for school IT (GHS)

Lumino is a study app for high school and college students: class units, SAT/AP practice, flashcards, study groups, and optional AI study assistants.

## Domains to allow
| Purpose | Domain |
|---|---|
| The app | `<your-github-username>.github.io` (or your custom domain) |
| Accounts & database | `<project-ref>.supabase.co` (HTTPS + WSS for live chat) |
| Voice/video calls | `*.livekit.cloud` (HTTPS, WSS, and UDP/TCP media; TURN on 443) |
| Payments (parents) | `checkout.stripe.com`, `billing.stripe.com`, `js.stripe.com` |
| Fonts | `fonts.googleapis.com`, `fonts.gstatic.com` |

AI requests go from Lumino's servers to Anthropic, not from student devices. No extra domain is needed for students.

## Safety & privacy summary
- Students must be 13+; under-18 subscriptions are bought by a parent/guardian.
- Group content is visible only to group members. Chat auto-deletes after 1/7/30 days.
- Report and block on every message; moderators can ban accounts. Reported messages are kept for review.
- Calls are encrypted in transit and never recorded.
- No ads and no selling of student data.
- AI assistants are tutors: told to teach step by step and not to hand over answers for graded work.

Contact: [add an email]
