// Starter policies. Have a lawyer or your school's counsel review before launch.
export function Terms() {
  return (
    <section className="focus legal">
      <h2>Terms of Use</h2>
      <p className="muted">Draft. Last updated November 2026.</p>
      <p><b>Who can use Lumino.</b> You must be at least 13. If you're under 18, a parent or guardian must agree to these terms and must be the one to buy a subscription.</p>
      <p><b>Be kind and honest.</b> No harassment, bullying, threats, hateful or sexual content, sharing other people's private information, or using Lumino to cheat on graded work or live tests. We may remove content and suspend or ban accounts that break these rules.</p>
      <p><b>Your content.</b> You own what you upload (tests, photos, messages). You give Lumino permission to store and show it to the people you share it with. Only upload material you have the right to share.</p>
      <p><b>Subscriptions.</b> Plus is $1.99/month and Pro is $3.99/month, billed monthly by Stripe until canceled. Cancel anytime in Account → Manage subscription; you keep access until the end of the paid period. Prices may change with 30 days' notice.</p>
      <p><b>AI assistants.</b> AI answers can be wrong. Use them to learn and check important information. Daily message limits apply.</p>
      <p><b>No guarantees.</b> Lumino is provided as is. We're not responsible for test scores or grades.</p>
    </section>
  );
}
export function Privacy() {
  return (
    <section className="focus legal">
      <h2>Privacy Policy</h2>
      <p className="muted">Draft. Last updated November 2026.</p>
      <p><b>What we collect.</b> Email, username, role, school level, birth year (to confirm you're 13+), your study activity (XP, streaks, scores), and what you post (messages, tests, photos).</p>
      <p><b>What we don't do.</b> We don't sell your data or show ads. Calls are never recorded. Payments are handled by Stripe; we never see your card number.</p>
      <p><b>Who sees what.</b> Group content (chat, photo quizzes, scores) is visible only to members of that group. Moderators can see reported messages.</p>
      <p><b>Auto-delete.</b> Group chat messages are deleted automatically after 1, 7, or 30 days (the group owner chooses). Reported messages are kept for review.</p>
      <p><b>AI.</b> Messages you send to AI assistants are processed by Anthropic to generate replies and are not used to train their models. Photo quizzes don't use AI.</p>
      <p><b>Services we use.</b> Supabase (accounts and database), Stripe (payments), LiveKit (calls), Anthropic (AI assistants), GitHub Pages (hosting).</p>
      <p><b>Your choices.</b> Delete your account anytime in Account → Delete my account. Parents can contact us to review or delete their child's data.</p>
      <p><b>Contact.</b> [Add a contact email before launch.]</p>
    </section>
  );
}
