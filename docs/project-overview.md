# LouvorJA Community - Project Overview

**Project Type:** Multi-part Web Application (SaaS)  
**Architecture:** Monorepo (Client/Server)  
**Primary Language:** TypeScript  
**Date Generated:** 2026-03-03

---

## Executive Summary

LouvorJA Community is a web-based platform that centralizes resource sharing and open-source project collaboration for Brazilian Adventist church housemix teams. The platform addresses fragmentation of LJA collections, housemix resources, and developer projects currently shared through WhatsApp groups.

**Target Users:**
- Primary: Church housemix teams (small churches: 1 person, large churches: 4-8 persons)
- Secondary: Adventist developers who want to contribute to church-related open-source projects

**Tech Stack:**
- Frontend: Nuxt.js + Vue 3 + Pinia + TailwindCSS
- Backend: NestJS + TypeScript
- Database: Supabase (PostgreSQL + Auth + Storage)

---

## Repository Structure

```
lja-community/
├── lja-community-backend/     # NestJS API server
│   ├── src/
│   │   ├── modules/          # Feature modules (collections, tools, developer, users)
│   │   ├── supabase/        # Supabase client service
│   │   ├── app.module.ts    # Root module
│   │   └── main.ts          # Entry point
│   ├── supabase/            # Database migrations
│   └── package.json
│
├── lja-community-frontend/   # Nuxt.js web app
│   ├── pages/               # Route-based pages
│   │   ├── index.vue        # Home page
│   │   ├── collections/      # Collection management
│   │   ├── tools/           # Tool listings
│   │   ├── developer-hub/  # Developer projects
│   │   ├── profile/         # User profile
│   │   └── auth/           # Authentication
│   ├── components/          # Reusable Vue components
│   ├── composables/         # Vue composables
│   ├── stores/              # Pinia stores
│   └── nuxt.config.ts       # Nuxt configuration
│
├── docs/                    # Project documentation
├── _bmad/                  # BMAD workflow files
└── _bmad-output/           # Generated artifacts
```

---

## Quick Reference

| Component | Details |
|-----------|---------|
| **Frontend Entry** | `lja-community-frontend/` - Run `npm run dev` |
| **Backend Entry** | `lja-community-backend/` - Run `npm run start:dev` |
| **API Docs** | Swagger at `http://localhost:3000/api` |
| **Database** | Supabase (self-hosted) |
| **Auth** | Supabase Auth |

---

## Generated Documentation

- [Architecture](./architecture.md)
- [Source Tree Analysis](./source-tree-analysis.md)
- [Development Guide](./development-guide.md)
- [API Contracts - Backend](./api-contracts-backend.md)
- [Data Models](./data-models.md)

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Setup Backend
```bash
cd lja-community-backend
npm install
npm run start:dev
```

### Setup Frontend
```bash
cd lja-community-frontend
npm install
npm run dev
```

---

## Existing Documentation

- [Product Brief](../_bmad-output/planning-artifacts/product-brief-lja-community-2026-02-27.md)
- [PRD](../_bmad-output/planning-artifacts/prd.md)
- [Blueprint](../docs/lja-community-blueprint.md)
