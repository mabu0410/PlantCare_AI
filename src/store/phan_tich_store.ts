// Zustand store — Phân tích
import { create } from 'zustand';
import { KetQuaPhanTich, ThongKe } from '../types/kieu_du_lieu';
import { LICH_SU_MAU, THONG_KE_MAU } from '../utils/du_lieu_mau';

interface PhanTichState {
    lich_su: KetQuaPhanTich[];
    ket_qua_hien_tai: KetQuaPhanTich | null;
    thong_ke: ThongKe;
    dang_phan_tich: boolean;
    anh_chup: string | null;

    datAnhChup: (uri: string) => void;
    batDauPhanTich: (anhUri: string) => Promise<KetQuaPhanTich>;
    xoaLichSu: (id: string) => void;
    xoaTatCa: () => void;
}

export const usePhanTichStore = create<PhanTichState>((set, get) => ({
    lich_su: LICH_SU_MAU,
    ket_qua_hien_tai: null,
    thong_ke: THONG_KE_MAU,
    dang_phan_tich: false,
    anh_chup: null,

    datAnhChup: (uri: string) => {
        set({ anh_chup: uri });
    },

    batDauPhanTich: async (anhUri: string) => {
        set({ dang_phan_tich: true });
        // Mock AI analysis — simulate 4 seconds
        await new Promise(resolve => setTimeout(resolve, 4000));

        const mockResult: KetQuaPhanTich = {
            id: Date.now().toString(),
            ten_benh: 'Bệnh đốm lá cà chua',
            ten_khoa_hoc: 'Alternaria solani',
            do_chinh_xac: 87 + Math.floor(Math.random() * 10),
            muc_do: 'trung_binh',
            mo_ta: 'Bệnh đốm lá do nấm Alternaria solani gây ra. Xuất hiện các đốm tròn đồng tâm màu nâu đen trên lá.',
            trieu_chung: [
                'Đốm tròn màu nâu đen trên lá',
                'Vòng đồng tâm đặc trưng',
                'Lá vàng và rụng sớm',
            ],
            dieu_tri: [
                'Sử dụng thuốc trừ nấm gốc Mancozeb',
                'Cắt bỏ lá bị nhiễm bệnh nặng',
                'Tăng khoảng cách trồng để thoáng khí',
            ],
            phong_ngua: [
                'Luân canh cây trồng 2-3 năm',
                'Không tưới nước lên lá vào chiều tối',
                'Sử dụng giống kháng bệnh',
            ],
            anh_uri: anhUri,
            ngay_phan_tich: new Date().toISOString(),
            loai_cay: 'Cà chua',
        };

        const currentHistory = get().lich_su;
        set({
            ket_qua_hien_tai: mockResult,
            lich_su: [mockResult, ...currentHistory],
            dang_phan_tich: false,
            thong_ke: {
                ...get().thong_ke,
                so_lan_phan_tich: get().thong_ke.so_lan_phan_tich + 1,
                so_benh_phat_hien: get().thong_ke.so_benh_phat_hien + 1,
            },
        });

        return mockResult;
    },

    xoaLichSu: (id: string) => {
        set(state => ({
            lich_su: state.lich_su.filter(item => item.id !== id),
        }));
    },

    xoaTatCa: () => {
        set({ lich_su: [], thong_ke: { so_lan_phan_tich: 0, so_benh_phat_hien: 0, so_cay_da_luu: 0 } });
    },
}));
