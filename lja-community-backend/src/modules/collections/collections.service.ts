import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class CollectionsService {
  constructor(private supabase: SupabaseService) {}

  async search(query: string) {
    const searchTerm = `%${query}%`;
    
    const [collections, tools, projects] = await Promise.all([
      this.supabase.client
        .from('collections')
        .select('id, name, description, category, created_at, upvotes')
        .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(10),
      this.supabase.client
        .from('tools')
        .select('id, name, description, category')
        .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(10),
      this.supabase.client
        .from('developer_projects')
        .select('id, name, description, language')
        .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
        .limit(10),
    ]);

    return {
      collections: collections.data || [],
      tools: tools.data || [],
      projects: projects.data || [],
    };
  }

  async findAll(category?: string, sort: 'recent' | 'popular' = 'recent') {
    let query = this.supabase.client.from('collections').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    if (sort === 'popular') {
      query = query.order('upvotes', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }
    
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase.client
      .from('collections')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async create(createCollectionDto: any) {
    const { data, error } = await this.supabase.client
      .from('collections')
      .insert([createCollectionDto])
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, updateCollectionDto: any) {
    const { data, error } = await this.supabase.client
      .from('collections')
      .update(updateCollectionDto)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase.client
      .from('collections')
      .delete()
      .eq('id', id);
    
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async upvote(collectionId: string, userId: string) {
    // Check if user already upvoted
    const { data: existing } = await this.supabase.client
      .from('collection_upvotes')
      .select('*')
      .eq('collection_id', collectionId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      // Already upvoted - remove upvote
      await this.supabase.client
        .from('collection_upvotes')
        .delete()
        .eq('collection_id', collectionId)
        .eq('user_id', userId);
      
      // Decrement count
      const { data: collection } = await this.supabase.client
        .from('collections')
        .select('upvotes')
        .eq('id', collectionId)
        .single();
      
      await this.supabase.client
        .from('collections')
        .update({ upvotes: (collection?.upvotes || 1) - 1 })
        .eq('id', collectionId);
      
      return { upvoted: false };
    }

    // Add upvote
    await this.supabase.client
      .from('collection_upvotes')
      .insert([{ collection_id: collectionId, user_id: userId }]);

    // Increment count
    const { data: collection } = await this.supabase.client
      .from('collections')
      .select('upvotes')
      .eq('id', collectionId)
      .single();

    await this.supabase.client
      .from('collections')
      .update({ upvotes: (collection?.upvotes || 0) + 1 })
      .eq('id', collectionId);

    return { upvoted: true };
  }

  async getTopByCategory(category: string) {
    const { data, error } = await this.supabase.client
      .from('collections')
      .select('*')
      .eq('category', category)
      .order('upvotes', { ascending: false })
      .limit(5);

    if (error) throw new Error(error.message);
    return data;
  }

  async rate(collectionId: string, userId: string, rating: number) {
    const { data: existing } = await this.supabase.client
      .from('collection_ratings')
      .select('*')
      .eq('collection_id', collectionId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      await this.supabase.client
        .from('collection_ratings')
        .update({ rating })
        .eq('collection_id', collectionId)
        .eq('user_id', userId);
    } else {
      await this.supabase.client
        .from('collection_ratings')
        .insert([{ collection_id: collectionId, user_id: userId, rating }]);
    }

    const { data: ratings } = await this.supabase.client
      .from('collection_ratings')
      .select('rating')
      .eq('collection_id', collectionId);

    const avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    
    await this.supabase.client
      .from('collections')
      .update({ rating: avgRating })
      .eq('id', collectionId);

    return { averageRating: avgRating, count: ratings.length };
  }
}
