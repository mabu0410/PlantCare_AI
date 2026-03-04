// Mock data cho PlantCare AI
import { KetQuaPhanTich, CayTrong, ThongBao, NguoiDung, ThongKe } from '../types/kieu_du_lieu';

export const NGUOI_DUNG_MAU: NguoiDung = {
    id: '1',
    ten: 'Nguyễn Văn A',
    email: 'nongdan@email.com',
    anh_dai_dien: undefined,
    ngay_tao: '2025-01-15',
};

export const THONG_KE_MAU: ThongKe = {
    so_lan_phan_tich: 24,
    so_benh_phat_hien: 8,
    so_cay_da_luu: 16,
};

export const LICH_SU_MAU: KetQuaPhanTich[] = [
    {
        id: '1',
        ten_benh: 'Bệnh đốm lá cà chua',
        ten_khoa_hoc: 'Alternaria solani',
        do_chinh_xac: 94,
        muc_do: 'trung_binh',
        mo_ta: 'Bệnh đốm lá do nấm Alternaria solani gây ra. Xuất hiện các đốm tròn đồng tâm màu nâu đen trên lá, thường bắt đầu từ lá già.',
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
        anh_uri: '',
        ngay_phan_tich: '2025-03-01T10:30:00',
        loai_cay: 'Cà chua',
    },
    {
        id: '2',
        ten_benh: 'Bệnh phấn trắng',
        ten_khoa_hoc: 'Erysiphe cichoracearum',
        do_chinh_xac: 88,
        muc_do: 'thap',
        mo_ta: 'Bệnh phấn trắng tạo lớp phấn trắng trên bề mặt lá, ảnh hưởng đến quang hợp và sinh trưởng.',
        trieu_chung: [
            'Lớp phấn trắng trên mặt lá',
            'Lá cong và biến dạng',
            'Cây sinh trưởng chậm',
        ],
        dieu_tri: [
            'Phun thuốc trừ nấm Sulfur',
            'Sử dụng dung dịch baking soda pha loãng',
            'Cắt bỏ bộ phận bị nhiễm nặng',
        ],
        phong_ngua: [
            'Trồng nơi thông thoáng',
            'Tránh tưới nước lên lá',
            'Bón phân cân đối',
        ],
        anh_uri: '',
        ngay_phan_tich: '2025-02-28T14:15:00',
        loai_cay: 'Dưa chuột',
    },
    {
        id: '3',
        ten_benh: 'Bệnh thán thư',
        ten_khoa_hoc: 'Colletotrichum spp.',
        do_chinh_xac: 91,
        muc_do: 'cao',
        mo_ta: 'Bệnh thán thư là bệnh phổ biến do nấm Colletotrichum gây ra. Xuất hiện vết lõm tròn trên quả, có bào tử màu hồng cam khi ẩm.',
        trieu_chung: [
            'Vết lõm tròn trên quả',
            'Đốm nâu đen trên lá và thân',
            'Bào tử màu hồng cam khi ẩm ướt',
            'Quả thối nhũn nhanh',
        ],
        dieu_tri: [
            'Phun Carbendazim hoặc Mancozeb',
            'Loại bỏ quả bị nhiễm ngay lập tức',
            'Xử lý hạt giống trước khi gieo',
        ],
        phong_ngua: [
            'Sử dụng giống sạch bệnh',
            'Luân canh với cây họ đậu',
            'Kiểm soát độ ẩm ruộng',
            'Vệ sinh đồng ruộng sau thu hoạch',
        ],
        anh_uri: '',
        ngay_phan_tich: '2025-02-25T09:45:00',
        loai_cay: 'Ớt',
    },
    {
        id: '4',
        ten_benh: 'Bệnh héo xanh',
        ten_khoa_hoc: 'Ralstonia solanacearum',
        do_chinh_xac: 85,
        muc_do: 'nghiem_trong',
        mo_ta: 'Bệnh héo xanh do vi khuẩn Ralstonia solanacearum gây ra. Cây héo nhanh chóng dù đất vẫn ẩm, rất khó điều trị.',
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
        anh_uri: '',
        ngay_phan_tich: '2025-02-20T16:00:00',
        loai_cay: 'Cà chua',
    },
    {
        id: '5',
        ten_benh: 'Cây khỏe mạnh',
        ten_khoa_hoc: '',
        do_chinh_xac: 96,
        muc_do: 'thap',
        mo_ta: 'Lá cây có màu sắc bình thường, không phát hiện dấu hiệu bệnh lý.',
        trieu_chung: [],
        dieu_tri: [],
        phong_ngua: ['Tiếp tục chăm sóc bình thường', 'Kiểm tra định kỳ'],
        anh_uri: '',
        ngay_phan_tich: '2025-02-18T08:30:00',
        loai_cay: 'Rau muống',
    },
];

