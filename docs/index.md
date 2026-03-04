# Project Documentation Index - LouvorJA Community

**Generated:** 2026-03-03

---

## Project Overview

- **Type:** Multi-part Web Application (SaaS)
- **Primary Language:** TypeScript
- **Architecture:** Monorepo (Client/Server)
- **Repository:** https://github.com/anomalyco/lja-community

---

## Tech Stack Summary

| Component | Technology |
|-----------|------------|
| Frontend | Nuxt.js + Vue 3 + Pinia + TailwindCSS |
| Backend | NestJS + TypeScript |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage |

---

## Generated Documentation

### Core Documentation

- [Project Overview](./project-overview.md)
- [Architecture](./architecture.md)
- [Source Tree Analysis](./source-tree-analysis.md)
- [Development Guide](./development-guide.md)
- [API Contracts - Backend](./api-contracts-backend.md)
- [Data Models](./data-models.md)

---

## Existing Documentation

- [Product Brief](../_bmad-output/planning-artifacts/product-brief-lja-community-2026-02-27.md)
- [PRD](../_bmad-output/planning-artifacts/prd.md)
- [Blueprint](../docs/lja-community-blueprint.md)

---

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase instance

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

## Quick Reference

| Item | Location |
|------|----------|
| Frontend Entry | `lja-community-frontend/pages/index.vue` |
| Backend Entry | `lja-community-backend/src/main.ts` |
| API Docs | `http://localhost:3000/api` |
| Database Schema | [Data Models](./data-models.md) |
| API Endpoints | [API Contracts](./api-contracts-backend.md) |
