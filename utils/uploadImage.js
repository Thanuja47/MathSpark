/**
 * uploadImage(file) — uploads a File to Supabase Storage via our secure server route.
 * Returns the public URL string, or throws on error.
 *
 * Usage:
 *   import { uploadImage } from '@/utils/uploadImage';
 *   const url = await uploadImage(file);
 */
export async function uploadImage(file) {
  if (!file) throw new Error('No file provided');

  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || data.error) {
    throw new Error(data.error || 'Image upload failed');
  }

  return data.url;
}
