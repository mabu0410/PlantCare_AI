// Bảng màu PlantCare AI — Light & Dark mode

// Bảng màu PlantCare AI — Light & Dark mode

export interface BangMau {
    xanh_chinh: string;
    xanh_nhat: string;
    xanh_rat_nhat: string;
    xanh_dam: string;
    nen: string;
    nen_the: string;
    nen_kinh: string;
    chu_chinh: string;
    chu_phu: string;
    chu_nhat: string;
    thanh_cong: string;
    canh_bao: string;
    nguy_hiem: string;
    thong_tin: string;
    muc_thap: string;
    muc_trung_binh: string;
    muc_cao: string;
    muc_nghiem_trong: string;
    vien: string;
    bong: string;
    trang: string;
    den: string;
    gradient_chinh: readonly [string, string, ...string[]];
    gradient_hero: readonly [string, string, ...string[]];
    gradient_cam: readonly [string, string, ...string[]];
}

export const MauSang: BangMau = {
    // Primary
    xanh_chinh: '#2D6A4F',
    xanh_nhat: '#52B788',
    xanh_rat_nhat: '#95D5B2',
    xanh_dam: '#1B4332',

    // Background
    nen: '#F0F4F3',
    nen_the: '#FFFFFF',
    nen_kinh: 'rgba(255,255,255,0.75)',

    // Text
    chu_chinh: '#1A1A2E',
    chu_phu: '#6B7280',
    chu_nhat: '#9CA3AF',

    // Semantic
    thanh_cong: '#10B981',
    canh_bao: '#F59E0B',
    nguy_hiem: '#EF4444',
    thong_tin: '#3B82F6',

    // Severity
    muc_thap: '#10B981',
    muc_trung_binh: '#F59E0B',
    muc_cao: '#F97316',
    muc_nghiem_trong: '#EF4444',

    // Borders & Shadows
    vien: '#E5E7EB',
    bong: 'rgba(0,0,0,0.08)',

    // Misc
    trang: '#FFFFFF',
    den: '#000000',

    // Gradient
    gradient_chinh: ['#2D6A4F', '#52B788'],
    gradient_hero: ['#1B4332', '#2D6A4F', '#40916C'],
    gradient_cam: ['#F59E0B', '#F97316'],
};

export const MauToi: BangMau = {
    // Primary
    xanh_chinh: '#52B788',
    xanh_nhat: '#74C69D',
    xanh_rat_nhat: '#95D5B2',
    xanh_dam: '#2D6A4F',

    // Background
    nen: '#0A1628',
    nen_the: '#152238',
    nen_kinh: 'rgba(21,34,56,0.85)',

    // Text
    chu_chinh: '#F1F5F9',
    chu_phu: '#94A3B8',
    chu_nhat: '#64748B',

    // Semantic
    thanh_cong: '#34D399',
    canh_bao: '#FBBF24',
    nguy_hiem: '#F87171',
    thong_tin: '#60A5FA',

    // Severity
    muc_thap: '#34D399',
    muc_trung_binh: '#FBBF24',
    muc_cao: '#FB923C',
    muc_nghiem_trong: '#F87171',

    // Borders & Shadows
    vien: 'rgba(255,255,255,0.08)',
    bong: 'rgba(0,0,0,0.3)',

    // Misc
    trang: '#FFFFFF',
    den: '#000000',

    // Gradient
    gradient_chinh: ['#2D6A4F', '#52B788'],
    gradient_hero: ['#0A1628', '#152238', '#1E3A5F'],
    gradient_cam: ['#F59E0B', '#F97316'],
};
