export interface Collection {
  id: string;
  name: string;
  description: string | null;
  category: string;
  user_id: string | null;
  file_url: string;
  upvotes: number;
  downloads: number;
  rating?: number;
  created_at: string;
  updated_at: string;
}

export interface CollectionUpvote {
  id: string;
  collection_id: string;
  user_id: string;
  created_at: string;
}

export interface CollectionRating {
  id: string;
  collection_id: string;
  user_id: string;
  rating: number;
}

export interface CreateCollectionDto {
  name: string;
  description?: string;
  category: string;
  file_url: string;
  user_id?: string;
}

export interface UpdateCollectionDto {
  name?: string;
  description?: string;
  category?: string;
  file_url?: string;
}
