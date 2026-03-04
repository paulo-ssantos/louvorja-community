---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7]
inputDocuments:
  - _bmad-output/planning-artifacts/prd.md
  - docs/lja-community-blueprint.md
  - _bmad-output/planning-artifacts/product-brief-lja-community-2026-02-27.md
workflowType: 'architecture'
project_name: 'lja-community'
user_name: 'Paulo Santos'
date: '2026-03-01'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**
- 29 FRs organized into 6 capability areas
- User Management: registration, login, profiles (4 FRs)
- Collection Management: upload, download, update, delete (5 FRs)
- Content Discovery: search, browse, filter (5 FRs)
- Ranking & Voting: upvotes, Top 5 (4 FRs)
- Tool Listings: submit, browse tools (3 FRs)
- Developer Hub: project listing, GitHub integration (3 FRs)
- User Profiles: display contributions (3 FRs)

**Non-Functional Requirements:**
- Performance: page load <2s, search <500ms
- Security: Supabase Auth, hashed passwords, storage policies
- Scalability: 50→500 users
- Accessibility: basic WCAG, keyboard navigation, screen reader support

**Scale & Complexity:**
- Primary domain: Web (MPA)
- Complexity level: Low
- Project type: Greenfield web application
- Target users: 50-500 (MVP to growth)

### Technical Constraints & Dependencies

- **Tech Stack**: Nuxt.js + NestJS + Supabase (self-hosted)
- **File Storage**: Supabase Storage
- **External Integration**: GitHub API
- **SEO**: Required for content discoverability

### Cross-Cutting Concerns Identified

- SEO optimization (SSR/SSG via Nuxt)
- File upload management
- GitHub API rate limiting and caching
- User session management
- Content ranking algorithm

## Starter Template Evaluation

### Primary Technology Domain

Web application (MPA) based on project requirements analysis

### Technical Preferences (Confirmed)

- **Frontend**: Nuxt.js
- **Backend**: NestJS
- **Database & Auth**: Supabase (self-hosted)
- **File Storage**: Supabase Storage
- **External Integration**: GitHub API

### Current Versions (2026)

- **Nuxt.js**: v4.3.x (latest) or v3.21.x (supported until July 2026)
- **NestJS**: v11.x (stable)
- **Supabase**: v2.x (client)

### Selected Approach: Custom Stack

No pre-built starter template used - custom stack provides full control.

**Initialization Commands:**

**Frontend (Nuxt.js):**
```bash
npx nuxi@latest init lja-community-frontend
```

**Backend (NestJS):**
```bash
npm i -g @nestjs/cli
nest new lja-community-backend
```

**Supabase:**
- Cloud: Create project at supabase.com
- Self-hosted: Use Supabase Docker setup

### Architectural Decisions Provided

**Frontend:**
- TypeScript with Nuxt.js
- SSR/SSG for SEO
- Vue 3 Composition API
- File-based routing

**Backend:**
- TypeScript with NestJS
- REST API
- Supabase client integration

**Database:**
- PostgreSQL (via Supabase)
- Supabase Auth for authentication
- Supabase Storage for file management

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Tech stack: Nuxt.js + NestJS + Supabase ✓
- API: REST with Swagger ✓

**Important Decisions (Shape Architecture):**
- State Management: Pinia ✓
- UI Framework: Tailwind + shadcn-vue + GSAP ✓
- Deployment: VPS + Jenkins CI/CD ✓

**Deferred Decisions (Post-MVP):**
- GraphQL (if needed for complex queries later)
- Real-time features (WebSocket)
- Advanced caching strategies

### Data Architecture

- **Database**: PostgreSQL via Supabase
- **ORM**: Supabase JS Client (direct, no extra ORM)
- **Data Validation**: Zod (recommended for schema validation)

### Authentication & Security

- **Auth**: Supabase Auth (email/password)
- **Password**: Hashed by Supabase
- **Storage**: Supabase Storage with RLS policies
- **Session**: Supabase session management

### API & Communication Patterns

- **API Style**: REST
- **Documentation**: Swagger/OpenAPI via @nestjs/swagger
- **Error Handling**: Standard HTTP status codes
- **Validation**: Class Validator + Zod

### Frontend Architecture

- **Framework**: Nuxt.js (Vue 3 Composition API)
- **State Management**: Pinia via @pinia/nuxt
- **UI Framework**: Tailwind CSS + shadcn-vue (Radix-based)
- **Animations**: GSAP (lazy loaded for performance)
- **Routing**: File-based routing (Nuxt default)

### Infrastructure & Deployment

- **Frontend Hosting**: VPS (Nginx)
- **Backend Hosting**: VPS (Node.js)
- **Database**: Supabase (self-hosted or cloud)
- **CI/CD**: Jenkins
- **Process Manager**: PM2 for Node.js

### Library Additions

- **@nestjs/swagger**: API documentation
- **@pinia/nuxt**: Pinia integration for Nuxt
- **shadcn-vue**: Component library
- **GSAP**: Animations (lazy loaded)
- **Zod**: Schema validation

### Decision Impact Analysis

**Implementation Sequence:**
1. Set up Supabase (database + storage)
2. Initialize Nuxt.js frontend
3. Initialize NestJS backend
4. Configure authentication
5. Build core features per FRs
6. Add UI components and animations
7. Deploy to VPS with Jenkins

**Cross-Component Dependencies:**
- Supabase Auth → User sessions → All features
- Pinia stores → Component state → UI interactions
- NestJS API → Frontend API calls → Data display

## Implementation Patterns & Consistency Rules

