# Base44 Dev Environment

## What this app is
Vite + React 19 + TypeScript PWA ("PSI Customer Portal"). Frontend-only — no backend or database service in compose.

## Running it
```
docker compose -f docker-compose.base44.yml up -d
```
- Node 22 base image, source bind-mounted at `/app`, `npm ci` + `vite dev` on startup.
- Vite dev server on port 5173, mapped to host port 3000.
- `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS` is passed bare so the preview proxy can reach the dev server.

## Supabase (optional)
- The app uses Supabase for auth (`VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`).
- **Not required to boot** — `src/lib/supabaseClient.ts` falls back to placeholder values and `supabaseConfigured` is false. The app shows a "View Demo" mode without credentials.
- Real sign-in/sign-up only works once real Supabase credentials are provided via the platform secrets (`/run/base44/app.env`).

## Health check
Curls `http://localhost:5173/` inside the container; expects HTTP 200.

## Verify it works
```
curl -sS -o /dev/null -w "%{http_code}" http://localhost:3000/
```
Should return `200`. Check logs with `docker compose -f docker-compose.base44.yml logs web`.
