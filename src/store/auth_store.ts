// Zustand store — Auth (mock)
import { create } from 'zustand';
import { NguoiDung } from '../types/kieu_du_lieu';
import { NGUOI_DUNG_MAU } from '../utils/du_lieu_mau';

interface AuthState {
    nguoi_dung: NguoiDung | null;
    da_dang_nhap: boolean;
    da_xem_onboarding: boolean;
    dang_tai: boolean;
    dangNhap: (email: string, mat_khau: string) => Promise<boolean>;
    dangKy: (ten: string, email: string, mat_khau: string) => Promise<boolean>;
    dangXuat: () => void;
    datDaXemOnboarding: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    nguoi_dung: null,
    da_dang_nhap: false,
    da_xem_onboarding: false,
    dang_tai: false,

    dangNhap: async (_email: string, _mat_khau: string) => {
        set({ dang_tai: true });
        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        set({
            nguoi_dung: NGUOI_DUNG_MAU,
            da_dang_nhap: true,
            dang_tai: false,
        });
        return true;
    },

    dangKy: async (ten: string, email: string, _mat_khau: string) => {
        set({ dang_tai: true });
        await new Promise(resolve => setTimeout(resolve, 1500));
        set({
            nguoi_dung: { ...NGUOI_DUNG_MAU, ten, email },
            da_dang_nhap: true,
            dang_tai: false,
        });
        return true;
    },

    dangXuat: () => {
        set({ nguoi_dung: null, da_dang_nhap: false });
    },

    datDaXemOnboarding: () => {
        set({ da_xem_onboarding: true });
    },
}));
