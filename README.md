# 🌿 PlantCare AI - Trợ Lý Chăm Sóc Cây Thông Minh

Ứng dụng di động cao cấp hỗ trợ chẩn đoán bệnh cây trồng bằng trí tuệ nhân tạo và quản lý chăm sóc cây toàn diện. Được xây dựng với **React Native**, ứng dụng mang lại trải nghiệm mượt mà với giao diện hiện đại và các tính năng thông minh thực tế.

---

## ✨ Các tính năng đang có (Current Features)

### 1. Phân tích & AI chẩn đoán (UI Flow)
*   **Màn hình Camera rà quét**: Tích hợp luồng chụp ảnh trực tiếp và chọn ảnh từ Thư viện. 
*   **Hiệu ứng Loading AI**: Sử dụng Lottie Animations và Skeleton Loaders mô phỏng quá trình trí tuệ nhân tạo bóc tách đặc trưng ảnh.
*   **Kết quả chẩn đoán 3D**: Vuốt ngang (Swipeable Tabs) mượt mà để xem: *Triệu chứng*, *Cách điều trị*, và *Phòng ngừa*. Hiển thị kèm tỷ lệ chính xác (Confidence Score).
*   **Trợ lý ảo AI (Chatbot)**: Giao diện chat thông minh giúp giải đáp mọi thắc mắc về kỹ thuật trồng cây.

### 2. Quản lý Chăm sóc & Vườn cây (Plant Diary)
*   **Nhật ký Khu vườn cá nhân**: Thêm cây mới vào vườn, theo dõi ngày trồng, ghi chú tình trạng sinh trưởng của từng cây.
*   **Lịch Chăm sóc tự động**: Danh sách việc cần làm (Tưới nước, Bón phân...) được hệ thống tự gen ra theo đặc tính của từng loại cây. Có thể đánh dấu hoàn thành nhanh chóng.
*   **Tra cứu Dữ liệu (Thư viện)**: Cung cấp danh mục hàng trăm loại cây trồng, hoa, rau màu phổ biến.

### 3. Trải nghiệm & Tiện ích (UX & Utils)
*   **Hệ thống Thời tiết Thực tế**: Tích hợp widget Thời tiết tại trang chủ để đưa ra cảnh báo (Vd: "Trời mưa, không cần tưới") theo thời gian thực.
*   **Thiết kế Cao cấp (Premium UX/UI)**: 
    * Hiệu ứng Kính (Glassmorphism) sang trọng.
    * Hỗ trợ tự động Dark/Light Mode.
    * Phản hồi xúc giác (Haptic Feedback) khi tương tác nút bấm và chụp ảnh.
    * Font chữ Custom (Plus Jakarta Sans) tối ưu cho việc đọc.
*   **Xác thực người dùng (Auth UI)**: Luồng màn hình Onboarding, Đăng nhập, Đăng ký và Quên mật khẩu chuyên nghiệp.

---

## 🚀 Hướng phát triển Backend (Architecture Direction)

Để đưa ứng dụng lên mức độ Sản xuất (Production-ready), hệ thống Backend dự kiến sẽ được triển khai theo kiến trúc dưới đây:

### 1. Dịch vụ Đám mây & Cơ sở dữ liệu (BaaS / Database)
Thay vì tự code Backend từ đầu, hệ thống sẽ sử dụng **Supabase** hoặc **Firebase** để làm lõi dịch vụ:
*   **Authentication**: Cung cấp đăng nhập qua Google, Apple, Email/Password an toàn.
*   **Database (PostgreSQL/Firestore)**: Lưu trữ đồng bộ "Nhật ký cây", "Lịch chăm sóc" và "Lịch sử chẩn đoán" lên mây. Người dùng đổi điện thoại không bị mất dữ liệu.
*   **Storage (AWS S3/Cloudinary)**: Nơi lưu trữ hình ảnh lá cây bị bệnh lớn do người dùng upload.

