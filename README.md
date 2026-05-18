# HAAT — Cash Control Platform Prototype

Interactive prototype for the HAAT Ops PM take-home assignment.

## What's inside

**Two views** accessible via the top-right toggle:

1. **Ops Dashboard** — Real-time financial operations control center. KPI strip, courier risk table, alerts, cash flow visualization, merchant debt aging.

2. **Courier App** — Three-screen mobile mockup demonstrating auto-settlement flow. Tap "Mark as Delivered" to trigger the wallet update. Then deposit to see the loop close.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

```bash
git init
git add .
git commit -m "Initial prototype"
git remote add origin <your-repo-url>
git push -u origin main
```

Then connect the repo at vercel.com — Vercel will auto-detect Next.js and deploy.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (icons)

## Built for

HAAT Ops Product Manager take-home · 2026
