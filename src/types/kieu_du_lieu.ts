// Type definitions cho PlantCare AI

export interface NguoiDung {
    id: string;
    ten: string;
    email: string;
    anh_dai_dien?: string;
    ngay_tao: string;
}

export interface KetQuaPhanTich {
    id: string;
    ten_benh: string;
    ten_khoa_hoc?: string;
    do_chinh_xac: number;
    muc_do: 'thap' | 'trung_binh' | 'cao' | 'nghiem_trong';
    mo_ta: string;
    trieu_chung: string[];
    dieu_tri: string[];
    phong_ngua: string[];
    anh_uri: string;
    ngay_phan_tich: string;
    loai_cay?: string;
}

export interface CayTrong {
    id: string;
    ten: string;
    ten_khoa_hoc: string;
    icon: string;
    mo_ta: string;
    benh_thuong_gap: string[];
}

export interface ThongBao {
    id: string;
    tieu_de: string;
    noi_dung: string;
    loai: 'canh_bao' | 'thong_tin' | 'thanh_cong';
    da_doc: boolean;
    ngay: string;
}

export interface ThongKe {
    so_lan_phan_tich: number;
    so_benh_phat_hien: number;
    so_cay_da_luu: number;
}

export type ChuDe = 'sang' | 'toi';

export type ManHinhTen =
    | 'Splash'
    | 'Onboarding'
    | 'DangNhap'
    | 'DangKy'
    | 'TabChinh'
    | 'Camera'
    | 'XemTruocAnh'
    | 'KetQua'
    | 'ChiTietBenh'
    | 'CaiDat';

export type TabTen = 'TrangChu' | 'LichSu' | 'ThuVien' | 'TaiKhoan';
