/**
 * Brand configuration tokens
 * Single source of truth for brand-related constants
 */

export const BRAND = {
  name: 'LOS MEJORES SUEÑOS',
  tagline: 'Colchones y almohadas para un descanso perfecto',
  
  // Logo
  logo: '/images/logos/logo-mejores-suenos.png',
  
  // WhatsApp configuration
  whatsapp: {
    number: '593978906210',
    defaultMessage: 'Hola, me interesa un producto de Los Mejores Sueños',
  },
  
  // Fixed texts
  texts: {
    shippingIncluded: 'El precio incluye envío a nivel nacional.',
    currency: '$',
  },
  
  // Category identifiers
  categories: {
    colchones: 'colchones',
    almohadas: 'almohadas',
  },
  
  // Banner images
  banners: {
    colchones: '/images/logos/banner-colchones.png',
    almohadas: '/images/logos/banner-almohadas.png',
  },
} as const;

export type CategoryId = typeof BRAND.categories[keyof typeof BRAND.categories];
