// Service cung cấp dữ liệu thời tiết và lời khuyên chăm sóc thông minh
export interface ThoiTiet {
    nhiet_do: number;
    do_am: number;
    trang_thai: 'nang' | 'mua' | 'nhieu_may' | 'it_may';
    canh_bao?: string;
    loi_khuyen: string;
}

export const thoitietService = {
    layThoiTietHienTai: async (): Promise<ThoiTiet> => {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data logic
        const nhiet_do = 28 + Math.floor(Math.random() * 10); // 28-38°C
        const do_am = 60 + Math.floor(Math.random() * 30); // 60-90%

        let trang_thai: ThoiTiet['trang_thai'] = 'nang';
        let canh_bao = '';
        let loi_khuyen = 'Thời tiết thuận lợi cho cây phát triển.';

        if (nhiet_do > 34) {
            trang_thai = 'nang';
            canh_bao = 'Nắng nóng gay gắt!';
            loi_khuyen = `Nhiệt độ cao (${nhiet_do}°C), hãy tưới thêm nước vào chiều mát và che nắng cho cây non.`;
        } else if (do_am > 85) {
            trang_thai = 'mua';
            canh_bao = 'Độ ẩm rất cao!';
            loi_khuyen = 'Độ ẩm cao dễ phát sinh nấm bệnh. Hãy giảm tưới nước và kiểm tra lá cây.';
        } else if (nhiet_do < 20) {
            trang_thai = 'it_may';
            loi_khuyen = 'Trời hơi lạnh, hạn chế tưới nước quá muộn vào buổi tối.';
        }

        return {
            nhiet_do,
            do_am,
            trang_thai,
            canh_bao,
            loi_khuyen
        };
    }
};
