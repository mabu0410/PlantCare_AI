import * as Location from 'expo-location';
import axios from 'axios';

// Service cung cấp dữ liệu thời tiết và lời khuyên chăm sóc thông minh
export interface ThoiTiet {
    nhiet_do: number;
    do_am: number;
    trang_thai: 'nang' | 'mua' | 'nhieu_may' | 'it_may';
    canh_bao?: string;
    loi_khuyen: string;
}

// LƯU Ý: Đã chuyển sang sử dụng Open-Meteo, KHÔNG CẦN API KEY, miễn phí 10.000 req/ngày.

export const thoitietService = {
    layThoiTietHienTai: async (): Promise<ThoiTiet | null> => {
        try {
            let latitude = 21.0285; // Mặc định: Hà Nội
            let longitude = 105.8542;

            try {
                // 1. Xin quyền truy cập Vị trí
                const { status } = await Location.requestForegroundPermissionsAsync();

                // 2. Lấy tọa độ GPS hiện tại nếu được cấp quyền
                if (status === 'granted') {
                    const location = await Location.getCurrentPositionAsync({});
                    latitude = location.coords.latitude;
                    longitude = location.coords.longitude;
                } else {
                    console.warn('Từ chối quyền truy cập vị trí, sử dụng vị trí mặc định (Hà Nội)');
                }
            } catch (locationError) {
                console.warn('Lỗi lấy vị trí (có thể do môi trường Web), sử dụng vị trí mặc định (Hà Nội)', locationError);
            }

            // 3. Gọi API thời tiết thật (Open-Meteo)
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`;
            const response = await axios.get(url);
            const data = response.data;

            // Phân tích dữ liệu từ API Open-Meteo
            const nhiet_do = Math.round(data.current.temperature_2m);
            const do_am = Math.round(data.current.relative_humidity_2m);
            const weatherCode = data.current.weather_code; // Mã WMO Weather interpretation codes

            let trang_thai: ThoiTiet['trang_thai'] = 'nang';
            let canh_bao = '';
            let loi_khuyen = 'Thời tiết thuận lợi cho cây phát triển.';

            // Phân loại trạng thái dựa trên WMO Code của Open-Meteo
            // 0: Clear sky (nang)
            // 1, 2, 3: Mainly clear, partly cloudy, and overcast (nhieu_may)
            // 51, 53, 55, 61, 63, 65, 80, 81, 82: Drizzle & Rain (mua)
            if (weatherCode >= 51 && weatherCode <= 82) {
                trang_thai = 'mua';
            } else if (weatherCode === 0) {
                trang_thai = 'nang';
            } else if (weatherCode >= 1 && weatherCode <= 3) {
                trang_thai = 'nhieu_may';
            }

            // Sinh lời khuyên thông minh
            if (nhiet_do > 35) {
                canh_bao = 'Nắng nóng gay gắt!';
                loi_khuyen = `Nhiệt độ cao (${nhiet_do}°C), hãy tưới thêm nước vào chiều mát và che nắng cho cây non.`;
            } else if (do_am > 85 && trang_thai === 'mua') {
                canh_bao = 'Mưa & Độ ẩm rất cao!';
                loi_khuyen = 'Độ ẩm cao dễ phát sinh nấm bệnh. Hãy ngưng tưới nước và kiểm tra lá cây.';
            } else if (nhiet_do < 18) {
                trang_thai = 'it_may';
                loi_khuyen = 'Trời lạnh, hạn chế tưới nước rễ cây vào buổi tối.';
            }

            return {
                nhiet_do,
                do_am,
                trang_thai,
                canh_bao,
                loi_khuyen
            };

        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu thời tiết:', error);
            return null; // Trả về null để UI tự handle lỗi (ẩn Widget)
        }
    }
};
