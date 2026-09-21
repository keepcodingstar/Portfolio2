# Fragrance likes

Each browser-tab visit can like each scent once. Refreshing or navigating within the portfolio preserves the visit. Closing the tab or returning after 30 minutes without interaction starts a new one. No account, email or IP address is collected.

All totals stay hidden until the visitor successfully likes a scent. The server then returns the cumulative totals for all eight, alongside that visit’s selections. Only positive counts are displayed; scents with zero likes show just the heart. Likes cannot be undone. Counts refresh when the page opens, when a like is saved, and when the visitor returns to the page. There is no continuous polling.

## Local development

Node 22.13 or later is required for the built-in SQLite development store. `npm run dev` creates `.data/fragrance-likes.sqlite`, which persists through restarts and is ignored by Git. Local totals are shared by browsers using the same dev server. They are independent of live totals.

## Live shared totals

The free Upstash database `upstash-kv-claret-curtain` is connected to Vercel project `portfolio2` in `keepcodingstar-7320s-projects` for Preview and Production. Vercel supplies `KV_REST_API_URL` and `KV_REST_API_TOKEN`. The server also accepts `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` for other installations. Credentials and the `@upstash/redis` SDK remain server-side. The site must be deployed with this code before the live feature is available.

The Redis Lua operation atomically records a visit’s vote and increments the total only on its first vote for that scent. Session vote sets expire after 24 hours without requests; cumulative totals do not expire. No seed or demonstration likes are inserted.

Without a database connection, production returns an unavailable response instead of storing misleading totals on ephemeral serverless disks. A self-hosted Node server with a persistent disk may explicitly set `FRAGRANCE_LIKES_DB_PATH` to use SQLite.

Session IDs are random and only their SHA-256 hash is stored server-side. This is anonymous, per-session deduplication, not authenticated person-level voting: a visitor can begin another session, as intended.
