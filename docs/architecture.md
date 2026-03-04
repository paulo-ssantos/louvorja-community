# Architecture Documentation - LouvorJA Community

**Generated:** 2026-03-03  
**Project Type:** Multi-part Web Application (SaaS)

---

## Executive Summary

LouvorJA Community is a web-based platform built with a **client-server architecture** using:
- **Frontend:** Nuxt.js (Vue 3) with SSR
- **Backend:** NestJS REST API
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage

---

## Technology Stack

### Frontend (`lja-community-frontend/`)

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Nuxt.js | ^4.3.1 |
| UI Framework | Vue.js | ^3.5.29 |
| State Management | Pinia | ^0.11.3 |
| Styling | TailwindCSS | ^6.14.0 |
| Supabase | @nuxtjs/supabase | ^2.0.4 |

### Backend (`lja-community-backend/`)

| Category | Technology | Version |
|----------|------------|---------|
| Framework | NestJS | ^11.1.15 |
| Language | TypeScript | ^5.9.3 |
| Database | PostgreSQL (via pg) | ^8.19.0 |
| ORM | TypeORM | ^0.3.28 |
| Supabase Client | @supabase/supabase-js | ^2.98.0 |
| API Docs | @nestjs/swagger | ^11.2.6 |

---

## Architecture Pattern

### Multi-Page Application (MPA)
- Server-Side Rendering (SSR) for SEO
- RESTful API communication
- Stateless backend design

### Module Structure (Backend)

```
src/
├── modules/
│   ├── collections/    # LJA collection CRUD
│   ├── tools/         # Tool/website listings
│   ├── developer/      # Developer hub projects
│   └── users/         # User profiles
├── supabase/          # Supabase client
├── app.module.ts      # Root module
└── main.ts           # Entry point
```

### Page Structure (Frontend)

```
pages/
├── index.vue          # Home (trending/recent)
├── collections/
│   ├── index.vue     # Browse collections
│   ├── [id].vue     # Collection detail
│   └── upload.vue   # Upload collection
├── tools/
│   ├── index.vue    # Browse tools
│   ├── [id].vue     # Tool detail
│   └── submit.vue   # Submit tool
├── developer-hub/
│   ├── index.vue    # Browse projects
│   └── [id].vue     # Project detail
├── developer/
│   └── submit.vue   # Submit project
├── profile/
│   └── index.vue    # User profile
├── auth/
│   ├── login.vue    # Login
│   └── register.vue # Register
└── search.vue       # Global search
```

---

## API Design

### REST Endpoints

**Collections**
- `GET /collections` - List all collections
- `GET /collections/:id` - Get collection by ID
- `POST /collections` - Create collection
- `PUT /collections/:id` - Update collection
- `DELETE /collections/:id` - Delete collection
- `POST /collections/:id/upvote` - Upvote collection
- `POST /collections/:id/rate` - Rate collection
- `GET /collections/search?q=` - Search collections

**Tools**
- `GET /tools` - List all tools
- `GET /tools/:id` - Get tool by ID
- `POST /tools` - Create tool
- `POST /tools/:id/click` - Track click
- `DELETE /tools/:id` - Delete tool

**Developer Projects**
- `GET /developer/projects` - List all projects
- `GET /developer/projects/:id` - Get project by ID
- `POST /developer/projects` - Create project
- `DELETE /developer/projects/:id` - Delete project
- `GET /developer/projects/:id/refresh` - Refresh GitHub data

**Users**
- `GET /users/:id` - Get user profile
- `GET /users/me` - Get current user
- `PUT /users/me` - Update profile
- `GET /users/:id/collections` - Get user collections

---

## Data Architecture

### Supabase Tables

- `profiles` - User profiles
- `collections` - LJA collections
- `collection_upvotes` - Collection upvotes
- `collection_ratings` - Collection ratings
- `tools` - Tool/website listings
- `developer_projects` - Developer projects

### Storage Buckets

- `collections` - LJA collection files (ZIP, RAR, 7Z)

---

## Security

- User authentication via Supabase Auth
- Passwords hashed by Supabase
- File storage secured through Supabase Storage policies
- Row Level Security (RLS) on database tables

---

## Deployment

### Development
- Frontend: `npm run dev` (localhost:3000)
- Backend: `npm run start:dev` (localhost:3001)

### Production
- Frontend: `npm run build` → `.output/`
- Backend: `npm run build` → `dist/`

---

## Performance Targets

- Page load: under 2 seconds
- Search results: under 500ms
- API responses: under 200ms
