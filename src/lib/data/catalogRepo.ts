import { supabase } from './supabaseClient';
import type { CatalogRepo, Category, Product } from './types';

function mapProduct(row: any): Product {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    categoryId: row.category_id,
    options: Array.isArray(row.options)
      ? row.options
      : [],
    imageUrl: row.image_url || '',
    isActive: row.is_active === true,
  };
}

function mapCategory(row: any): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
  };
}

export class SupabaseCatalogRepo implements CatalogRepo {
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('id, name, slug')
      .order('name');
    if (error) throw error;
    return Array.isArray(data) ? data.map(mapCategory) : [];
  }
  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('slug, name, description, category_id, options, image_url, is_active')
      .eq('category_id', categoryId)
      .eq('is_active', true)
      .order('name');
    if (error) throw error;
    return Array.isArray(data) ? data.map(mapProduct) : [];
  }
  async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('slug, name, description, category_id, options, image_url, is_active')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
    if (error && error.details !== '0 rows') throw error;
    return data ? mapProduct(data) : null;
  }
  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('slug, name, description, category_id, options, image_url, is_active')
      .eq('is_active', true)
      .order('name');
    if (error) throw error;
    return Array.isArray(data) ? data.map(mapProduct) : [];
  }

  async updateProductActiveState(slug: string, isActive: boolean): Promise<void> {
    const { error } = await supabase
      .from('products')
      .update({ is_active: isActive })
      .eq('slug', slug);
    if (error) throw error;
  }
}

export const catalogRepo = new SupabaseCatalogRepo();
