import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload a File object directly to Supabase Storage.
 * @param {File} file
 * @param {string} bucket - 'portfolio-images' or 'blog-images'
 * @param {string} [folder=''] - subfolder in bucket
 * @returns {Promise<string>} Public URL
 */
export async function uploadFile(file, bucket, folder = '') {
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${folder ? folder + '/' : ''}${uuidv4()}.${ext}`;

    const { error } = await supabase.storage.from(bucket).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
    });
    if (error) throw new Error(`Upload failed: ${error.message}`);

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
}
