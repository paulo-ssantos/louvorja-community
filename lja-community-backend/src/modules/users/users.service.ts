import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(private supabase: SupabaseService) {}

  async getProfile(userId: string) {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      throw new Error(error.message);
    }
    
    // If no profile, create one
    if (!data) {
      return this.createProfile(userId);
    }
    
    return data;
  }

  async createProfile(userId: string) {
    const { data, error } = await this.supabase.client
      .from('profiles')
      .insert([{ 
        id: userId, 
        username: `user_${userId.slice(0, 8)}` 
      }])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async updateProfile(updateUserDto: any) {
    const { id, ...updateData } = updateUserDto;
    updateData.updated_at = new Date().toISOString();
    
    const { data, error } = await this.supabase.client
      .from('profiles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async getUserCollections(userId: string) {
    const { data, error } = await this.supabase.client
      .from('collections')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data;
  }

  async getUserStats(userId: string) {
    const [collections, tools, projects] = await Promise.all([
      this.supabase.client.from('collections').select('id', { count: 'exact' }).eq('user_id', userId),
      this.supabase.client.from('tools').select('id', { count: 'exact' }).eq('user_id', userId),
      this.supabase.client.from('developer_projects').select('id', { count: 'exact' }).eq('user_id', userId),
    ]);

    return {
      collectionsCount: collections.count || 0,
      toolsCount: tools.count || 0,
      projectsCount: projects.count || 0,
      totalContributions: (collections.count || 0) + (tools.count || 0) + (projects.count || 0),
    };
  }
}
