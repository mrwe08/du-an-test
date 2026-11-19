# 🐟 FishMap VN - Bản Đồ Câu Cá & Kiểm Định Kỷ Lục AI (Anti-Cheat Engine)

> **Dự án Web App dành cho sinh viên**: Bản đồ các điểm câu cá tại Việt Nam tích hợp dự báo khí áp cắn câu, danh mục loài cá, bí quyết phối mồi, bảng xếp hạng kỷ lục cá to nhất và **Hệ thống AI 4 bước kiểm định chống gian lận ảnh mạng / zoom 0.5x**.

---

## 🌟 Tính Năng Nổi Bật

### 1. 📍 Bản Đồ Tương Tác Các Điểm Câu (Interactive Fishing Map)
- Sử dụng bản đồ vệ tinh/địa hình **Leaflet.js** định vị các hồ câu nổi tiếng trên khắp 3 miền (Hồ Tây, Đồng Đò, Trị An, Dầu Tiếng, Suối Hai, Hòa Bình, Đầm Sen, Tuy Lai, Sông Mây...).
- Phân loại trực quan: **Hồ tự nhiên**, **Hồ thủy lợi**, **Hồ câu dịch vụ sinh thái**.
- Khi chọn một hồ trên bản đồ:
  - Hiển thị danh sách các loài cá có trong hồ.
  - Gợi ý bài mồi bén nhất (mồi ốc vặn ủ trứng vịt lộn, mồi cám tanh vảy mực, bún ủ chua, mồi Lure...).
  - Độ sâu mặt nước, kinh nghiệm săn cá củ từ các cần thủ kỳ cựu.
  - Giá vé / phí dịch vụ chi tiết.

### 2. 🌦️ Dự Báo Khí Tượng & Khí Áp Cắn Câu (Solunar Fishing Barometer)
- **Áp suất khí quyển (Barometric Pressure - hPa)**: Yếu tố quyết định 80% hoạt động của cá (vì bóng khí của cá cực kỳ nhạy cảm với áp lực nước):
  - `1010 - 1015 hPa`: Áp suất vàng lý tưởng, cá rời bùn đi săn mồi mạnh nhất.
  - `< 1005 hPa`: Áp suất thấp báo bão, cá tức bóng khí, chìm sát bùn ngừng ăn.
- **Chỉ số cá cắn câu (Bite Score 0 - 100%)**: Tính toán tự động theo chu kỳ khí tượng và thời tiết.
- **Khung giờ vàng đi câu (Major & Minor Feeding Hours)**.

### 3. 📖 Cẩm Nang Loài Cá & Công Thức Ngư Học ($W = a \cdot L^b$)
- Bách khoa toàn thư về các loài cá nước ngọt & nước lợ phổ biến: Cá Trắm Đen, Cá Chép, Cá Tra Bò, Cá Quả (Lóc), Cá Trắm Cỏ, Cá Chẽm (Vược), Cá Lăng...
- Tích hợp chuẩn **FishBase Quốc tế** với hệ số sinh học $a, b$ cho từng loài để ước tính chính xác khối lượng dựa trên chiều dài:
  $$\text{Khối lượng } W (\text{gram}) = a \cdot L^b \quad (L \text{ tính bằng cm})$$

### 4. 🏆 Bảng Xếp Hạng Kỷ Lục Thủy Quái (Hall of Fame)
- Vinh danh các kỷ lục cá to, nặng nhất do cộng đồng cần thủ đăng tải.
- Mỗi kỷ lục được cấp **Mã chứng chỉ xác thực AI (Certificate Hash)** và tem chống gian lận.

