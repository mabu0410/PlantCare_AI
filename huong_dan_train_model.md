# Hướng dẫn tự train model AI chẩn đoán bệnh cây

Nếu bạn muốn tự làm Model AI từ A-Z để đưa vào báo cáo đồ án (giúp điểm cao hơn và tự chủ công nghệ), thì đây là lộ trình chuẩn nhất dành cho bài toán Hình ảnh (Image Classification) trên thiết bị di động.

---

## 1. Chọn Model Architecture (Kiến trúc Model)

Với đồ án nhận diện bệnh qua ảnh chạy trên điện thoại (Mobile App), bạn **KHÔNG NÊN** dùng các model quá to và nặng nề như ResNet152 hay VGG16 vì chúng chạy chậm và tốn tài nguyên.

Thay vào đó, bạn **HÃY DÙNG** một trong các kiến trúc được tối ưu riêng cho Mobile sau:

### Lựa chọn 1: EfficientNet (B0 đến B3) - Đề xuất cho độ chính xác cao
*   **Tại sao nên dùng:** EfficientNet là một kiến trúc hiện đại (ra mắt năm 2019 bởi Google), sử dụng kỹ thuật *Compound Scaling* để cân bằng hoàn hảo giữa chiều sâu, chiều rộng và độ phân giải của mạng neural. Nó thường cho **độ chính xác (Accuracy) cao hơn hẳn MobileNetV2** trên các tập dữ liệu phức tạp như bệnh lá cây, trong khi số lượng tham số (Parameters) vẫn giữ ở mức tương đối nhỏ.
*   **Phiên bản khuyên dùng:** **EfficientNetB0** (nhẹ nhất, tham số khoảng 5.3M) hoặc **EfficientNetB1** (tham số khoảng 7.8M). Không nên dùng từ B4 trở lên vì sẽ quá nặng cho điện thoại.
*   **Điểm mạnh:** Cực kỳ tốt trong việc bóc tách các đặc trưng (features) nhỏ trên lá cây (ví dụ: phân biệt đốm do vi khuẩn và đốm do nấm).
*   **Điểm yếu:** Thời gian train (huấn luyện) lâu hơn MobileNetV2 một chút và dung lượng file `.tflite` xuất ra sẽ nhỉnh hơn (khoảng 20-30MB so với 14MB của MobileNet). Tốc độ suy luận (inference) trên điện thoại chậm hơn vài phần nghìn giây (hầu như không cảm nhận được).

### Lựa chọn 2: MobileNetV2 - Đề xuất cho tốc độ siêu nhanh
*   **Tại sao:** Rất nhẹ (chỉ khoảng 14MB), tốc độ suy luận (inference) cực nhanh trên cả những máy điện thoại cấu hình yếu.
*   **Cách làm:** Sử dụng **Transfer Learning** (Học chuyển giao).

---

## 2. Quy trình làm (Workflow chuẩn với EfficientNetB0)

### Bước 1: Chuẩn bị Dữ liệu (Dataset) - 50% sự thành bại
Model của bạn khôn hay ngu phụ thuộc vào việc này.
*   **Nguồn dữ liệu:** Lên trang **Kaggle.com** tìm kiếm từ khóa `"Plant Village Dataset"`.
*   **Chia Data:** Chia thành 3 tập: `Train` (80%), `Validation` (10%), `Test` (10%).

### Bước 2: Viết code Train Model bằng Python (Sử dụng EfficientNetB0)
Vào **Google Colab**, tạo một Notebook mới (nó cho bạn xài GPU T4 miễn phí) và code bằng **TensorFlow / Keras**.

