// Real Authentication Service using Supabase Auth
import { supabase } from './supabase';
import { NguoiDung } from '../types/kieu_du_lieu';

export interface DangKyData {
    email: string;
    password: string;
    fullName: string;
}

export interface DangNhapData {
    email: string;
    password: string;
}

class AuthService {
    // Đăng ký người dùng mới
    async dangKy(data: DangKyData): Promise<{ success: boolean; user?: NguoiDung; error?: string }> {
        try {
            const { data: authData, error: signUpError } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        full_name: data.fullName,
                    },
                },
            });

            if (signUpError) throw signUpError;
            if (!authData.user) throw new Error('Không thể tạo tài khoản');

            // Tạo profile
            const { error: profileError } = await supabase
                .from('user_profiles')
                .insert({
                    id: authData.user.id,
                    full_name: data.fullName,
                    language: 'Tiếng Việt',
                    font_size: 'Bình thường',
                    theme: 'toi',
                });

            if (profileError) {
                console.error('Error creating profile:', profileError);
            }

            // Tạo notification preferences
            await supabase
                .from('notification_preferences')
                .insert({
                    user_id: authData.user.id,
                    push_enabled: true,
                    email_enabled: false,
                });

            return {
                success: true,
                user: this.mapToNguoiDung(authData.user, data.fullName),
            };
        } catch (error: any) {
            console.error('Đăng ký lỗi:', error);
            return {
                success: false,
                error: error.message || 'Đăng ký thất bại',
            };
        }
    }

    // Đăng nhập
    async dangNhap(data: DangNhapData): Promise<{ success: boolean; user?: NguoiDung; error?: string }> {
        try {
            const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (signInError) throw signInError;
            if (!authData.user) throw new Error('Đăng nhập thất bại');

            // Lấy profile
            const { data: profile } = await supabase
                .from('user_profiles')
                .select('full_name, avatar_url')
                .eq('id', authData.user.id)
                .single();

            return {
                success: true,
                user: this.mapToNguoiDung(authData.user, profile?.full_name, profile?.avatar_url),
            };
        } catch (error: any) {
            console.error('Đăng nhập lỗi:', error);
            return {
                success: false,
                error: error.message || 'Đăng nhập thất bại',
            };
        }
    }

    // Đăng xuất
    async dangXuat(): Promise<{ success: boolean; error?: string }> {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { success: true };
        } catch (error: any) {
            console.error('Đăng xuất lỗi:', error);
            return {
                success: false,
                error: error.message || 'Đăng xuất thất bại',
            };
        }
    }

    // Lấy session hiện tại
    async getCurrentSession() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error) throw error;
            return session;
        } catch (error) {
            console.error('Lấy session lỗi:', error);
            return null;
        }
    }

    // Lấy user hiện tại
    async getCurrentUser(): Promise<NguoiDung | null> {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;
            if (!user) return null;

            // Lấy profile
            const { data: profile } = await supabase
                .from('user_profiles')
                .select('full_name, avatar_url')
                .eq('id', user.id)
                .single();

            return this.mapToNguoiDung(user, profile?.full_name, profile?.avatar_url);
        } catch (error) {
            console.error('Lấy user lỗi:', error);
            return null;
        }
    }

    // Cập nhật profile
    async capNhatProfile(updates: {
        full_name?: string;
        avatar_url?: string;
        bio?: string;
    }): Promise<{ success: boolean; error?: string }> {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Chưa đăng nhập');

            const { error } = await supabase
                .from('user_profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;
            return { success: true };
        } catch (error: any) {
            console.error('Cập nhật profile lỗi:', error);
            return {
                success: false,
                error: error.message || 'Cập nhật thất bại',
            };
        }
    }

    // Đổi mật khẩu
    async doiMatKhau(newPassword: string): Promise<{ success: boolean; error?: string }> {
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) throw error;
            return { success: true };
        } catch (error: any) {
            console.error('Đổi mật khẩu lỗi:', error);
            return {
                success: false,
                error: error.message || 'Đổi mật khẩu thất bại',
            };
        }
    }

    // Reset password
    async resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: 'plantcare://reset-password',
            });

            if (error) throw error;
            return { success: true };
        } catch (error: any) {
            console.error('Reset password lỗi:', error);
            return {
                success: false,
                error: error.message || 'Gửi email thất bại',
            };
        }
    }

    // Helper: Map Supabase user to NguoiDung
    private mapToNguoiDung(user: any, fullName?: string, avatarUrl?: string): NguoiDung {
        return {
            id: user.id,
            ten: fullName || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            email: user.email || '',
            anh_dai_dien: avatarUrl,
            ngay_tao: user.created_at,
        };
    }

    // Listen to auth state changes
    onAuthStateChange(callback: (user: NguoiDung | null) => void) {
        return supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                const user = await this.getCurrentUser();
                callback(user);
            } else {
                callback(null);
            }
        });
    }
}

export const authService = new AuthService();
