# Treasure Expedition

A treasure-map puzzle adventure for middle and high-school explorers. Built with Next.js, React, Neon Postgres, and Neon Auth (managed Better Auth).

## Features

- 60 themed checkpoints across six regions with locked → available → attempted → completed states.
- Neon email/password signup and login, plus unique public explorer nicknames.
- Server-checked answers, persistent progress, and first-solve rewards.
- Public top 10 leaderboard for each checkpoint, joined to the users table; emails remain private.
- 24 illustrated artifacts across Common, Uncommon, Rare, Epic, and Legendary rarities; both solved checkpoints and 400-coin packs grant weighted random draws. Duplicates are tradable.
- Atomic trade escrow, acceptance, cancellation, coin spending, and reward grants in Postgres functions.
- Scrollable illustrated island with checkpoint detail pop-ups, region shortcuts, keyboard-accessible dialogs, and free hints.
- Six extreme interactive finales: a riddle reliquary, magic square, cipher rotors, ordered bridge plates, rotated star chart, and a three-part vault.

## Local development

Use Node.js 22.18+ or 24 and npm.

```sh
npm ci
cp .env.example .env.local
# Fill the three values using your own Neon project. Never commit .env.local.
npm run db:migrate
npm run dev
```

Open http://localhost:3001. Neon Auth must be enabled before applying the schema, because explorer profiles reference `neon_auth.user(id)`. The existing local `.env.local` is configured for the new project and ignored by Git.

Required server-only environment variables:

| Variable                | Purpose                                 |
| ----------------------- | --------------------------------------- |
| DATABASE_URL            | Neon Postgres connection string         |
| NEON_AUTH_BASE_URL      | Managed Neon Auth service URL           |
| NEON_AUTH_COOKIE_SECRET | Random secret of at least 32 characters |

## Project resources

- Neon project: `rough-block-45164768` (Treasure Expedition), AWS us-west-2.
- Neon branch: `br-lingering-recipe-arbw9ak9` (main).
- Vercel project: `prj_Kr7JkPjZapw8s3LxgPbdQylQwlEP` (`treasure-expedition`).
- Vercel team: `leejoyce21-7656`.

## GitHub and Vercel

