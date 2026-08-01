import { supabase } from '@/lib/supabase';

export async function uploadImage(file) {
  if (!file) return null;

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
  const filePath = `courses/${fileName}`;

  const { data, error } = await supabase.storage
    .from('mathspark-images')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Error uploading image to Supabase Storage:', error);
    throw new Error('Image upload failed: ' + error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from('mathspark-images')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}
