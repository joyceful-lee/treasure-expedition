# Treasure Expedition

A treasure-map puzzle adventure for middle and high-school explorers. Built with Next.js, React, Neon Postgres, and Neon Auth (managed Better Auth).

## Features

- Six progressively harder checkpoints with locked → available → attempted → completed states.
- Neon email/password signup and login, plus unique public explorer nicknames.
- Server-checked answers, persistent progress, and first-solve rewards.
- Public top 10 leaderboard for each checkpoint, joined to the users table; emails remain private.
- Six collectible treasures, 100-coin surprise packs with visible drop chances, and a trading post.
- Atomic trade escrow, acceptance, cancellation, coin spending, and reward grants in Postgres functions.
- Responsive illustrated island, keyboard-accessible dialogs, free hints, and clear instructions.

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

The scoring rule is `max(100, checkpoint × 250 − wrong attempts × 25)`. Hints have no penalty. Earlier completion breaks tied scores. Completed checkpoints cannot be farmed for more rewards. Packs cost in-game coins only, with no payment integration.

## Implementation notes

All mutations require a verified Neon session and same-origin POST. Answers are held in the server module `lib/puzzles.ts`; database functions serialize changes using row locks. The `expedition` schema is not exposed to browser database roles. Public APIs return only leaderboard nicknames/scores and active trade offers. Never put the connection string or cookie secret in `NEXT_PUBLIC_` variables.

The map is drawn locally in SVG. Fonts use Google Fonts with local serif/sans-serif fallbacks. No paid assets or image APIs are needed.
