# 🌿 PlantCare AI

Ứng dụng di động thông minh hỗ trợ chẩn đoán bệnh cây trồng bằng trí tuệ nhân tạo, được xây dựng với **React Native** và **Expo**.

---

## 📱 Tính năng chính

- 🔍 **Chẩn đoán bệnh cây** – Chụp ảnh hoặc chọn ảnh từ thư viện để AI phân tích và chẩn đoán bệnh
- 📋 **Chi tiết bệnh** – Xem thông tin chi tiết về từng loại bệnh, nguyên nhân và cách điều trị
- 🏠 **Trang chủ thông minh** – Giao diện trực quan, dễ sử dụng
- 👤 **Quản lý tài khoản** – Đăng ký, đăng nhập và quản lý hồ sơ cá nhân
- 🎨 **Hỗ trợ Dark/Light mode** – Giao diện thích ứng với chế độ hiển thị của thiết bị

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Phiên bản |
|---|---|
| React Native | 0.81.5 |
| Expo SDK | ~54.0.0 |
| React | 19.1.0 |
| TypeScript | ~5.9.2 |
| React Navigation | v7 |
| Zustand | ^5.0.3 |
| Axios | ^1.7.9 |
| Lottie React Native | ^7.1.0 |

---

## 📂 Cấu trúc thư mục

```
Do_An/
├── assets/             # Ảnh, icon, animation
├── src/
│   ├── animations/     # File Lottie animation
│   ├── components/     # Các component dùng chung
│   ├── hooks/          # Custom hooks
│   ├── navigation/     # Cấu hình điều hướng
│   ├── screens/        # Các màn hình của ứng dụng
│   ├── services/       # Gọi API backend
│   ├── store/          # Quản lý state (Zustand)
│   ├── theme/          # Màu sắc, typography
│   ├── types/          # Định nghĩa TypeScript
│   └── utils/          # Hàm tiện ích, hằng số
├── App.tsx             # Điểm vào ứng dụng
├── app.json            # Cấu hình Expo
├── babel.config.js
├── package.json
└── tsconfig.json
```

---

## 🚀 Hướng dẫn cài đặt & chạy

### Yêu cầu
- [Node.js](https://nodejs.org/) >= 18
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [Expo Go](https://expo.dev/go) trên điện thoại (để test nhanh)

### Cài đặt

```bash
# 1. Clone repository
git clone <repository-url>
cd Do_An

# 2. Cài đặt dependencies
npm install
```

### Chạy ứng dụng

```bash
# Khởi động Expo dev server
npm start

# Chạy trên Android
npm run android

# Chạy trên iOS
npm run ios

# Chạy trên Web
npm run web
```

Sau khi chạy `npm start`, quét QR Code bằng ứng dụng **Expo Go** trên điện thoại để xem kết quả.

---

## 🔧 Cấu hình môi trường

Tạo file `.env` tại thư mục gốc và điền các biến sau:

```
EXPO_PUBLIC_API_URL=https://your-api-url.com
```

---

## 📦 Build ứng dụng

```bash
# Build APK cho Android
eas build --platform android

# Build IPA cho iOS
eas build --platform ios
```

> Yêu cầu cài đặt [EAS CLI](https://docs.expo.dev/eas/): `npm install -g eas-cli`

---

## 📄 Giấy phép

Dự án này được phát triển cho mục đích đồ án tốt nghiệp.
