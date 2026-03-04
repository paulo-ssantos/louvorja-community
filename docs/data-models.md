# Data Models - LouvorJA Community

**Database:** Supabase (PostgreSQL)  
**Generated:** 2026-03-03

---

## Tables

### profiles

User profiles linked to Supabase Auth.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | References auth.users |
| username | text | | User display name |
| bio | text | | User biography |
| church | text | | User's church |
| avatar_url | text | | Profile image URL |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | | Last update timestamp |

---

### collections

LJA collections uploaded by users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Auto-generated |
| name | text | NOT NULL | Collection name |
| description | text | | Collection description |
| category | text | | Category (Worship, Praise, etc.) |
| file_url | text | NOT NULL | Supabase Storage URL |
| user_id | uuid | REFERENCES profiles(id) | Owner |
| song_count | integer | DEFAULT 0 | Number of songs |
| upvotes | integer | DEFAULT 0 | Upvote count |
| rating | float | | Average rating |
| created_at | timestamp | DEFAULT now() | Creation timestamp |
| updated_at | timestamp | | Last update timestamp |

---

### collection_upvotes

Tracks which users upvoted which collections.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Auto-generated |
| collection_id | uuid | REFERENCES collections(id) | Collection |
| user_id | uuid | REFERENCES profiles(id) | User |
| created_at | timestamp | DEFAULT now() | Timestamp |

**Unique constraint:** (collection_id, user_id)

---

### collection_ratings

User ratings for collections (1-5 stars).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Auto-generated |
| collection_id | uuid | REFERENCES collections(id) | Collection |
| user_id | uuid | REFERENCES profiles(id) | User |
| rating | integer | NOT NULL, 1-5 | Rating value |
| created_at | timestamp | DEFAULT now() | Timestamp |

**Unique constraint:** (collection_id, user_id)

---

### tools

Tool/website listings.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Auto-generated |
| name | text | NOT NULL | Tool name |
| description | text | | Tool description |
| category | text | | Category (Image, Video, etc.) |
| url | text | NOT NULL | External URL |
| author | text | | Tool author |
| user_id | uuid | REFERENCES profiles(id) | Submitter |
| clicks | integer | DEFAULT 0 | Click count |
| created_at | timestamp | DEFAULT now() | Creation timestamp |

---

### developer_projects

Open-source projects in Developer Hub.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | uuid | PRIMARY KEY | Auto-generated |
| name | text | NOT NULL | Project name |
| description | text | | Project description |
| language | text | | Programming language |
| repository_url | text | NOT NULL | GitHub URL |
| author | text | | Project author |
| user_id | uuid | REFERENCES profiles(id) | Submitter |
| stars | integer | DEFAULT 0 | GitHub stars |
| forks | integer | DEFAULT 0 | GitHub forks |
| last_activity | timestamp | | Last commit date |
| created_at | timestamp | DEFAULT now() | Creation timestamp |

---

## Storage Buckets

### collections

Stores uploaded LJA collection files.

| Setting | Value |
|---------|-------|
| Bucket Name | collections |
| Public | Yes |
| File Types | .zip, .rar, .7z |
| Max Size | 100MB |

**Path Structure:** `{user_id}/{timestamp}_{filename}`

---

## Row Level Security (RLS)

### profiles
- Users can read all profiles
- Users can update their own profile

### collections
- Everyone can read
- Users can create
- Users can update/delete their own

### collection_upvotes
- Users can read all
- Users can create/delete their own

### collection_ratings
- Users can read all
- Users can create/update their own

### tools
- Everyone can read
- Users can create
- Users can update/delete their own

### developer_projects
- Everyone can read
- Users can create
- Users can update/delete their own