### 2. Trí tuệ Nhân tạo (AI Engine)
**Sử dụng kết hợp 2 giải pháp:**
*   **Cách 1 (Cloud AI API)**: Tích hợp thẳng **OpenAI GPT-4o Vision API** hoặc **PlantNet API**. Ứng dụng sẽ convert ảnh thành Base64, gửi lên Server, GPT-4o sẽ phân tích và trả JSON báo bệnh về cho điện thoại. Ưu điểm: Tích hợp cực nhanh, cực chuẩn.
*   **Cách 2 (On-Device ML)**: Tự huấn luyện mô hình **EfficientNetB0** (trên tập dữ liệu Plant Village) bằng Python/Keras. Mất vài tiếng train mạng nơ-ron, sau đó xuất file `.tflite` đưa thẳng vào thư mục App. Ưu điểm: Phân tích được bệnh cả khi *mất kết nối mạng Internet*. 

### 3. Tự động hoá (Automation & Cron Jobs)
*   Sử dụng **Expo Push Notifications**: Thiết lập một Backend Node.js/Express nhỏ chạy Cron Job quét thời gian.
*   Mỗi 7:00 sáng, Backend sẽ trigger API gửi thông báo đẩy (Push Notification) "Đã đến giờ tưới cây!" xuống điện thoại người dùng dựa trên lịch chăm sóc.

---

## 🔮 Các tính năng sẽ phát triển (Future Roadmap)

| Giai đoạn | Tính năng | Mô tả chi tiết |
| :--- | :--- | :--- |
| **Phase 1** | **🔌 Kết nối AI Thật** | Tích hợp OpenAI Vision để ảnh scan ra kết quả thật 100%. Bỏ chế độ Mock Data. |
| **Phase 1** | **👤 Hệ thống Tài khoản** | Chặn các tính năng lưu trữ nếu chưa Đăng nhập. Đồng bộ dữ liệu real-time. |
| **Phase 2** | **🔔 Push Notification** | Cảnh báo tưới cây, bón phân qua Thông báo đẩy hệ thống của iOS/Android. |
| **Phase 2** | **📍 GPS & Thời tiết động** | Xin quyền Location để lấy API Thời tiết chính xác theo vị trí đứng của User. |
| **Phase 3** | **📷 Mạng xã hội/Cộng đồng** | Thêm tab "Cộng đồng" cho phép người dùng đăng ảnh khoe cây/hỏi đáp với nhau. |
| **Phase 3** | **🏥 AI Treatment Tracker** | "Soi" lại cái lá sau 3 ngày bón thuốc để AI đánh giá xem cây đang hồi phục hay tệ đi. |

---

## 🛠️ Công nghệ & Thư viện sử dụng

| Công nghệ | Mô tả |
|---|---|
| **React Native** | Framework phát triển giao diện chính |
| **Expo SDK 54** | Nền tảng biên dịch & cung cấp APIs (Camera, ImagePicker, Haptics) |
| **TypeScript** | Đảm bảo tính nhất quán và chặt chẽ của mã nguồn |
| **Zustand** | Quản lý state toàn cục (Global State) |
| **Reanimated 3** | Xử lý các hiệu ứng chuyển động 60fps (Mượt hơn Animated mặc định) |
| **Lottie React Native**| Chạy file ảnh vector chuyển động JSON |

---

## 📂 Cấu trúc thư mục định hướng

- `src/screens/`: Chứa các màn hình (Trang chủ, Camera, Auth, Nhật ký...).
- `src/components/`: Thành phần tái sử dụng (NutBam, TheThuyTinh, KhungXuongLoader...).
- `src/services/`: (Sẽ cập nhật) Các layer gọi API Backend & AI thay vì Mocking.
- `src/theme/`: Hệ thống Màu sắc và Font chữ Typography dùng chung.
- `src/store/`: Quản lý logic đồng bộ (Zustand).

---

## 🚀 Hướng dẫn khởi chạy

```bash
# 1. Clone dự án
git clone <repository-url>
cd PlantCare_AI

# 2. Cài đặt thư viện
npm install

# 3. Khởi chạy Server
npm start
```

Nhấn `a` để chạy trên Android Emulator, Nhấn `i` để khởi động iOS Simulator. Quét mã QR bằng ứng dụng **Expo Go** để trải nghiệm trên điện thoại thật.
