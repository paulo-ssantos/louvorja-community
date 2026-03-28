export interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateProfileDto {
  username: string;
  avatar_url?: string;
}

export interface UpdateProfileDto {
  username?: string;
  avatar_url?: string;
}
