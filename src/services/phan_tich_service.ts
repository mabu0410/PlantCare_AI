// Real API service with Supabase integration
import { KetQuaPhanTich } from '../types/kieu_du_lieu';
import { supabase } from './supabase';
import { storageService } from './storage_service';

// Upload ảnh và phân tích bệnh
export const phanTichAnh = async (anhUri: string, userId: string): Promise<KetQuaPhanTich> => {
    try {
        // 1. Upload ảnh lên Supabase Storage
        const uploadResult = await storageService.uploadScanImage(anhUri, userId);
        if (!uploadResult.success || !uploadResult.url) {
            throw new Error(uploadResult.error || 'Upload ảnh thất bại');
        }

        // 2. TODO: Gọi AI model để phân tích (hiện tại dùng mock data tạm)
        // Trong tương lai: Gọi API backend để chạy model AI thực tế
        const mockAnalysis = await simulateAIAnalysis();

        // 3. Lưu kết quả vào database
        const { data, error } = await supabase
            .from('scans')
            .insert({
                user_id: userId,
                image_url: uploadResult.url,
                disease_name: mockAnalysis.ten_benh,
                scientific_name: mockAnalysis.ten_khoa_hoc,
                accuracy: mockAnalysis.do_chinh_xac,
                severity: mockAnalysis.muc_do,
                description: mockAnalysis.mo_ta,
                symptoms: mockAnalysis.trieu_chung,
                treatment: mockAnalysis.dieu_tri,
                prevention: mockAnalysis.phong_ngua,
                plant_type: mockAnalysis.loai_cay,
            })
            .select()
            .single();

        if (error) throw error;

        // 4. Map database result to KetQuaPhanTich
        return {
            id: data.id,
            ten_benh: data.disease_name,
            ten_khoa_hoc: data.scientific_name,
            do_chinh_xac: data.accuracy,
            muc_do: data.severity as 'thap' | 'trung_binh' | 'cao' | 'nghiem_trong',
            mo_ta: data.description,
            trieu_chung: data.symptoms,
            dieu_tri: data.treatment,
            phong_ngua: data.prevention,
            anh_uri: data.image_url || '',
            ngay_phan_tich: data.created_at,
            loai_cay: data.plant_type,
        };
    } catch (error: any) {
        console.error('Lỗi phân tích ảnh:', error);
        throw new Error(error.message || 'Phân tích thất bại');
    }
};

// Lấy lịch sử phân tích từ database
export const layLichSu = async (userId: string): Promise<KetQuaPhanTich[]> => {
    try {
        const { data, error } = await supabase
            .from('scans')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map(scan => ({
            id: scan.id,
            ten_benh: scan.disease_name,
            ten_khoa_hoc: scan.scientific_name,
            do_chinh_xac: scan.accuracy,
            muc_do: scan.severity as 'thap' | 'trung_binh' | 'cao' | 'nghiem_trong',
            mo_ta: scan.description,
            trieu_chung: scan.symptoms,
            dieu_tri: scan.treatment,
            phong_ngua: scan.prevention,
            anh_uri: scan.image_url || '',
            ngay_phan_tich: scan.created_at,
            loai_cay: scan.plant_type,
        }));
    } catch (error: any) {
        console.error('Lỗi lấy lịch sử:', error);
        return [];
    }
};

// Xóa kết quả phân tích
export const xoaKetQua = async (scanId: string, userId: string): Promise<boolean> => {
    try {
        // Lấy thông tin scan để xóa ảnh
        const { data: scan } = await supabase
            .from('scans')
            .select('image_url')
            .eq('id', scanId)
            .eq('user_id', userId)
            .single();

        if (scan?.image_url) {
            const path = scan.image_url.split('/').pop();
            if (path) {
                await storageService.deleteFile('scans', `${userId}/${path}`);
            }
        }

        // Xóa record khỏi database
        const { error } = await supabase
            .from('scans')
            .delete()
            .eq('id', scanId)
            .eq('user_id', userId);

        if (error) throw error;
        return true;
    } catch (error: any) {
        console.error('Lỗi xóa kết quả:', error);
        return false;
    }
};

// Simulate AI analysis (tạm thời)
// TODO: Thay thế bằng API call đến backend AI model
async function simulateAIAnalysis() {
    await new Promise(resolve => setTimeout(resolve, 4000));

    const mockDiseases = [
        {
            ten_benh: 'Bệnh đốm lá cà chua',
            ten_khoa_hoc: 'Alternaria solani',
            do_chinh_xac: 94,
            muc_do: 'trung_binh' as const,
            mo_ta: 'Bệnh đốm lá do nấm Alternaria solani gây ra. Xuất hiện các đốm tròn đồng tâm màu nâu đen trên lá.',
            trieu_chung: [
                'Đốm tròn màu nâu đen trên lá',
                'Vòng đồng tâm đặc trưng',
                'Lá vàng và rụng sớm',
                'Quả bị nhiễm có vết đốm',
            ],
            dieu_tri: [
                'Sử dụng thuốc trừ nấm gốc Mancozeb',
                'Phun thuốc Chlorothalonil theo hướng dẫn',
                'Cắt bỏ lá bị nhiễm bệnh nặng',
                'Tăng khoảng cách trồng để thoáng khí',
            ],
            phong_ngua: [
                'Luân canh cây trồng 2-3 năm',
                'Không tưới nước lên lá vào chiều tối',
                'Thu dọn tàn dư cây bệnh cuối vụ',
                'Sử dụng giống kháng bệnh',
            ],
            loai_cay: 'Cà chua',
        },
        {
            ten_benh: 'Bệnh héo xanh',
            ten_khoa_hoc: 'Ralstonia solanacearum',
            do_chinh_xac: 88,
            muc_do: 'nghiem_trong' as const,
            mo_ta: 'Bệnh héo xanh do vi khuẩn Ralstonia solanacearum gây ra. Cây héo nhanh chóng dù đất vẫn ẩm.',
            trieu_chung: [
                'Cây héo đột ngột không hồi phục',
                'Lá vẫn xanh khi héo',
                'Mạch dẫn bị nâu, chảy dịch trắng đục',
                'Rễ bị thối nhũn',
            ],
            dieu_tri: [
                'Nhổ bỏ cây bệnh và tiêu hủy',
                'Xử lý đất bằng vôi bột',
                'Sử dụng chế phẩm Trichoderma',
                'Không trồng lại cây họ cà tại vùng bệnh',
            ],
            phong_ngua: [
                'Chọn giống kháng bệnh',
                'Luân canh dài hạn (5+ năm)',
                'Không sử dụng nước tưới bị nhiễm',
                'Nâng cao pH đất bằng vôi',
            ],
            loai_cay: 'Cà chua',
        },
        {
            ten_benh: 'Cây khỏe mạnh',
            ten_khoa_hoc: '',
            do_chinh_xac: 96,
            muc_do: 'thap' as const,
            mo_ta: 'Lá cây có màu sắc bình thường, không phát hiện dấu hiệu bệnh lý.',
            trieu_chung: [],
            dieu_tri: [],
            phong_ngua: ['Tiếp tục chăm sóc bình thường', 'Kiểm tra định kỳ'],
            loai_cay: 'Rau',
        },
    ];

    const rand = Math.floor(Math.random() * mockDiseases.length);
    return mockDiseases[rand];
}