The folder is its own Git repository. The private GitHub repository is [joyceful-lee/treasure-expedition](https://github.com/joyceful-lee/treasure-expedition). Connect it to the existing Vercel project. Do not create a second Vercel project.

```sh
git push -u origin main
```

Set the three server-only environment variables on the Vercel project. Keep production and preview databases separate once people use the site: create a Neon preview branch, enable its Auth service, and use its connection/Auth URL and a separate cookie secret for previews. Add the exact deployment origin to Neon Auth trusted domains. Localhost port 3001 has already been added.

For CLI use, install the Vercel CLI, run `vercel login`, then verify the existing `.vercel/project.json` targets the project above. `vercel project inspect` should report `treasure-expedition` before any deployment. Publish with `vercel --prod` after environment setup. The existing project retains Vercel's default deployment protection; public access may need to be configured by the owner.

## Validation

```sh
npm test
npm run typecheck
npm run build
```

`db/verify.sql` runs database integration checks in an intentionally rolled-back subtransaction: sequential unlocks, wrong attempts, score penalties, rewards only once, pack coin debit, trade escrow, acceptance, double-accept prevention, and cancellation refunds. It leaves no test data.

`db/route-v2.sql` adds a separate 60-checkpoint ledger and copies the original six records to 1, 11, 21, 31, 41, and 51, preserving their attempts, timestamps, and scores. Existing coins and treasures stay intact. Every earlier checkpoint must be complete before a new attempt is allowed. Run the migration before deployment and repeat its idempotent copy after rollout. `db/verify-route.sql` checks the entire route, preserved progress gaps, finale rewards, and duplicate protection with rolled-back fixtures.

The scoring rule is `max(100, region × 250 + (position − 1) × 25 + finale bonus − wrong attempts × 25)`, where regions and positions are numbered 1–6 and 1–10, and the finale bonus is 1,000. Ordinary checkpoints grant 100 coins; finales grant 300. Hints have no penalty. Earlier completion breaks tied scores. Completed checkpoints cannot be farmed for more rewards. Packs cost in-game coins only, with no payment integration.

## Implementation notes

All mutations require a verified Neon session and same-origin POST. Answers are held in the server module `lib/puzzles.ts`; database functions serialize changes using row locks. The `expedition` schema is not exposed to browser database roles. Public APIs return only leaderboard nicknames/scores and active trade offers. Never put the connection string or cookie secret in `NEXT_PUBLIC_` variables.

The map is drawn locally in SVG. Fonts use Google Fonts with local serif/sans-serif fallbacks. No paid assets or image APIs are needed.

## Artifact rewards and score refresh

`db/artifacts-v3.sql` adds the weighted catalog and a new artifact ledger alongside the original inventory. The `all_inventory` and `all_trades` views combine existing and new records, so existing collections and open offers are preserved without copying or replacing player data. New trade functions can spend either ledger and settle old offers. New checkpoint completions atomically save the score, completion time, and drawn artifact ID before granting coins and inventory. Replaying a completed checkpoint never rerolls its reward.

Rarity rates are Common 60%, Uncommon 24%, Rare 12%, Epic 3%, and Legendary 1%. The 24 positive integer weights total 400. Public scores bypass caching and refresh every 15 seconds while visible, on window focus, and after the player returns from completing a checkpoint. `db/verify-artifacts.sql` exercises all 60 completions, joined leaderboard records, replay protection, pack debit, legacy and new trades, and escrow refunds with rolled-back fixtures.


## Expedition revisions

The collection groups artifacts by rarity, and trade offers list only owned, unreserved artifacts. Satchels cost 400 coins; checkpoint rewards remain 100 coins (300 at finales). A checkpoint earns three stars on attempt one, two on attempt two, and one on later successful attempts. Ratings derive from saved progress.

The leaderboard defaults to the top ten cumulative scores, with individual checkpoint boards in the selector. Checkpoint dialogs support previous/next browsing, and the map maintains its 5:3 aspect ratio.

`db/expedition-v4.sql` adds lifetime reward claims and archived reset history. An authenticated, same-origin reset request requires explicit confirmation and clears only that account's progress and leaderboard entries; inventory, coins, and trades remain. Previously claimed checkpoint rewards cannot be farmed after restarting. `db/verify-expedition-v4.sql` verifies reset isolation, archives, replay protection, scores, and pack pricing using rolled-back fixtures. Owner answer keys belong in ignored local `outputs/`, never public routes or client imports.


## Trade receipts, collection sales, and timing

`db/expedition-v5.sql` adds private unread trade notifications for the maker, server timestamps for checkpoint timing, and catalog sale prices. Accepted exchanges return an immediate receipt to the taker, while the maker sees a Trading Post badge and dismissible message. Notifications refresh while the page is visible and when it regains focus. Both current and legacy trade offers are supported.

A confirmed sale removes one available artifact and credits its rarity price atomically: Common 40, Uncommon 100, Rare 240, Epic 600, Legendary 1,500. Escrowed items cannot be sold. Checkpoint timers begin at the first opening of a puzzle and continue while closed; historical untimed completions retain points and show “Not timed.” The time leaderboard excludes those entries, and a cumulative time requires 60 timed completions. Every board displays a completion emblem for players with all 60 current checkpoints complete.

The revised cipher clues use a reference Morse codebook, prime-position extraction plus a shift, a twelve-letter rail cipher plus a shift, and a secondary Atbash layer in the ruins rotor. `db/verify-expedition-v5.sql` exercises notifications, receipts, selling, escrow protection, persistent timers, full-route eligibility and reset behavior with rolled-back fixtures.
