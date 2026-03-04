# Development Guide - LouvorJA Community

**Generated:** 2026-03-03

---

## Prerequisites

- Node.js 18+
- npm or pnpm
- Supabase instance (local or hosted)

---

## Environment Setup

### Backend

Create `.env` file in `lja-community-backend/`:

```env
SUPABASE_URL=https://your-supabase-url.com
SUPABASE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### Frontend

Update `nuxt.config.ts` with your Supabase credentials:

```typescript
supabase: {
  url: 'https://your-supabase-url.com',
  key: 'your-anon-key',
  redirect: false,
}
```

---

## Installation

### Backend

```bash
cd lja-community-backend
npm install
```

### Frontend

```bash
cd lja-community-frontend
npm install
```

---

## Development Commands

### Backend

| Command | Description |
|---------|-------------|
| `npm run build` | Build the application |
| `npm run start` | Start production server |
| `npm run start:dev` | Start development server with hot reload |
| `npm run start:prod` | Start production build |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run build` | Build for production |
| `npm run dev` | Start development server |
| `npm run generate` | Generate static site |
| `npm run preview` | Preview production build |

---

## Running the Application

### Option 1: Separate terminals

**Terminal 1 - Backend:**
```bash
cd lja-community-backend
npm run start:dev
# API running at http://localhost:3000
# Swagger docs at http://localhost:3000/api
```

**Terminal 2 - Frontend:**
```bash
cd lja-community-frontend
npm run dev
# App running at http://localhost:3001
```

---

## Database Setup

### Supabase Migration

Run the migration in `supabase/migrations/001_initial_schema.sql`:

```bash
# Using Supabase CLI
supabase db push
```

Or execute the SQL directly in Supabase dashboard.

---

## Key Patterns

### Backend (NestJS)

**Service Pattern:**
```typescript
// modules/collections/collections.service.ts
@Injectable()
export class CollectionsService {
  constructor(private supabase: SupabaseService) {}

  async findAll() {
    return this.supabase.client.from('collections').select('*');
  }
}
```

**Controller Pattern:**
```typescript
// modules/collections/collections.controller.ts
@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get()
  async findAll() {
    return this.collectionsService.findAll();
  }
}
```

### Frontend (Nuxt)

**Page Pattern:**
```vue
<script setup>
const client = useSupabaseClient()
const user = useSupabaseUser()

const data = ref([])
async function fetchData() {
  const response = await fetch('http://localhost:3000/collections')
  data.value = await response.json()
}
onMounted(fetchData)
</script>

<template>
  <!-- Page content -->
</template>
```

---

## Testing

### Backend

```bash
npm run test
```

### Frontend

```bash
# No tests configured yet
```

---

## Building for Production

### Backend

```bash
cd lja-community-backend
npm run build
npm run start:prod
```

### Frontend

```bash
cd lja-community-frontend
npm run build
# Output in .output/
npm run preview
```

---

## Common Tasks

### Adding a new API endpoint

1. Create/update service in `src/modules/<module>/`
2. Create/update controller in `src/modules/<module>/`
3. Add route to module

### Adding a new page

1. Create `.vue` file in `pages/`
2. Add navigation link

### Adding database table

1. Create migration in `supabase/migrations/`
2. Update Supabase with new table
3. Add service/controller for CRUD

---

## Troubleshooting

### CORS errors

Ensure backend CORS is configured in `main.ts`:

```typescript
app.enableCors({
  origin: ['http://localhost:3001'],
  credentials: true,
});
```

### Supabase connection

Check `.env` file has correct:
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `SUPABASE_SERVICE_KEY`
