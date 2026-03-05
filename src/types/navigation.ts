// Navigation types — typed params cho mọi screen
import type { KetQuaPhanTich } from './kieu_du_lieu';

export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    DangNhap: undefined;
    DangKy: undefined;
    TabChinh: undefined;
    Camera: undefined;
    HuongDanQuet: undefined;
    XemTruocAnh: { imageUri: string | null };
    KetQua: { ketQua?: KetQuaPhanTich; imageUri?: string };
    ChiTietBenh: { benhId: string };
    CaiDat: undefined;
    ThongBao: undefined;
    ChinhSach: undefined;
    DieuKhoan: undefined;
    PhanHoi: undefined;
    ChinhSuaHoSo: undefined;
    DaLuu: undefined;
    VeUngDung: undefined;
};

export type TabParamList = {
    TrangChu: undefined;
    LichSu: undefined;
    ThuVien: undefined;
    TaiKhoan: undefined;
};
