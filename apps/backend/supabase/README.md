# Supabase Database Setup

## Option 1: Using Supabase SQL Editor

1. Go to your Supabase dashboard: https://api-supabase-lja-community.ingriduzeda.com
2. Open the SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Run the SQL

## Option 2: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Run migrations
supabase db push
```

## Tables Created

- `profiles` - User profiles
- `collections` - LJA collections
- `collection_upvotes` - Upvote tracking
- `tools` - Tool/website listings
- `developer_projects` - Open source projects

## Row Level Security (RLS)

RLS is enabled on all tables with policies:
- Public read access
- Authenticated write access (users can only modify their own data)
