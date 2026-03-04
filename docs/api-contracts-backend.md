# API Contracts - Backend

**Base URL:** `http://localhost:3000`  
**Generated:** 2026-03-03

---

## Collections

### GET /collections

List all collections.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category |
| sort | string | Sort order: `recent`, `popular` |

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "category": "string",
    "file_url": "string",
    "user_id": "uuid",
    "song_count": "number",
    "upvotes": "number",
    "rating": "number",
    "created_at": "timestamp",
    "updated_at": "timestamp"
  }
]
```

---

### GET /collections/:id

Get collection by ID.

**Response:**
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "category": "string",
  "file_url": "string",
  "user_id": "uuid",
  "song_count": "number",
  "upvotes": "number",
  "rating": "number",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

---

### POST /collections

Create new collection.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "category": "string",
  "user_id": "uuid",
  "file_url": "string",
  "song_count": "number",
  "upvotes": "number"
}
```

---

### PUT /collections/:id

Update collection.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "category": "string"
}
```

---

### DELETE /collections/:id

Delete collection.

**Response:**
```json
{
  "success": true
}
```

---

### POST /collections/:id/upvote

Upvote a collection.

**Request Body:**
```json
{
  "userId": "uuid"
}
```

**Response:**
```json
{
  "upvoted": true
}
```

---

### POST /collections/:id/rate

Rate a collection.

**Request Body:**
```json
{
  "userId": "uuid",
  "rating": "number"
}
```

**Response:**
```json
{
  "averageRating": "number",
  "count": "number"
}
```

---

### GET /collections/search

Search across all content.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| q | string | Search query |

**Response:**
```json
{
  "collections": [...],
  "tools": [...],
  "projects": [...]
}
```

---

## Tools

### GET /tools

List all tools.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| category | string | Filter by category |

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "category": "string",
    "url": "string",
    "author": "string",
    "user_id": "uuid",
    "clicks": "number",
    "created_at": "timestamp"
  }
]
```

---

### GET /tools/:id

Get tool by ID.

---

### POST /tools

Create new tool.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "category": "string",
  "url": "string",
  "author": "string",
  "user_id": "uuid"
}
```

---

### POST /tools/:id/click

Track tool click.

**Response:**
```json
{
  "success": true
}
```

---

### DELETE /tools/:id

Delete tool.

---

## Developer Projects

### GET /developer/projects

List all projects.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "language": "string",
    "repository_url": "string",
    "author": "string",
    "user_id": "uuid",
    "stars": "number",
    "forks": "number",
    "created_at": "timestamp"
  }
]
```

---

### GET /developer/projects/:id

Get project by ID.

---

### POST /developer/projects

Create new project.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "language": "string",
  "repository_url": "string",
  "author": "string",
  "user_id": "uuid"
}
```

---

### DELETE /developer/projects/:id

Delete project.

---

### GET /developer/projects/:id/refresh

Refresh GitHub data.

---

## Users

### GET /users/:id

Get user profile.

**Response:**
```json
{
  "id": "uuid",
  "username": "string",
  "bio": "string",
  "church": "string",
  "avatar_url": "string",
  "created_at": "timestamp"
}
```

---

### GET /users/me

Get current user profile.

**Request Body:**
```json
{
  "userId": "uuid"
}
```

---

### PUT /users/me

Update current user profile.

**Request Body:**
```json
{
  "id": "uuid",
  "username": "string",
  "bio": "string",
  "church": "string"
}
```

---

### GET /users/:id/collections

Get user collections.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "string",
    "description": "string",
    "category": "string",
    "upvotes": "number",
    "created_at": "timestamp"
  }
]
```
