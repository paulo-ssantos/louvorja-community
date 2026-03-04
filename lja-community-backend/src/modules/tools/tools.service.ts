import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class ToolsService {
  constructor(private supabase: SupabaseService) {}

  async findAll(category?: string) {
    let query = this.supabase.client.from('tools').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query.order('clicks', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client
      .from('tools')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async create(createToolDto: any) {
    const { data, error } = await this.supabase.client
      .from('tools')
      .insert([createToolDto])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async trackClick(id: string) {
    const { data: tool } = await this.supabase.client
      .from('tools')
      .select('clicks')
      .eq('id', id)
      .single();

    await this.supabase.client
      .from('tools')
      .update({ clicks: (tool?.clicks || 0) + 1 })
      .eq('id', id);

    return { success: true };
  }

  async remove(id: string) {
    const { error } = await this.supabase.client
      .from('tools')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
    return { success: true };
  }
}
