export interface Tool {
  id: string;
  name: string;
  description: string | null;
  category: string;
  url: string;
  user_id: string | null;
  clicks: number;
  created_at: string;
}

export interface CreateToolDto {
  name: string;
  description?: string;
  category: string;
  url: string;
  user_id?: string;
}

export interface UpdateToolDto {
  name?: string;
  description?: string;
  category?: string;
  url?: string;
}
