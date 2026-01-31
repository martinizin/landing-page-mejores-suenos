/**
 * Product and Catalog type definitions
 * Following Interface Segregation Principle
 */

export interface ProductOption {
  label: string;
  price: number;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  options: ProductOption[];
  imageUrl: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

/**
 * Catalog Repository Interface
 * Allows swapping between mock and real data sources (Open/Closed Principle)
 */
export interface CatalogRepo {
  getCategories(): Promise<Category[]>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getAllProducts(): Promise<Product[]>;
  updateProductActiveState(slug: string, isActive: boolean): Promise<void>;
}
