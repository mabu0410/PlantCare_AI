// Service quản lý lịch chăm sóc và nhật ký cây
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface NhiemVu {
    id: string;
    tieu_de: string;
    loai: 'tuoi_nuoc' | 'bon_phan' | 'cat_tia' | 'khac';
    ngay: string; // ISO string
    hoan_thanh: boolean;
    cay_id?: string;
}

export interface NhatKyCay {
    id: string;
    ten: string;
    loai: string;
    ngay_trong: string;
    anh_uri?: string;
    ghi_chu: string;
}

const STORAGE_KEYS = {
    NHIEM_VU: 'plantcare_nhiem_vu',
    NHAT_KY: 'plantcare_nhat_ky',
};

export const chamSocService = {
    // Nhiệm vụ
    layDanhSachNhiemVu: async (): Promise<NhiemVu[]> => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.NHIEM_VU);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Lỗi lấy nhiệm vụ:', e);
            return [];
        }
    },

    luuNhiemVu: async (nhiemVu: NhiemVu[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.NHIEM_VU, JSON.stringify(nhiemVu));
        } catch (e) {
            console.error('Lỗi lưu nhiệm vụ:', e);
        }
    },

    themNhiemVu: async (nv: Omit<NhiemVu, 'id' | 'hoan_thanh'>) => {
        const hienTai = await chamSocService.layDanhSachNhiemVu();
        const moi: NhiemVu = {
            ...nv,
            id: Date.now().toString(),
            hoan_thanh: false,
        };
        await chamSocService.luuNhiemVu([...hienTai, moi]);
        return moi;
    },

    capNhatTrangThai: async (id: string, hoanThanh: boolean) => {
        const hienTai = await chamSocService.layDanhSachNhiemVu();
        const moi = hienTai.map(nv => nv.id === id ? { ...nv, hoan_thanh: hoanThanh } : nv);
        await chamSocService.luuNhiemVu(moi);
    },

    xoaNhiemVu: async (id: string) => {
        const hienTai = await chamSocService.layDanhSachNhiemVu();
        const moi = hienTai.filter(nv => nv.id !== id);
        await chamSocService.luuNhiemVu(moi);
    },

    // Nhật ký cây
    layDanhSachNhatKy: async (): Promise<NhatKyCay[]> => {
        try {
            const data = await AsyncStorage.getItem(STORAGE_KEYS.NHAT_KY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Lỗi lấy nhật ký:', e);
            return [];
        }
    },

    luuNhatKy: async (nhatKy: NhatKyCay[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEYS.NHAT_KY, JSON.stringify(nhatKy));
        } catch (e) {
            console.error('Lỗi lưu nhật ký:', e);
        }
    },

    themNhatKy: async (nk: Omit<NhatKyCay, 'id'>) => {
        const hienTai = await chamSocService.layDanhSachNhatKy();
        const moi: NhatKyCay = {
            ...nk,
            id: Date.now().toString(),
        };
        await chamSocService.luuNhatKy([...hienTai, moi]);
        return moi;
    },

    xoaNhatKy: async (id: string) => {
        const hienTai = await chamSocService.layDanhSachNhatKy();
        const moi = hienTai.filter(nk => nk.id !== id);
        await chamSocService.luuNhatKy(moi);
    },

    khoiTaoDuLieuMau: async () => {
        const dataNv = await chamSocService.layDanhSachNhiemVu();
        if (dataNv.length === 0) {
            const homNay = new Date().toISOString();
            const mau: NhiemVu[] = [
                { id: '1', tieu_de: 'Tưới nước Cà chua', loai: 'tuoi_nuoc', ngay: homNay, hoan_thanh: false },
                { id: '2', tieu_de: 'Bón phân Hoa hồng', loai: 'bon_phan', ngay: homNay, hoan_thanh: true },
                { id: '3', tieu_de: 'Cắt tỉa cây Ớt', loai: 'cat_tia', ngay: homNay, hoan_thanh: false },
            ];
            await chamSocService.luuNhiemVu(mau);
        }

        const dataNk = await chamSocService.layDanhSachNhatKy();
        if (dataNk.length === 0) {
            const mauNk: NhatKyCay[] = [
                { id: '1', ten: 'Cà chua ban công', loai: 'Cà chua', ngay_trong: '2025-02-15', ghi_chu: 'Cây đang ra quả xanh' },
                { id: '2', ten: 'Ớt cay của bố', loai: 'Ớt', ngay_trong: '2025-03-01', ghi_chu: 'Bắt đầu ra hoa' },
            ];
            await chamSocService.luuNhatKy(mauNk);
        }
    },

    // Tạo nhiệm vụ tự động dựa trên loại cây
    taoNhiemVuTuDong: async (tenCay: string, loaiCay: string) => {
        const homNay = new Date();
        const nhiemVuMoi: Omit<NhiemVu, 'id' | 'hoan_thanh'>[] = [
            {
                tieu_de: `Tưới nước cho ${tenCay}`,
                loai: 'tuoi_nuoc',
                ngay: new Date(homNay.getTime() + 86400000).toISOString(), // Ngày mai
            },
            {
                tieu_de: `Kiểm tra sức khỏe ${tenCay}`,
                loai: 'khac',
                ngay: new Date(homNay.getTime() + 86400000 * 3).toISOString(), // 3 ngày sau
            }
        ];

        if (loaiCay === 'Cà chua' || loaiCay === 'Ớt') {
            nhiemVuMoi.push({
                tieu_de: `Bón phân định kỳ cho ${tenCay}`,
                loai: 'bon_phan',
                ngay: new Date(homNay.getTime() + 86400000 * 7).toISOString(), // 1 tuần sau
            });
        }

        for (const nv of nhiemVuMoi) {
            await chamSocService.themNhiemVu(nv);
        }
    }
};
