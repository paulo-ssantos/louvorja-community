import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class DeveloperService {
  constructor(private supabase: SupabaseService) {}

  async findAll() {
    const { data, error } = await this.supabase.client
      .from('developer_projects')
      .select('*')
      .order('stars', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client
      .from('developer_projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async create(createProjectDto: any) {
    // Extract GitHub repo info and fetch initial data
    const githubUrl = createProjectDto.github_url;
    const repoPath = githubUrl.replace('https://github.com/', '').replace('http://github.com/', '');
    
    // Fetch GitHub data (in production, use GitHub API)
    // For now, create with initial data
    const { data, error } = await this.supabase.client
      .from('developer_projects')
      .insert([{
        ...createProjectDto,
        stars: 0,
        last_activity: new Date().toISOString(),
      }])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async refreshGitHubData(id: string) {
    // In production, fetch from GitHub API
    // For now, just return success
    return { success: true, message: 'GitHub data refresh not implemented yet' };
  }

  async remove(id: string) {
    const { error } = await this.supabase.client
      .from('developer_projects')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
    return { success: true };
  }
}
