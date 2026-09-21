# Visitor feedback

A small invitation appears after two minutes of active browsing plus either four section headings viewed for at least three seconds each, or two case studies explored for at least 20 seconds each. Exploration carries across routes and refreshes in the same tab. It pauses in background tabs, during the intro or a dialog, and after 45 seconds without interaction. A 30-minute break starts a new visit.

The invitation waits for a pause in scrolling and interaction, avoids text entry and audio playback, and never takes focus. It appears once per visit. Dismissing it suppresses future invitations for seven days; submitting a note suppresses them for 30 days on that browser. The footer's **Leave feedback** button stays available throughout. The form opens only by choice, supports Escape and keyboard navigation, and preserves the draft after a failed submission.

Notes are private. Stored fields are the message, an optional name or nickname, page path and submission time, keyed by a hash of a random visit ID. The “Who’s this note from? (optional)” field is limited to 80 characters; blank names are omitted. No email, IP address or browsing history is collected by this feature. The form is masked from Clarity recordings. The API accepts writes only: it does not expose a feedback inbox. Requests are bounded, checked for same origin and validated, with a hidden bot field and atomic deduplication of one note per visit. Visits are identified by session, not an authenticated account.

## Storage and reading notes

The existing free Upstash database connected to Vercel `portfolio2` supplies `KV_REST_API_URL` and `KV_REST_API_TOKEN`. No additional database, dependency or subscription is needed. After deployment, feedback is saved in the Redis hash **`portfolio:feedback:notes`**. Open that key in the Upstash Data Browser to read the notes. There are no automatic emails.

For local development, Node 22.13+ stores notes in the git-ignored `.data/feedback.sqlite`, separate from live feedback. Run **`npm run feedback:read`** to read notes as JSON, newest first. The command reads live Redis instead when its server-only credentials are present in the environment or `.env.local`. Never put these credentials in public variables or expose the reader as an unauthenticated web route.

Production refuses ephemeral local storage if Redis is missing. A self-hosted persistent disk can be selected explicitly with `FEEDBACK_DB_PATH`. No demo notes are inserted. The feature is local until this code is deployed.

Run `npm run feedback:test` for isolated checks of the exploration thresholds, API validation, deduplication, persistence and Redis adapter. These checks do not write to the local or live feedback inbox.