### 5. 🍳 Bếp Cần Thủ - Gợi Ý Món Ngon Chế Biến Từ Cá (Culinary Guide)
- **Gợi ý món ngon chuẩn vị cần thủ cho từng loài cá**:
  - **Cá Trắm Đen**: Cá trắm đen nướng gỏi (cuốn lá sung, đinh lăng chấm chẻo cay nồng), Cá trắm đen kho riềng sả niêu đất 12 tiếng, Lẩu cá trắm dưa chua chuối đậu.
  - **Cá Chép**: Cá chép om dưa tóp mỡ béo ngậy, Cá chép giòn xào lăn sả ớt, Cháo cá chép hạt sen bồi bổ sức khỏe.
  - **Cá Tra Bò**: Cá tra bò áp chảo sốt bơ tỏi chanh vàng, Canh chua cá tra bông điên điển miền Tây, Cá tra kho tộ nước dừa.
  - **Cá Quả (Lóc)**: Cá lóc nướng trui rơm rạ đồng quê, Cá lóc kho tiêu niêu đất.
  - **Cá Lăng**: Chả cá lăng kiểu Lã Vọng (đảo chảo mỡ ngập thì là, ăn kèm bún và mắm tôm), Cá lăng nướng than riềng mẻ.
  - **Cá Chẽm & Hải Sản Biển Đảo**: Cá chẽm hấp xì dầu Hong Kong, Sashimi cá ngừ đại dương tươi sống wasabi, mắt cá ngừ tiềm thuốc bắc.
- **Tích hợp thông minh trong toàn ứng dụng**:
  - Xem ngay trong Cẩm nang Ngư học & Món ngon.
  - Tự động gợi ý món ngon kèm công thức ngay khi AI kiểm định xong chiến tích cá câu được.
  - Tra cứu nhanh các món có thể chế biến khi xem các loài cá trong từng hồ câu trên bản đồ.

---

## 🤖 Hệ Thống Kiểm Định AI Chống Gian Lận 4 Bước (FishVision AI)

Đáp ứng trọn vẹn yêu cầu khắt khe: **"Tuyệt đối không nhận ảnh mạng, nhận diện đúng con cá và góc chụp (kiểm tra zoom 0.5x ăn gian phối cảnh)"**:

```
[Ảnh Cần Thủ Tải Lên]
         │
         ▼
┌────────────────────────────────────────────────────────┐
│ BƯỚC 1: Quét Bản Quyền & Nguồn Ảnh Trên Mạng           │
│ • Đối chiếu Perceptual Hash (dHash) & Web Fingerprint  │
│ • Kiểm tra EXIF: Phát hiện ảnh tải từ Web/Stock/FB CDN │
└───────────────────────┬────────────────────────────────┘
                        │
         ┌──────────────┴──────────────┐
     [Ảnh Mạng]                   [Ảnh Hợp Lệ]
         │                             │
         ▼                             ▼
┌──────────────────┐    ┌──────────────────────────────────────────────┐
│  TỪ CHỐI NGAY    │    │ BƯỚC 2: Phân Tích Thấu Kính & Đo Đạc Sinh Học│
│ Không duyệt hồ sơ│    │ • Phát hiện thấu kính góc siêu rộng (zoom    │
│                  │    │   0.5x, tiêu cự < 20mm, quang sai barrel).   │
│                  │    │ • Phát hiện chiêu trò đẩy cá sát camera      │
│                  │    │   (forced perspective) so với đầu/vai.       │
│                  │    │ • Tự động giải mã & hiệu chỉnh về kích thước │
│                  │    │   chuẩn (Calibrated Length & Weight).        │
└──────────────────┘    └──────────────────────┬───────────────────────┘
                                               │
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │ BƯỚC 3: Đối Chiếu Khai Báo vs AI             │
                        │ • So sánh: Loài cá, Chiều dài (cm), Cân nặng │
                        │ • Tính toán % độ lệch:                       │
                        │   Δ% = |Cân nặng khai - Cân nặng AI| / AI    │
                        └──────────────────────┬───────────────────────┘
                                               │
                                               ▼
                        ┌──────────────────────────────────────────────┐
                        │ BƯỚC 4: Đánh Giá Dung Sai & Phán Quyết       │
                        │ • Ngưỡng dung sai chuẩn: 15%                 │
                        └──────────────┬───────────────────────────────┘
                                       │
                ┌──────────────────────┴──────────────────────┐
          [Δ% ≤ 15%]                                    [Δ% > 15%]
                │                                             │
                ▼                                             ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│  CHẤP THUẬN CẦN THỦ          │              │  ĐIỀU CHỈNH THEO SỐ LIỆU AI  │
│ Công nhận thông số cần thủ   │              │ Từ chối số liệu khai khống;  │
│ tự cân đo (dung sai hợp lý). │              │ ghi nhận theo cân nặng chuẩn │
│ Ghi danh Bảng Kỷ Lục.        │              │ do mô hình AI tính toán.     │
└──────────────────────────────┘              └──────────────────────────────┘
```