**Sườn code cơ bản (TensorFlow/Keras với EfficientNetB0):**
```python
import tensorflow as tf
from tensorflow.keras.applications import EfficientNetB0
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model

# 1. Load Data bằng ImageDataGenerator (nhớ làm Data Augmentation: xoay ảnh, lật ảnh)
# [Thêm code chuẩn bị datagen ở đây]

# 2. Định nghĩa số loại bệnh chẩn đoán
SO_LUONG_BENH = 10 

# 3. Load pre-trained EfficientNetB0 (bỏ phần Top classification)
base_model = EfficientNetB0(
    weights='imagenet', 
    include_top=False, 
    input_shape=(224, 224, 3) # EfficientNetB0 tối ưu cho kích thước 224x224
)

# Đóng băng (Freeze) các lớp cũ để giữ kiến thức ban đầu (transfer learning)
base_model.trainable = False 

# 4. Thêm các lớp mới (Classifier Head) cho bài toán nhận diện lá cây của bạn
x = base_model.output
x = GlobalAveragePooling2D()(x)

# Thêm Dropout để chống Overfitting (học vẹt) - Rất quan trọng với EfficientNet
x = Dropout(0.2)(x) 

predictions = Dense(SO_LUONG_BENH, activation='softmax')(x)

# Lắp ghép lại thành model hoàn chỉnh
model = Model(inputs=base_model.input, outputs=predictions)

# 5. Compile & Train Phase 1 (Chỉ train lớp mới thêm vào)
model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3), 
              loss='categorical_crossentropy', 
              metrics=['accuracy'])

# Bắt đầu vòng lặp huấn luyện thứ nhất
history = model.fit(train_dataset, validation_data=val_dataset, epochs=10)

# 6. Fine-Tuning Phase (Mở băng một phần model gốc để train sâu hơn)
# Bước này giúp EfficientNet thích nghi hoàn toàn với ảnh lá cây
base_model.trainable = True

# Chỉ mở băng 20 layers cuối cùng, giữ nguyên các layer đầu
for layer in base_model.layers[:-20]:
    layer.trainable = False

# Compile lại với learning_rate rất nhỏ để không làm hỏng trọng số
model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5), 
              loss='categorical_crossentropy', 
              metrics=['accuracy'])

# Train tiếp tục
history_fine = model.fit(train_dataset, validation_data=val_dataset, epochs=10)

# 7. Lưu model
model.save('plant_disease_efficientnet.h5')
```

### Bước 3: Đưa Model chạy lên App React Native (Deployment)

#### Cách 1: Chạy trực tiếp trên Điện thoại (On-device Inference với TensorFlow Lite)
*   **Chuyển đổi:** Dùng lệnh chuyển file `.h5` thành `.tflite`:
    ```python
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    # Tối ưu hóa kích thước bằng Quatization (Tuỳ chọn nhưng rất khuyên dùng)
    converter.optimizations = [tf.lite.Optimize.DEFAULT] 
    tflite_model = converter.convert()
    
    with open('model_efficientnet_b0.tflite', 'wb') as f:
        f.write(tflite_model)
    ```
*   **Tích hợp vào React Native:** 
    * Cài thư viện `react-native-fast-tflite`.
    * Copy file `.tflite` vào thư mục `assets` của app.
    * Khi code nhận diện, bạn cần nhớ resize ảnh do người dùng chụp về exacly `224x224` pixel trước khi truyền mảng byte vào model.

#### Cách 2: Chạy trên Server (Cloud API) - API Inference
*   Viết 1 đoạn code Python (dùng FastAPI) bọc cái `model.predict()`.
*   Deploy lên con VPS hoặc dịch vụ mây (Heroku/Render).
*   App React Native chỉ việc gọi API gửi ảnh lên và nhận JSON về. 

---

## 3. Lời khuyên cho đồ án với EfficientNet

1. **Chuẩn hóa đầu vào (Input Normalization):** Điểm đặc biệt của EfficientNet trong TensorFlow là nó **đã tích hợp sẵn** lớp Rescaling bên trong kiến trúc model (tự động chia pixel cho 255.0). Điều này nghĩa là bạn CÓ THỂ ĐẨY TRỰC TIẾP ảnh gốc với giá trị pixel `[0, 255]` vào model mà không cần tự viết hàm chia thủ công. Hãy chắc chắn đọc kỹ docs của thư viện bạn đang dùng để tránh chuẩn hóa 2 lần làm sai lệch kết quả!
2. **Transfer Learning + Fine-tuning:** Với EfficientNet, bí quyết đạt độ chính xác >95% là phải thực hiện kỹ thuật Fine-tuning (như code ở Bước 2) chứ đừng chỉ train mỗi lớp Dense cuối cùng.
3. Không chọn B2 trở lên trừ khi dữ liệu lá cây của bạn thực sự quá độ phân giải cao và khó nhận dạng. B0 là điểm giao thoa hoàn hảo nhất.
