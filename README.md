# LJA Community

Community platform for the LouvorJA worship music ecosystem — a hub for sharing collections, media tools, and open-source developer projects for Adventist churches across Brazil.

> **Independent project.** Not affiliated with the official LouvorJA site (louvorja.com.br).

## Goal

Before LJA Community, LouvorJA collections were scattered across WhatsApp groups — hard to find, impossible to version, and ephemeral. The platform centralizes:

- **Collections** — ZIP/RAR/7Z worship music packages, searchable by category, sortable by popularity or recency, with upvotes and star ratings
- **Tools** — curated directory of media tools (image, video, audio, streaming, presentation) with click tracking
- **Developer Hub** — index of open-source projects from the community, linking to GitHub repositories

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Nuxt 4 + Vue 3 (SSR) |
| Backend | NestJS 11 (REST API) |
| Database | PostgreSQL via Supabase |
| Auth | Supabase Auth (email/password) |
| Storage | Supabase Storage (collections bucket, max 100 MB) |
| Styling | Tailwind CSS v3 + shadcn/vue components |
| Fonts | Fraunces (display) · DM Sans (body) |
| Monorepo | pnpm workspaces + Turborepo |
| Shared types | `@lja/types` package |

## Repository Structure

```
lja-community/
├── apps/
│   ├── backend/          # NestJS 11 — REST API on port 3001
│   │   ├── src/modules/  # collections · tools · developer · users · auth
│   │   ├── supabase/migrations/  # SQL schema (001_initial_schema.sql)
│   │   └── .env          # SUPABASE_URL · SUPABASE_KEY · PORT
│   └── frontend/         # Nuxt 4 — SSR frontend on port 3000
│       ├── pages/        # File-based routing
│       ├── components/   # NavBar · AppFooter · UI library (shadcn/vue)
│       ├── composables/  # useCollections (API data fetching)
│       └── assets/       # Fonts · images · CSS design tokens
├── packages/
│   └── types/            # @lja/types — shared TypeScript interfaces
├── _bmad/                # BMAD AI workflow agents and configs
├── openspec/             # OpenSpec change management artifacts
├── docs/                 # Project knowledge base
├── pnpm-workspace.yaml
└── turbo.json
```

## Data Model

Five tables, all with Row Level Security enabled:

- **`profiles`** — linked to Supabase Auth users (username, avatar)
- **`collections`** — name, description, category, file_url, upvotes, downloads
- **`collection_upvotes`** — unique (collection_id, user_id) constraint
- **`tools`** — name, description, category, url, clicks
- **`developer_projects`** — name, github_url, stars, last_activity

## Running Locally

```bash
# Prerequisites: pnpm, Node 20+

# Install all dependencies
pnpm install

# Start both apps in parallel (backend :3001, frontend :3000)
pnpm run dev

# Or individually
pnpm run dev:backend
pnpm run dev:frontend
```

### Backend environment (`apps/backend/.env`)

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
PORT=3001
```

The frontend Supabase connection is configured in `apps/frontend/nuxt.config.ts` directly (public anon key only).

## API

Swagger docs available at `http://localhost:3001/api/docs` when the backend is running.

Key endpoints:

| Method | Path | Description |
|--------|------|-------------|
| GET | `/collections` | List collections (sort, category, limit) |
| POST | `/collections` | Create collection |
| POST | `/collections/:id/upvote` | Toggle upvote |
| POST | `/collections/:id/rate` | Submit star rating |
| GET | `/tools` | List tools |
| POST | `/tools/:id/click` | Track tool click |
| GET | `/developer/projects` | List developer projects |

## Build

```bash
pnpm run build          # builds types → backend → frontend (Turborepo cached)
pnpm --filter @lja/frontend run build   # frontend only
pnpm --filter @lja/backend run build    # backend only
```

## Contributing

Community contributors: upload collections and suggest tools through the platform.

Developer contributors: join the [Telegram dev group](https://louvorja.com.br/telegram_dev).
