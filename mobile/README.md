# Lumino for iPhone

Native iPhone app (Expo / React Native) for Lumino. Same accounts, classes, question bank, groups and plans as the website. The question bank and class units are imported straight from `../src/lib`, so both apps stay in sync.

## Run it on your iPhone
1. Install **Expo Go** from the App Store.
2. On a computer:
   ```bash
   cd mobile
   npm install
   npx expo start
   ```
3. Scan the QR code with the iPhone camera.

Without keys the app runs in **demo mode** (everything unlocked, sample group chat). To connect it, create `mobile/.env`:
```
EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_SITE_URL=https://<you>.github.io/<repo>/
```

## Ship to the App Store
Needs an Apple Developer account ($99/year).
```bash
npm i -g eas-cli
eas login
eas build --platform ios
eas submit --platform ios
```
Before submitting: replace the icon/splash in `assets/images`, set the support email in `app/(tabs)/me.tsx`, and fill out App Store privacy labels (email, username, usage data; no tracking).

### Subscriptions and Apple's rules
The app does **not** sell subscriptions; it shows your plan and links to the website. Apple normally requires in-app purchase for digital subscriptions sold inside iOS apps. Since 2025, US App Store apps may link out to a web checkout; outside the US the rules differ. Check the current App Store Review Guidelines (3.1.1 / 3.1.3) before launch, or add in-app purchases (e.g. with RevenueCat) if you sell in-app.

## What's in it
- **Today:** daily XP mission, 🔥 streak, 60-second sprint, "Continue" to your next class level, week tracker.
- **Classes:** all 7 classes; each class is a unit path with 3 levels per unit (pass 70% to unlock). AP CS A uses Java code questions.
- **Quiz:** one question per screen, instant right/wrong with haptics and explanations, combo streaks.
- **Practice:** swipe flashcards (right = got it, left = again), sprints, every practice test with plan locks.
- **Friends:** study groups, live chat, invite via the share sheet, long-press to report or block.
- **Lumino AI:** tutor chat (Premium+ gets all 4 assistants).
- **Me:** level, goal, plan, terms/privacy, sign out, delete account.

Not in the phone app yet: calls, photo quizzes and AI uploads (use the website for now).