export const CAY_TRONG_MAU: CayTrong[] = [
    {
        id: '1',
        ten: 'Cà chua',
        ten_khoa_hoc: 'Solanum lycopersicum',
        icon: '🍅',
        mo_ta: 'Cây cà chua thuộc họ Cà, dễ mắc bệnh nấm và vi khuẩn.',
        benh_thuong_gap: ['Đốm lá', 'Héo xanh', 'Sương mai', 'Virus xoăn lá'],
    },
    {
        id: '2',
        ten: 'Lúa',
        ten_khoa_hoc: 'Oryza sativa',
        icon: '🌾',
        mo_ta: 'Cây lương thực chính, thường mắc bệnh đạo ôn và bạc lá.',
        benh_thuong_gap: ['Đạo ôn', 'Bạc lá', 'Khô vằn', 'Vàng lùn'],
    },
    {
        id: '3',
        ten: 'Ớt',
        ten_khoa_hoc: 'Capsicum annuum',
        icon: '🌶️',
        mo_ta: 'Cây gia vị phổ biến, dễ mắc bệnh thán thư và héo xanh.',
        benh_thuong_gap: ['Thán thư', 'Héo xanh', 'Đốm lá', 'Virus'],
    },
    {
        id: '4',
        ten: 'Dưa chuột',
        ten_khoa_hoc: 'Cucumis sativus',
        icon: '🥒',
        mo_ta: 'Cây rau quả họ bầu bí, thường mắc phấn trắng và sương mai.',
        benh_thuong_gap: ['Phấn trắng', 'Sương mai', 'Virus khảm', 'Héo dây'],
    },
    {
        id: '5',
        ten: 'Rau muống',
        ten_khoa_hoc: 'Ipomoea aquatica',
        icon: '🥬',
        mo_ta: 'Rau ăn lá phổ biến, ít bệnh nhưng có thể bị rỉ sắt.',
        benh_thuong_gap: ['Rỉ sắt trắng', 'Đốm lá', 'Sâu khoang'],
    },
    {
        id: '6',
        ten: 'Hoa hồng',
        ten_khoa_hoc: 'Rosa spp.',
        icon: '🌹',
        mo_ta: 'Cây hoa cảnh đẹp, thường bị phấn trắng và đốm đen.',
        benh_thuong_gap: ['Phấn trắng', 'Đốm đen', 'Rỉ sắt', 'Bọ trĩ'],
    },
];

export const THONG_BAO_MAU: ThongBao[] = [
    {
        id: '1',
        tieu_de: 'Cảnh báo thời tiết',
        noi_dung: 'Độ ẩm cao 85% — nguy cơ nấm bệnh tăng. Kiểm tra cây thường xuyên.',
        loai: 'canh_bao',
        da_doc: false,
        ngay: '2025-03-03T08:00:00',
    },
    {
        id: '2',
        tieu_de: 'Phân tích hoàn tất',
        noi_dung: 'Kết quả phân tích ảnh lá cà chua: Bệnh đốm lá (94%)',
        loai: 'thanh_cong',
        da_doc: false,
        ngay: '2025-03-01T10:30:00',
    },
    {
        id: '3',
        tieu_de: 'Mẹo tuần này',
        noi_dung: 'Tưới nước vào buổi sáng sớm giúp cây hấp thụ tốt và giảm nguy cơ nấm bệnh.',
        loai: 'thong_tin',
        da_doc: true,
        ngay: '2025-02-27T07:00:00',
    },
];

export const MEO_NGAY_MAU = [
    '💡 Tưới nước vào sáng sớm để cây hấp thụ tốt nhất',
    '💡 Kiểm tra mặt dưới lá — nơi sâu bệnh thường ẩn nấp',
    '💡 Luân canh cây trồng giúp đất nghỉ ngơi và giảm bệnh',
    '💡 Bón phân hữu cơ giúp cây khỏe mạnh, tăng sức đề kháng',
    '💡 Trồng cây đồng hành (companion planting) để xua đuổi sâu hại',
];
