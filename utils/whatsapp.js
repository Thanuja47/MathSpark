import { SITE } from '@/lib/data';

/**
 * Generate formatted WhatsApp click-to-chat links
 */
export function getWhatsAppLink({ phone = SITE.whatsapp, message = '' }) {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMsg}`;
}

export function getOrderWhatsAppLink(trackingId, itemName) {
  const message = `Hello MathSpark Team, I am inquiring about my Tute Order status.\n\nTracking ID: ${trackingId}\nItem: ${itemName}`;
  return getWhatsAppLink({ message });
}

export function getClassReminderWhatsAppLink(courseTitle) {
  const message = `Hi Ishan Sir, I want to get WhatsApp reminders and Zoom link for: ${courseTitle}`;
  return getWhatsAppLink({ message });
}
