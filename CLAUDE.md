# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Structure

pnpm monorepo with Turborepo orchestration:

```
lja-community/
├── apps/
│   ├── backend/          # NestJS 11 REST API (port 3000)
│   └── frontend/         # Nuxt 4 + Vue 3
├── packages/
│   └── types/            # Shared TypeScript interfaces (@lja/types)
├── package.json          # Workspace root
├── pnpm-workspace.yaml   # Workspace config
├── turbo.json            # Build pipeline
├── _bmad/                # BMAD AI workflow configs and agents
├── _bmad-output/         # Generated planning/implementation artifacts
├── openspec/             # OpenSpec change management artifacts
└── docs/                 # Project knowledge base
```

## Commands

All commands run from the **monorepo root**:

```bash
pnpm run dev              # Start all apps in parallel
pnpm run build            # Build types → backend → frontend (cached)
pnpm run dev:backend      # Start only the backend
pnpm run dev:frontend     # Start only the frontend
```

### Per-package commands (with Turborepo filter)
```bash
pnpm --filter @lja/backend run build
pnpm --filter @lja/frontend run build
pnpm --filter @lja/types run build
```

### Direct package scripts
```bash
# Backend (cd apps/backend)
pnpm run dev             # NestJS watch mode (port 3000)
pnpm run build           # Compile TypeScript → dist/
pnpm run start:prod      # Run compiled production build

# Frontend (cd apps/frontend)
pnpm run dev             # Nuxt dev server with devtools
pnpm run build           # Production build
pnpm run generate        # Static site generation
```

No `lint`, `test`, or `format` scripts are defined in either app yet.

## Architecture

### Data flow
The frontend calls the NestJS backend at `http://localhost:3000` via plain `fetch` in composables (e.g. `composables/useCollections.ts`). The backend is the sole Supabase client — the frontend does **not** call Supabase directly for data, only for auth (via `@nuxtjs/supabase`).

### Shared types (`packages/types`)
Shared TypeScript interfaces for all domain entities (Collection, Tool, DeveloperProject, Profile) and their DTOs. Both apps depend on `@lja/types` via `workspace:*`. Turborepo ensures types build before the apps.

### Backend (`apps/backend`)
- All business logic lives in services (`src/modules/<name>/<name>.service.ts`)
- All services receive a `SupabaseService` injection and call `this.supabase.client` directly — TypeORM is a dependency but no entities are defined yet; Supabase JS client is the actual data layer
- Swagger is auto-generated from `@ApiTags`, `@ApiOperation`, `@ApiResponse` decorators; always add these to new controllers
- `SupabaseService` is initialized in `onModuleInit` from env vars `SUPABASE_URL` and `SUPABASE_KEY`
- Database schema in `supabase/migrations/001_initial_schema.sql`

### Frontend (`apps/frontend`)
- File-based routing under `pages/`; dynamic segments use `[id].vue` convention
- API calls go through composables in `composables/` (not Pinia stores); no stores exist yet
- Base UI components live in `components/ui/` following shadcn/vue conventions (Reka UI primitives + CVA variants + `cn()` utility)
- Theming is entirely CSS-variable-based (HSL), configured in `tailwind.config.ts`; dark mode uses `class` strategy
- Fonts: **Inter** for body text, **Outfit** for display/headings

### Backend env (`apps/backend/.env` required, see `.env.example`)
```
SUPABASE_URL=
SUPABASE_KEY=
SUPABASE_SERVICE_KEY=
PORT=3000
```

## BMAD AI Workflows

This project uses the BMAD method for AI-assisted development. Artifacts are output to `_bmad-output/`. When working through stories or specs, always load `_bmad/bmm/config.yaml` first. BMAD agents are available in `.github/copilot-instructions.md` and via `/bmad-` slash commands.

Key agents: `analyst` (Mary), `architect` (Winston), `dev` (Amelia), `pm` (John), `qa` (Quinn), `sm` (Bob).
