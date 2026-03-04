# Source Tree Analysis - LouvorJA Community

**Generated:** 2026-03-03

---

## Project Root

```
lja-community/
├── .agent/                    # Agent configuration
├── _bmad/                     # BMAD workflow files
├── _bmad-output/              # Generated artifacts
├── docs/                      # Documentation
├── .github/                   # GitHub workflows
├── lja-community-backend/     # NestJS API server
└── lja-community-frontend/   # Nuxt.js web app
```

---

## Backend (`lja-community-backend/`)

```
lja-community-backend/
├── dist/                      # Compiled output
├── node_modules/              # Dependencies
├── src/
│   ├── modules/
│   │   ├── collections/       # Collections CRUD
│   │   │   ├── collections.controller.ts
│   │   │   ├── collections.service.ts
│   │   │   └── collections.module.ts
│   │   ├── tools/            # Tools listings
│   │   │   ├── tools.controller.ts
│   │   │   ├── tools.service.ts
│   │   │   └── tools.module.ts
│   │   ├── developer/        # Developer hub
│   │   │   ├── developer.controller.ts
│   │   │   ├── developer.service.ts
│   │   │   └── developer.module.ts
│   │   └── users/            # User profiles
│   │       ├── users.controller.ts
│   │       ├── users.service.ts
│   │       └── users.module.ts
│   ├── supabase/
│   │   └── supabase.service.ts   # Supabase client
│   ├── app.module.ts         # Root module
│   └── main.ts               # Entry point
├── supabase/
│   └── migrations/           # Database migrations
├── .env                      # Environment variables
├── nest-cli.json             # NestJS CLI config
├── package.json              # Dependencies
└── tsconfig.json             # TypeScript config
```

### Key Files

| File | Purpose |
|------|---------|
| `main.ts` | Application entry point, Swagger setup |
| `app.module.ts` | Root module, imports all feature modules |
| `supabase/supabase.service.ts` | Supabase client initialization |

---

## Frontend (`lja-community-frontend/`)

```
lja-community-frontend/
├── .nuxt/                    # Nuxt build output
├── .output/                  # Production build
├── node_modules/             # Dependencies
├── pages/                    # Route-based pages
│   ├── index.vue             # Home page
│   ├── search.vue            # Global search
│   ├── collections/
│   │   ├── index.vue         # Browse collections
│   │   ├── [id].vue          # Collection detail
│   │   └── upload.vue       # Upload collection
│   ├── tools/
│   │   ├── index.vue         # Browse tools
│   │   ├── [id].vue          # Tool detail
│   │   └── submit.vue        # Submit tool
│   ├── developer-hub/
│   │   ├── index.vue         # Browse projects
│   │   └── [id].vue         # Project detail
│   ├── developer/
│   │   └── submit.vue       # Submit project
│   ├── profile/
│   │   └── index.vue        # User profile
│   └── auth/
│       ├── login.vue         # Login page
│       └── register.vue      # Register page
├── components/               # Reusable components
├── composables/              # Vue composables
├── stores/                   # Pinia stores
├── public/                   # Static assets
├── app.vue                   # Root component
├── nuxt.config.ts            # Nuxt configuration
└── package.json              # Dependencies
```

### Key Files

| File | Purpose |
|------|---------|
| `app.vue` | Root component with NuxtLayout |
| `nuxt.config.ts` | Nuxt configuration, Supabase module |
| `pages/index.vue` | Home with trending/recent collections |

---

## Critical Directories

| Directory | Purpose | Part |
|-----------|---------|------|
| `src/modules/` | Feature modules (API endpoints) | Backend |
| `pages/` | Route-based pages | Frontend |
| `supabase/migrations/` | Database schema | Backend |
| `.output/` | Production build | Frontend |

---

## Integration Points

### Frontend → Backend

- API calls to `http://localhost:3000`
- Collections: `/collections`, `/collections/:id`, `/collections/search`
- Tools: `/tools`, `/tools/:id`
- Developer: `/developer/projects`, `/developer/projects/:id`
- Users: `/users/:id`

### Backend → Supabase

- Database queries via `@supabase/supabase-js`
- File storage via Supabase Storage
- Authentication via Supabase Auth

---

## Entry Points

| Component | Entry Point | Command |
|-----------|-------------|---------|
| Frontend Dev | `pages/index.vue` | `npm run dev` |
| Backend Dev | `src/main.ts` | `npm run start:dev` |
| Frontend Prod | `.output/server/index.mjs` | `node .output/server/index.mjs` |
| Backend Prod | `dist/main.js` | `node dist/main.js` |
