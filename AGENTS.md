# AGENTS.md

## Project

Personal portfolio for Nadhir Bendraou, built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, and shadcn/ui (`base-nova` style). Package manager/runtime is **Bun**.

## Commands

```bash
bun install        # install deps
bun dev            # dev server on :3000
bun run build      # production build
bun start          # run production build
bun run lint       # eslint (flat config)
```

No test framework is configured. Verify changes with `bun run build` and `bun run lint`.

## Layout

- `app/` — routes, metadata, SEO files (`sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`), server actions.
  - `app/page.tsx` composes the single-page home from section components.
  - `app/projects/[slug]/page.tsx` renders project case studies; `dynamicParams = false` and `generateStaticParams` come from `data/projects.ts`.
  - `app/actions/contact.ts` is the `"use server"` action that emails via Resend.
- `components/layout/` — navbar, command menu, footer, theme toggler.
- `components/sections/` — home sections (`hero`, `about`, `projects`, `skills`, `process`, `testimonials`, `community`, `faq`, `contact`). Project case-study pieces live in `components/sections/projects/`.
- `components/ui/` — shadcn/ui primitives; prefer these over new libraries.
- `components/shared/` — reveal animations and `JsonLd`.
- `data/` — content source of truth: `site.ts` (profile, socials, contact), `projects.ts` (typed project + content blocks), `tech-icons.tsx`.
- `lib/` — `seo.ts` (JSON-LD builders), `contact.ts` (form state types), `utils.ts` (`cn`), `copy-to-clipboard.ts`.
- `public/` — avatar, project/process images, vercel/google verification files.

## Conventions

- Import via `@/*` path alias (repo root). Match existing import ordering (external, then `@/`).
- Server Components by default. Add `"use client"` only when hooks/events/browser APIs are needed (most sections are client components).
- Use shadcn/ui components from `components/ui`; add new ones with the shadcn CLI and keep `components.json` aliases.
- Style with Tailwind utilities and semantic tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `text-brand`). Dark mode uses the `.dark` class, defaulting to dark via the inline script in `app/layout.tsx`. Avoid hardcoded colors where a token exists; some sections intentionally use `bg-white dark:bg-neutral-950`.
- Icons come from `lucide-react`; tech stack icons are mapped in `data/tech-icons.tsx`.
- Add/edit content in `data/`, not hardcoded inside components. Project type is defined in `data/projects.ts`; `TECH_KEYS` in `app/projects/[slug]/page.tsx` maps stack label → tech icon name.
- All user-facing pages target strong SEO: update metadata, canonical URLs, JSON-LD (`lib/seo.ts`), and sitemap entries when adding routes.
- Do not add comments unless necessary; follow the existing concise style.

## Environment

Copy `.env` keys from `README.md`. `RESEND_API_KEY` is required for the contact form; without it the action returns a "not configured" error. Public URLs/email use `NEXT_PUBLIC_*` vars. Optional `resumeUrl` / `newsletterUrl` in `data/site.ts` keep those links disabled until set.

## Git

Repo is git-initialized. Do not commit unless explicitly asked.
