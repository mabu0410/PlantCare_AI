// File Upload & Storage Service using Supabase Storage
import { supabase, STORAGE_BUCKETS, getPublicUrl } from './supabase';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

interface UploadResult {
    success: boolean;
    url?: string;
    path?: string;
    error?: string;
}

class StorageService {
    // Upload ảnh scan
    async uploadScanImage(uri: string, userId: string): Promise<UploadResult> {
        try {
            const fileName = `${userId}/${Date.now()}.jpg`;
            return await this.uploadImage(uri, STORAGE_BUCKETS.SCANS, fileName);
        } catch (error: any) {
            console.error('Upload scan image error:', error);
            return {
                success: false,
                error: error.message || 'Upload failed',
            };
        }
    }

    // Upload ảnh cây trong nhật ký
    async uploadPlantImage(uri: string, userId: string): Promise<UploadResult> {
        try {
            const fileName = `${userId}/${Date.now()}.jpg`;
            return await this.uploadImage(uri, STORAGE_BUCKETS.PLANTS, fileName);
        } catch (error: any) {
            console.error('Upload plant image error:', error);
            return {
                success: false,
                error: error.message || 'Upload failed',
            };
        }
    }

    // Upload avatar
    async uploadAvatar(uri: string, userId: string): Promise<UploadResult> {
        try {
            const fileName = `${userId}/avatar.jpg`;
            // Xóa avatar cũ nếu có
            await supabase.storage.from(STORAGE_BUCKETS.AVATARS).remove([fileName]);
            return await this.uploadImage(uri, STORAGE_BUCKETS.AVATARS, fileName);
        } catch (error: any) {
            console.error('Upload avatar error:', error);
            return {
                success: false,
                error: error.message || 'Upload failed',
            };
        }
    }

    // Core upload function
    private async uploadImage(uri: string, bucket: string, fileName: string): Promise<UploadResult> {
        try {
            // Đọc file từ URI
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });

            // Convert base64 to ArrayBuffer
            const arrayBuffer = decode(base64);

            // Upload to Supabase
            const { data, error } = await supabase.storage
                .from(bucket)
                .upload(fileName, arrayBuffer, {
                    contentType: 'image/jpeg',
                    upsert: true,
                });

            if (error) throw error;

            const publicUrl = getPublicUrl(bucket, fileName);

            return {
                success: true,
                url: publicUrl,
                path: data.path,
            };
        } catch (error: any) {
            console.error('Upload error:', error);
            return {
                success: false,
                error: error.message || 'Upload failed',
            };
        }
    }

    // Xóa file
    async deleteFile(bucket: string, path: string): Promise<{ success: boolean; error?: string }> {
        try {
            const { error } = await supabase.storage.from(bucket).remove([path]);
            if (error) throw error;
            return { success: true };
        } catch (error: any) {
            console.error('Delete file error:', error);
            return {
                success: false,
                error: error.message || 'Delete failed',
            };
        }
    }

    // Xóa nhiều files
    async deleteFiles(bucket: string, paths: string[]): Promise<{ success: boolean; error?: string }> {
        try {
            const { error } = await supabase.storage.from(bucket).remove(paths);
            if (error) throw error;
            return { success: true };
        } catch (error: any) {
            console.error('Delete files error:', error);
            return {
                success: false,
                error: error.message || 'Delete failed',
            };
        }
    }

    // List files trong bucket
    async listFiles(bucket: string, folder: string = '') {
        try {
            const { data, error } = await supabase.storage.from(bucket).list(folder);
            if (error) throw error;
            return { success: true, files: data };
        } catch (error: any) {
            console.error('List files error:', error);
            return {
                success: false,
                error: error.message || 'List failed',
            };
        }
    }

    // Get public URL
    getPublicUrl(bucket: string, path: string): string {
        return getPublicUrl(bucket, path);
    }
}

export const storageService = new StorageService();
