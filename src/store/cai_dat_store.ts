// Zustand store — Quản lý Cài Đặt (Ngôn Ngữ, Cỡ Chữ)
import { create } from 'zustand';

export type NgonNgu = 'Tiếng Việt' | 'English';
export type CoChu = 'Nhỏ' | 'Bình thường' | 'Lớn';

interface CaiDatState {
    ngon_ngu: NgonNgu;
    co_chu: CoChu;
    datNgonNgu: (nn: NgonNgu) => void;
    datCoChu: (cc: CoChu) => void;
}

export const useCaiDatStore = create<CaiDatState>((set) => ({
    ngon_ngu: 'Tiếng Việt',
    co_chu: 'Bình thường',

    datNgonNgu: (nn) => {
        set({ ngon_ngu: nn });
    },

    datCoChu: (cc) => {
        set({ co_chu: cc });
    },
}));
