import { supabase } from './supabase';

/**
 * Upload a File object directly to Supabase Storage or fallback to base64.
 * @param {File} file
 * @param {string} bucket - 'portfolio-images' or 'blog-images'
 * @param {string} [folder=''] - subfolder in bucket
 * @returns {Promise<string>} Public URL
 */
export async function uploadFile(file, bucket = 'portfolio-images', folder = '') {
  if (supabase) {
    try {
      const ext = file.name.split('.').pop() || 'jpg';
      const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const path = `${folder ? folder + '/' : ''}${fileName}`;

      const { error } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

      if (!error) {
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        return data.publicUrl;
      }
    } catch (err) {
      console.warn('Supabase storage upload failed, using data URL fallback', err);
    }
  }

  // Base64 Data URL Fallback
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
