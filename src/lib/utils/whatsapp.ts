/**
 * WhatsApp utility functions
 */

import { BRAND } from '../config/brand';

interface WhatsAppLinkParams {
  productName: string;
  option?: string;
  price?: number;
}

export function buildWhatsAppLink(params?: WhatsAppLinkParams): string {
  const { number, defaultMessage } = BRAND.whatsapp;
  
  let message: string = defaultMessage;
  
  if (params) {
    const { productName, option, price } = params;
    const priceText = price ? ` - ${BRAND.texts.currency}${price}` : '';
    const optionText = option ? ` (${option})` : '';
    message = `Hola, me interesa el producto: ${productName}${optionText}${priceText}`;
  }
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
}