### Naming Patterns

**Database:**
- Tables: snake_case plural (`users`, `lja_collections`, `tools`)
- Columns: snake_case (`user_id`, `created_at`, `collection_name`)
- Foreign keys: `{table}_id` format (`user_id`, `collection_id`)

**API:**
- Endpoints: Plural nouns (`/api/collections`, `/api/tools`, `/api/users`)
- Route params: `:id` format (`/collections/:id`)
- Query params: snake_case (`page_size`, `sort_by`)

**Code:**
- Vue Components: PascalCase (`UserCard.vue`, `CollectionList.vue`)
- Files: kebab-case (`user-card.vue`, `collection-item.vue`)
- Functions/variables: camelCase (`getCollections`, `userData`)

### Project Structure

```
/frontend (Nuxt.js)
  /components
    /ui          # shadcn-vue base components
    /features    # Feature-specific components
  /pages         # Nuxt pages (file-based routing)
  /stores        # Pinia stores
  /composables   # Vue composables
  /utils         # Helper functions
  /config        # Configuration

/backend (NestJS)
  /src
    /modules    # Feature modules
    /common     # Shared utilities, decorators, guards
    /config     # Configuration
  /tests        # Test files

/supabase
  /migrations   # Database migrations
  /seed         # Seed data
```

### API Response Format

```typescript
// Standard response wrapper
{
  status: number,    // HTTP status code (200, 201, 400, etc.)
  data: object | null,  // Response payload
  meta: {            // Pagination, totals, timestamps
    page?: number,
    pageSize?: number,
    total?: number,
    timestamp?: string
  },
  links?: {         // HATEOAS navigation
    self: string,
    next?: string,
    prev?: string
  }
}

// Error response
{
  status: number,
  data: {
    error: {
      code: string,
      message: string,
      details?: object
    }
  }
}
```

### Data Formats

- **JSON**: snake_case field names
- **Dates**: ISO 8601 strings (`2026-03-01T10:00:00Z`)
- **Booleans**: true/false (not 1/0)
- **Null handling**: Use `null` for missing values

### Code Organization

- **Tests**: Co-located with source (`*.test.ts` next to `*.ts`)
- **Components**: By feature (`/features/collections/components`)
- **Utilities**: `/shared/utils`
- **API layers**: Controller → Service → Repository pattern

### State Management (Pinia)

- Store per feature (`useCollectionStore`, `useUserStore`)
- Actions: async operations
- Getters: derived state
- State: reactive data

## Project Structure & Boundaries

### Frontend (Nuxt.js)

```
lja-community/
├── nuxt.config.ts
├── tailwind.config.ts
├── app.vue
├── /pages
│   ├── index.vue
│   ├── /collections
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── /tools
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── /developer-hub
│   │   ├── index.vue
│   │   └── [id].vue
│   ├── /profile
│   │   └── [username].vue
│   └── /auth
│       ├── login.vue
│       └── register.vue
├── /components
│   ├── /ui           # shadcn-vue components
│   ├── /collections  # Collection-specific
│   ├── /tools       # Tool-specific
│   ├── /developer   # Developer hub
│   └── /shared      # Shared components
├── /stores           # Pinia stores
│   ├── auth.ts
│   ├── collections.ts
│   ├── tools.ts
│   └── developer.ts
├── /composables      # Vue composables
├── /utils
├── /config
└── /public
```

### Backend (NestJS)

```
lja-community-backend/
├── nest-cli.json
├── tsconfig.json
├── /src
│   ├── main.ts
│   ├── app.module.ts
│   ├── /config
│   ├── /modules
│   │   ├── /auth
│   │   ├── /collections
│   │   ├── /tools
│   │   ├── /developer
│   │   └── /users
│   ├── /common
│   │   ├── /decorators
│   │   ├── /guards
│   │   ├── /filters
│   │   └── /interceptors
│   └── /shared
│       ├── /dto
│       └── /interfaces
└── /test
```

### Requirements Mapping

| FR Category | Frontend | Backend Module |
|-------------|----------|----------------|
| User Management | /stores/auth.ts, /pages/auth | /modules/users |
| Collection Management | /stores/collections.ts, /pages/collections | /modules/collections |
| Content Discovery | /stores/*, /pages/* | /modules/* (shared) |
| Ranking & Voting | /stores/collections.ts | /modules/collections |
| Tool Listings | /stores/tools.ts, /pages/tools | /modules/tools |
| Developer Hub | /stores/developer.ts, /pages/developer-hub | /modules/developer |
| User Profiles | /stores/auth.ts, /pages/profile | /modules/users |

## Architecture Validation

### Coherence Check ✅

| Check | Status |
|-------|--------|
| Tech stack compatibility | ✅ Nuxt + NestJS + Supabase work together |
| Version compatibility | ✅ All versions verified |
| Pattern consistency | ✅ Naming/structure patterns aligned |
| No contradictory decisions | ✅ |

### Requirements Coverage ✅

All 29 FRs are architecturally supported through the defined modules and components.

### Implementation Readiness ✅

| Area | Status |
|------|--------|
| All decisions documented | ✅ |
| Patterns comprehensive | ✅ |
| Project structure complete | ✅ |
| Integration points defined | ✅ |

### Validation Result

**Architecture is complete and ready for implementation.**

---

## Next Steps

The architecture is complete. Available workflows:

1. **Create Epics & Stories** - Break down FRs into implementable tasks
2. **Create UX Design** - Plan UI/UX for the platform
3. **Begin Implementation** - Start building the MVP
