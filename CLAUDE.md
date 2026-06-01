# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Dev server with Turbopack (http://localhost:3000)
bun run build        # Production build
bun run start        # Start production server
bun run lint         # ESLint flat config (eslint.config.mjs, next/core-web-vitals)
```

## Architecture

Next.js 15 portfolio site using Pages Router (`src/pages/`), React 19, TypeScript (strict), and Tailwind CSS v4.

**Path aliases** (tsconfig.json):
- `@/` → `src/` (e.g., `@/components/Projects`)
- `@static/` → `public/static/`
- `@generated/` → `src/__generated__/`

**Key directories:**
- `src/pages/` — Routes: index, about, work, contact, plus `api/mail.ts` (nodemailer endpoint)
- `src/components/` — UI components; `animation/` subdirectory has Framer Motion wrappers
- `src/layout/` — Layout, Navbar, Footer
- `util/` — Hooks (`pageRef.ts`, `mediaQuery.ts`), data (`resume.json`), nodemailer config
- `types/` — TypeScript types and ambient declarations (e.g., `audio.d.ts` for MP3 imports)

**Notable features:**
- **StepSequencer** (`src/components/StepSequencer.tsx`): Interactive beatmaker using Tone.js. MP3 assets in `public/sounds/` are bundled via a custom webpack rule in `next.config.ts`.
- **Navigation**: Uses a `usePageRefs` hook for scroll-based section navigation.
- **Images**: Hosted on Cloudinary; remote patterns configured in `next.config.ts`.

## Deployment

Docker multi-stage build (Bun for deps/build, Node.js 22 slim for runtime). Standalone output mode.

CD pipeline (`.github/workflows/cd.yaml`): push to main/dev → Docker build → GHCR → repository dispatch to `samuelho-dev/ai-dev-env` for deployment. Main branch = prod, dev branch = dev environment.

## Style & Formatting

- Prettier with `prettier-plugin-tailwindcss` for class sorting
- Biome configured via `biome.json` (extends user global config)
- Custom color theme defined in `src/styles/globals.css` (custom-black, custom-white, custom-purple, custom-yellow, etc.)
