export interface DeveloperProject {
  id: string;
  name: string;
  description: string | null;
  github_url: string;
  how_to_contribute: string | null;
  user_id: string | null;
  stars: number;
  last_activity: string | null;
  created_at: string;
}

export interface CreateDeveloperProjectDto {
  name: string;
  description?: string;
  github_url: string;
  how_to_contribute?: string;
  user_id?: string;
}

export interface UpdateDeveloperProjectDto {
  name?: string;
  description?: string;
  github_url?: string;
  how_to_contribute?: string;
}
