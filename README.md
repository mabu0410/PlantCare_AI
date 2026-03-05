# 🌿 PlantCare AI - Trợ Lý Chăm Sóc Cây Thông Minh

Ứng dụng di động cao cấp hỗ trợ chẩn đoán bệnh cây trồng bằng trí tuệ nhân tạo và quản lý chăm sóc cây toàn diện. Được xây dựng với **React Native** và **Expo**, ứng dụng mang lại trải nghiệm mượt mà với giao diện hiện đại và các tính năng thông minh thực tế.

---

## ✨ Tính năng nổi bật

### 🔍 Chẩn đoán & AI
- **Chẩn đoán bệnh bằng AI**: Phân tích hình ảnh từ camera hoặc thư viện để nhận diện bệnh hại với độ chính xác cao.
- **Trợ lý AI (Chatbot)**: Hỗ trợ giải đáp mọi thắc mắc về kỹ thuật trồng và chăm sóc cây 24/7.
- **Hiệu ứng Khung xương (Skeleton Loaders)**: Trải nghiệm tải dữ liệu mượt mà, cao cấp trong quá trình phân tích ảnh.

### 📅 Quản lý Chăm sóc
- **Lịch Chăm Sóc (Care Calendar)**: Tự động hóa lịch trình tưới nước, bón phân, và cắt tỉa. Theo dõi các nhiệm vụ hàng ngày một cách trực quan.
- **Nhắc nhở thông minh**: Hệ thống tự động tạo lịch nhắc nhở dựa trên loại cây và tình trạng sức khỏe sau khi chẩn đoán.

### 🏠 Quản lý Vườn (Plant Diary)
- **Nhật ký cây trồng**: Lưu trữ danh sách cây trong vườn cá nhân, theo dõi ngày trồng và ghi chú riêng.
- **Biểu đồ sức khỏe**: Minh họa quá trình lớn lên và tình trạng sức khỏe của cây bằng biểu đồ trực quan.

### 🌤️ Dữ liệu Thực tế
- **Tích hợp Thời tiết**: Cập nhật nhiệt độ, độ ẩm thực tế và đưa ra lời khuyên chăm sóc phù hợp (VD: "Trời nắng nóng, hãy tưới thêm nước").
- **Thư viện thông minh**: Tra cứu kiến thức về hàng trăm loại cây với các bộ lọc danh mục (Rau, Hoa, Quả, Cây cảnh).

---

## 🎨 Trải nghiệm Người dùng (UX/UI)
- **Giao diện Glassmorphism**: Sử dụng hiệu ứng kính mờ hiện đại, sang trọng.
- **Dark/Light Mode**: Hỗ trợ đầy đủ chế độ sáng và tối, thích ứng với hệ thống.
- **Micro-animations**: Hiệu ứng chuyển cảnh và tương tác mượt mà với `react-native-reanimated`.
- **Hệ thống Toast**: Thông báo trạng thái hoạt động tức thời và đẹp mắt.

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mô tả |
|---|---|
| **React Native** | Framework phát triển chính |
| **Expo SDK 54** | Nền tảng hỗ trợ phát triển & build ứng dụng |
| **TypeScript** | Đảm bảo tính nhất quán và chặt chẽ của mã nguồn |
| **Zustand** | Quản lý state gọn nhẹ và hiệu quả |
| **Reanimated 3** | Xử lý các hiệu ứng chuyển động cao cấp |
| **AsyncStorage** | Lưu trữ dữ liệu ứng dụng cục bộ |
| **Expo Image Picker**| Xử lý chọn ảnh từ thư viện |

---

## 📂 Cấu trúc thư mục chính

- `src/screens/`: Chứa toàn bộ các màn hình (Trang chủ, Camera, Nhật ký, Lịch chăm sóc, Trợ lý AI...).
- `src/services/`: Các dịch vụ xử lý logic (Thời tiết, Chăm sóc, API...).
- `src/components/`: Các thành phần giao diện dùng chung (Card, Button, Skeleton, Toast...).
- `src/theme/`: Quản lý bảng màu và chủ đề ứng dụng.
- `src/store/`: Quản lý trạng thái ứng dụng bằng Zustand.

---

## 🚀 Hướng dẫn cài đặt & chạy

### Cài đặt nhanh
```bash
# Clone dự án
git clone <repository-url>
cd PlantCare_AI

# Cài đặt thư viện
npm install

# Khởi chạy ứng dụng
npm start
```

### Chạy trên các nền tảng
- Nhấn `a` để chạy trên Android Emulator.
- Nhấn `i` để chạy trên iOS Simulator.
- Quét mã QR bằng ứng dụng **Expo Go** để trải nghiệm trên điện thoại thật.

---

## 📄 Thông tin dự án
Dự án được phát triển với mục tiêu mang lại giải pháp công nghệ hiện đại cho người yêu cây cảnh, kết hợp giữa AI và trải nghiệm người dùng cao cấp.

---
*Phát triển bởi Đội ngũ PlantCare AI.*
