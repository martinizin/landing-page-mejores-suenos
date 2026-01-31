/**
 * Image utilities and mappings
 * Centralizes image path resolution and provides WebP migration strategy
 * 
 * WEBP MIGRATION STRATEGY:
 * ========================
 * When ready to optimize images:
 * 
 * 1. Convert PNGs to WebP using CLI tools (no dependencies needed):
 *    - Using cwebp (Google's WebP converter):
 *      for f in public/images/**\/*.png; do cwebp -q 80 "$f" -o "${f%.png}.webp"; done
 *    - Or using ImageMagick:
 *      for f in public/images/**\/*.png; do convert "$f" "${f%.png}.webp"; done
 * 
 * 2. Update this file: change IMAGE_EXTENSION from 'png' to 'webp'
 * 
 * 3. For progressive enhancement with fallback:
 *    - Use <picture> element with <source> for webp and <img> for png fallback
 *    - The ProductImage component below supports this pattern
 * 
 * 4. Consider Cloudflare Image Resizing in production:
 *    - Automatic WebP conversion based on Accept header
 *    - On-the-fly resizing for responsive images
 *    - No build-time processing needed
 */

// Current image format - change to 'webp' after conversion
export const IMAGE_EXTENSION = 'png' as const;

// Placeholder for missing images (inline SVG data URI)
export const PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23D5D7D6' width='400' height='300'/%3E%3Ctext fill='%23677789' x='50%25' y='50%25' text-anchor='middle' dy='.3em' font-family='sans-serif' font-size='16'%3EImagen no disponible%3C/text%3E%3C/svg%3E";

/**
 * Image paths mapped by product slug
 * This allows decoupling product data from image file naming conventions
 */
export const PRODUCT_IMAGES: Record<string, string> = {
  // Colchones
  'alternativa': '/images/colchones/colchon-modelo-alternativa.png',
  'zafiro-24cm': '/images/colchones/colchon-modelo-zafiro-24cm.png',
  'zafiro-29cm': '/images/colchones/colchon-modelo-zafiro-29cm.png',
  'imperial-23': '/images/colchones/colchon-modelo-imperial-23.png',
  'imperial-30': '/images/colchones/colchon-modelo-imperial-30.png',
  'suave-brisa': '/images/colchones/colchon-modelo-suave-brisa.png',
  'continental-de-lujo-tradicional': '/images/colchones/colchon-modelo-continental-lujo-tradicional.png',
  'continental-de-lujo-pillow-top': '/images/colchones/colchon-modelo-continental-lujo-pillow-top.png',
  'dream-box-soft': '/images/colchones/colchon-modelo-dream-box-soft.png',
  'continental-de-lujo-fb': '/images/colchones/colchon-modelo-continental-fb.png',
  'fussion': '/images/colchones/colchon-modelo-fussion.png',
  'dream-box-mf': '/images/colchones/colchon-modelo-dream-box-mf.png',
  'prensado-clinico': '/images/colchones/colchon-modelo-prensado-clinico.png',
  'restapedic': '/images/colchones/colchon-modelo-restapedic.png',
  
  // Almohadas
  'almohada-low-back-bamboo': '/images/almohadas/almohada-modelo-low-back-bamboo.png',
  'almohada-cervical-memory-foam-fresh': '/images/almohadas/almohada-modelo-cervical-memory-foam-fresh.png',
  'almohada-memory-foam-king-fresh': '/images/almohadas/almohada-modelo-memory-foam-king-fresh.png',
  'almohada-cervical-fresh-air': '/images/almohadas/almohada-modelo-cervical-fresh-air.png',
  'almohada-antireflujo-vita-pillow': '/images/almohadas/almohada-modelo-antireflujo-vita-pillow.png',
  'almohada-memory-foam-lavanda': '/images/almohadas/almohada-modelo-memory-foam-lavanda.png',
  'almohada-memory-foam-manzanilla': '/images/almohadas/almohada-modelo-memory-foam-manzanilla.png',
  'almohada-dual-confort': '/images/almohadas/almohada-modelo-dual-confort.png',
  'almohada-aurora-soft': '/images/almohadas/almohada-modelo-aurora-soft.png',
  'almohada-chaide-rubi': '/images/almohadas/almohada-modelo-rubi.png',
  'almohada-hotelera': '/images/almohadas/almohada-modelo-hotelera.png',
  'almohada-modelo-bianca': '/images/almohadas/almohada-modelo-bianca.png',
};

/**
 * Get image URL for a product by slug
 * Returns placeholder if no image is mapped
 */
export function getProductImage(slug: string): string {
  return PRODUCT_IMAGES[slug] ?? PLACEHOLDER_IMAGE;
}

/**
 * Get WebP version of an image path (for future use)
 * Converts .png path to .webp
 */
export function getWebPPath(imagePath: string): string {
  return imagePath.replace(/\.png$/, '.webp');
}

/**
 * Image size presets for responsive images
 * Used with CSS aspect-ratio for consistent layouts
 */
export const IMAGE_SIZES = {
  // Product card in grid
  card: {
    aspectRatio: '4/3',
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  },
  // Product detail hero
  detail: {
    aspectRatio: '1/1',
    sizes: '(max-width: 1024px) 100vw, 50vw',
  },
  // Thumbnail
  thumbnail: {
    aspectRatio: '1/1',
    sizes: '80px',
  },
} as const;