---

## 🧪 5 Kịch Bản Thử Nghiệm Trực Quan Được Cài Đặt Sẵn

Trong giao diện **"Kiểm Định AI & Đăng Cá"**, bạn có thể bấm chọn ngay 5 trường hợp mẫu để thuyết trình / demo đồ án:

1. 🟢 **Kịch bản 1: Cá Chép Chuẩn Thước Đo**:
   - Khai 6.2 kg / 68 cm. AI ước tính 6.0 kg.
   - Chênh lệch $3.3\% \le 15\%$ $\rightarrow$ **Chấp thuận số liệu của cần thủ**.
2. 🟡 **Kịch bản 2: Cá Trắm Đen Khai Khống Cân Nặng**:
   - Khai 15.0 kg, AI đo thực tế chỉ 7.5 kg.
   - Chênh lệch $100\% > 15\%$ $\rightarrow$ **Từ chối số liệu cần thủ, hạ về 7.5 kg của AI**.
3. 🟠 **Kịch bản 3: Gian Lận Zoom 0.5x / Đẩy Cá Sát Ống Kính**:
   - Chụp góc siêu rộng 13mm (0.5x) tạo ảo giác cá khổng lồ $2.45\times$.
   - AI cảnh báo quang sai, kích hoạt thuật toán khử méo thấu kính và hiệu chỉnh lại kích thước thực.
4. 🔴 **Kịch bản 4: Ảnh Lấy Trên Mạng (Shutterstock / Internet)**:
   - Quét dHash phát hiện trùng lặp $98.7\%$ với cơ sở dữ liệu ảnh có sẵn.
   - **Bị loại ngay lập tức tại Bước 1**.
5. 🟢 **Kịch bản 5: Thủy Quái Cá Tra Bò Khủng Đạt Chuẩn**:
   - Khai 18.5 kg, AI đo 19.1 kg (chênh $3.1\%$) $\rightarrow$ **Duyệt kỷ lục vinh danh**.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

Ứng dụng được lập trình hoàn toàn bằng **Python 3 chuẩn (Zero external pip dependencies)** và HTML5/CSS3/Vanilla JS hiện đại, đảm bảo chạy ngay lập tức trên mọi máy tính macOS/Windows/Linux:

### Bước 1: Mở Terminal và di chuyển vào thư mục dự án
```bash
cd /Users/admin/.gemini/antigravity/scratch/fishing-map-app
```

### Bước 2: Khởi động máy chủ web
```bash
python3 server.py
```

### Bước 3: Truy cập ứng dụng
Mở trình duyệt web bất kỳ (Chrome, Safari, Edge) và truy cập đường dẫn:
```
http://localhost:8080
```

---

## 📂 Cấu Trúc Mã Nguồn

```
fishing-map-app/
├── server.py              # Web server HTTP REST API (Python Native)
├── database.py            # Cơ sở dữ liệu SQLite lưu hồ câu, loài cá, kỷ lục
├── ai_engine.py           # Bộ não AI 4 bước: FishVision Engine & Allometric Bio
├── fishing_app.db         # Tệp cơ sở dữ liệu SQLite
├── README.md              # Tài liệu thuyết trình và hướng dẫn chi tiết
└── public/
    ├── index.html         # Giao diện chính (Tailwind CSS, HUD Scanner, Responsive)
    ├── styles.css         # Hiệu ứng quét laser, marker hồ câu, HUD radar
    └── app.js             # Logic bản đồ Leaflet, bộ lọc hồ, kiểm định thời gian thực
```
