// Mock API service
import { KetQuaPhanTich } from '../types/kieu_du_lieu';
import { LICH_SU_MAU } from '../utils/du_lieu_mau';

// Simulated API call — gửi ảnh, nhận kết quả
export const phanTichAnh = async (anhUri: string): Promise<KetQuaPhanTich> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 4000));

    // Return mock result
    const rand = Math.floor(Math.random() * LICH_SU_MAU.length);
    return {
        ...LICH_SU_MAU[rand],
        id: Date.now().toString(),
        anh_uri: anhUri,
        ngay_phan_tich: new Date().toISOString(),
        do_chinh_xac: 85 + Math.floor(Math.random() * 12),
    };
};

export const layLichSu = async (): Promise<KetQuaPhanTich[]> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return LICH_SU_MAU;
};
