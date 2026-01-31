/**
 * Mock Catalog Data
 * Based on inventario.txt - serves as data source for Phase 1-2
 * Total: 14 colchones + 11 almohadas = 25 productos
 */

import type { Product, Category, CatalogRepo } from './types';
import { BRAND } from '../config/brand';
import { generateSlug } from '../utils/slug';
import { getProductImage } from '../utils/images';

// Categories
const categories: Category[] = [
  { id: BRAND.categories.colchones, name: 'Colchones', slug: 'colchones' },
  { id: BRAND.categories.almohadas, name: 'Almohadas', slug: 'almohadas' },
];

/**
 * Helper to create product with auto-resolved image
 */
function createProduct(
  name: string,
  description: string,
  categoryId: string,
  options: { label: string; price: number }[],
  slugOverride?: string
): Product {
  const slug = slugOverride ?? generateSlug(name);
  return {
    slug,
    name,
    description,
    categoryId,
    options,
    imageUrl: getProductImage(slug),
    isActive: true,
  };
}

// Products data from inventario.txt
const products: Product[] = [
  // ==================== COLCHONES (14) ====================
  
  createProduct(
    'Alternativa',
    'Colchón económico ideal para todo tipo de uso. Excelente relación calidad-precio.',
    BRAND.categories.colchones,
    [
      { label: '1 Plaza', price: 65 },
      { label: '1 ½ Plaza', price: 70 },
      { label: '2 Plazas', price: 81 },
    ]
  ),

  createProduct(
    'Zafiro 24cm',
    'Colchón Zafiro con altura de 24cm para mayor comodidad y soporte.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 73 },
      { label: '2 Plazas', price: 87 },
    ]
  ),

  createProduct(
    'Zafiro 29cm',
    'Colchón Zafiro premium con altura de 29cm para máximo confort.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 85 },
      { label: '2 Plazas', price: 100 },
      { label: '2 ½ Plazas', price: 125 },
    ]
  ),

  createProduct(
    'Imperial 23',
    'Línea Imperial con diseño clásico y soporte firme. Altura de 23cm.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 100 },
      { label: '2 Plazas', price: 120 },
    ]
  ),

  createProduct(
    'Imperial 30',
    'Línea Imperial premium con altura de 30cm para máximo lujo y descanso.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 105 },
      { label: '2 Plazas', price: 130 },
      { label: '2 ½ Plazas', price: 160 },
      { label: '3 Plazas', price: 200 },
    ]
  ),

  createProduct(
    'Suave Brisa',
    'Colchón con tecnología de ventilación para un descanso fresco y confortable.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 135 },
      { label: '2 Plazas', price: 170 },
      { label: '2 ½ Plazas', price: 205 },
    ]
  ),

  createProduct(
    'Continental de Lujo Tradicional',
    'Colchón de lujo con diseño tradicional y máxima durabilidad.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 145 },
      { label: '2 Plazas', price: 185 },
      { label: '2 ½ Plazas', price: 225 },
      { label: '3 Plazas', price: 290 },
    ]
  ),

  createProduct(
    'Continental de Lujo Pillow Top',
    'Colchón de lujo con capa Pillow Top para suavidad extra en la superficie.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 160 },
      { label: '2 Plazas', price: 205 },
      { label: '2 ½ Plazas', price: 255 },
      { label: '3 Plazas', price: 320 },
    ]
  ),

  createProduct(
    'Dream Box Soft',
    'Colchón en caja con sensación suave y adaptable. Fácil transporte.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 185 },
      { label: '2 Plazas', price: 230 },
      { label: '2 ½ Plazas', price: 270 },
      { label: '3 Plazas', price: 325 },
    ]
  ),

  createProduct(
    'Continental de Lujo FB',
    'Colchón Continental de Lujo con tecnología FB para soporte optimizado.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 195 },
      { label: '2 Plazas', price: 230 },
      { label: '2 ½ Plazas', price: 275 },
      { label: '3 Plazas', price: 330 },
    ]
  ),

  createProduct(
    'Fussion',
    'Colchón premium que fusiona tecnologías avanzadas para el mejor descanso.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 215 },
      { label: '2 Plazas', price: 265 },
      { label: '2 ½ Plazas', price: 330 },
      { label: '3 Plazas', price: 425 },
    ]
  ),

  createProduct(
    'Dream Box MF',
    'Colchón en caja con Memory Foam para adaptación perfecta al cuerpo.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 220 },
      { label: '2 Plazas', price: 275 },
      { label: '2 ½ Plazas', price: 315 },
      { label: '3 Plazas', price: 385 },
    ]
  ),

  createProduct(
    'Prensado Clínico',
    'Colchón con firmeza clínica ideal para soporte ortopédico.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 135 },
      { label: '2 Plazas', price: 170 },
      { label: '2 ½ Plazas', price: 205 },
      { label: '3 Plazas', price: 255 },
    ],
    'prensado-clinico' // Override slug to match image file
  ),

  createProduct(
    'Restapedic',
    'Colchón ortopédico diseñado para aliviar puntos de presión y mejorar el descanso.',
    BRAND.categories.colchones,
    [
      { label: '1 ½ Plaza', price: 140 },
      { label: '2 Plazas', price: 175 },
      { label: '2 ½ Plazas', price: 210 },
      { label: '3 Plazas', price: 265 },
    ]
  ),

  // ==================== ALMOHADAS (11) ====================

  createProduct(
    'Almohada Low Back Bamboo',
    'Almohada de bambú para soporte lumbar. Ideal para aliviar dolores de espalda.',
    BRAND.categories.almohadas,
    [{ label: '33cm x 32cm', price: 23.64 }]
  ),

  createProduct(
    'Almohada Cervical Memory Foam Fresh',
    'Almohada cervical con espuma de memoria y tecnología Fresh para frescura.',
    BRAND.categories.almohadas,
    [{ label: '61cm x 38cm', price: 36.02 }]
  ),

  createProduct(
    'Almohada Memory Foam King Fresh',
    'Almohada King size con espuma de memoria y tecnología Fresh.',
    BRAND.categories.almohadas,
    [{ label: '61cm x 38cm', price: 45.72 }]
  ),

  createProduct(
    'Almohada Cervical Fresh Air',
    'Almohada cervical con tecnología Fresh Air para máxima ventilación.',
    BRAND.categories.almohadas,
    [{ label: '60cm x 38cm', price: 36.89 }]
  ),

  createProduct(
    'Almohada Antireflujo Vita Pillow',
    'Almohada con inclinación especial para prevenir el reflujo gastroesofágico.',
    BRAND.categories.almohadas,
    [{ label: '65cm x 68cm x 17cm', price: 44.15 }]
  ),

  createProduct(
    'Almohada Memory Foam Lavanda',
    'Almohada con espuma de memoria y esencia de lavanda para relajación.',
    BRAND.categories.almohadas,
    [{ label: '62cm x 42cm x 14cm', price: 28.62 }]
  ),

  createProduct(
    'Almohada Memory Foam Manzanilla',
    'Almohada con espuma de memoria y esencia de manzanilla para un sueño tranquilo.',
    BRAND.categories.almohadas,
    [{ label: '62cm x 42cm x 14cm', price: 28.62 }]
  ),

  createProduct(
    'Almohada Dual Confort',
    'Almohada con dos niveles de firmeza para adaptarse a tu preferencia.',
    BRAND.categories.almohadas,
    [{ label: '60cm x 40cm', price: 27.57 }]
  ),

  createProduct(
    'Almohada Aurora Soft',
    'Almohada suave y económica, ideal para uso diario.',
    BRAND.categories.almohadas,
    [{ label: '60cm x 40cm', price: 4.99 }]
  ),

  createProduct(
    'Almohada Chaide Rubí',
    'Almohada clásica de la línea Rubí con excelente relación calidad-precio.',
    BRAND.categories.almohadas,
    [{ label: '70cm x 50cm', price: 6.45 }],
    'almohada-chaide-rubi' // Override slug to match image file
  ),

  createProduct(
    'Almohada Hotelera',
    'Almohada de calidad hotelera disponible en dos tamaños.',
    BRAND.categories.almohadas,
    [
      { label: '70cm x 50cm', price: 10.85 },
      { label: '90cm x 50cm', price: 10.85 },
    ]
  ),

  // === NUEVO MODELO 12: Almohada Modelo Bianca ===
  createProduct(
    'Almohada Modelo Bianca',
    'Almohada de espuma viscoelástica, diseño ergonómico para máximo confort.',
    BRAND.categories.almohadas,
    [
      { label: '60cm x 40cm', price: 4.35 }
    ],
    'almohada-modelo-bianca' // slug explícito para coincidir con la imagen
  ),
];

/**
 * Mock Catalog Repository Implementation
 * Implements CatalogRepo interface for Phase 1-2
 */
export class MockCatalogRepo implements CatalogRepo {
  async getCategories(): Promise<Category[]> {
    return categories;
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return products.filter(p => p.categoryId === categoryId && p.isActive);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return products.find(p => p.slug === slug && p.isActive) ?? null;
  }

  async getAllProducts(): Promise<Product[]> {
    return products.filter(p => p.isActive);
  }

  async updateProductActiveState(slug: string, isActive: boolean): Promise<void> {
    const product = products.find(p => p.slug === slug);
    if (product) {
      product.isActive = isActive;
    }
  }
}

// Singleton instance for easy import
export const catalogRepo = new MockCatalogRepo();

// Direct exports for static generation
export { products, categories };
