// Format helpers
export const dinhDangNgay = (isoString: string): string => {
    const d = new Date(isoString);
    const ngay = d.getDate().toString().padStart(2, '0');
    const thang = (d.getMonth() + 1).toString().padStart(2, '0');
    const nam = d.getFullYear();
    return `${ngay}/${thang}/${nam}`;
};

export const dinhDangGio = (isoString: string): string => {
    const d = new Date(isoString);
    const gio = d.getHours().toString().padStart(2, '0');
    const phut = d.getMinutes().toString().padStart(2, '0');
    return `${gio}:${phut}`;
};

export const dinhDangNgayGio = (isoString: string): string => {
    return `${dinhDangNgay(isoString)} ${dinhDangGio(isoString)}`;
};

export const dinhDangPhanTram = (val: number): string => `${Math.round(val)}%`;

export const tenMucDo = (muc: string): string => {
    const map: Record<string, string> = {
        thap: 'Thấp',
        trung_binh: 'Trung bình',
        cao: 'Cao',
        nghiem_trong: 'Nghiêm trọng',
    };
    return map[muc] || muc;
};

export const mauMucDo = (muc: string, mau: any): string => {
    const map: Record<string, string> = {
        thap: mau.muc_thap,
        trung_binh: mau.muc_trung_binh,
        cao: mau.muc_cao,
        nghiem_trong: mau.muc_nghiem_trong,
    };
    return map[muc] || mau.chu_phu;
};
