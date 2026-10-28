# The Brewing Bible

Một cuốn sách thực hành về **pour over** và **cupping** — 8 phần, 28 chương.

Đọc trực tuyến: **https://jajajou.github.io/brewing-bible/**

## Về cuốn sách

Phần lớn lời khuyên pha cà phê specialty là giả thuyết thủ công được lặp lại đủ lâu để thành niềm tin. Cuốn sách này tách rõ ba loại:

- **Bằng chứng** — có nghiên cứu công bố hoặc lý thuyết vật lý/hóa học chắc chắn
- **Hợp lý** — cơ chế đúng, nhưng chưa có nghiên cứu kiểm soát
- **Truyền miệng** — được lặp lại nhiều nhưng không ai kiểm chứng

Mỗi khẳng định trong sách đều được dán nhãn theo ba mức này.

## Mục lục

| Phần | Nội dung | Chương |
|---|---|---|
| I — Hạt | Bốn biến số có sẵn trước khi pha; mức rang; độ tươi | 3 |
| II — Nước | Alkalinity; cách đo; xử lý nước ở Việt Nam | 3 |
| III — Chiết xuất | Ba con số; huyền thoại "acid trước, đắng sau"; mô hình ba chiều | 3 |
| IV — Cupping | Nó đo gì; quy trình tại nhà; đọc ly; giới hạn | 4 |
| V — Pour over | Ngâm vs chảy; dụng cụ; kỹ thuật rót; công thức; đọc bã; chẩn đoán | 6 |
| VI — Cầu nối | Quy trình 20 phút; bốn luật của công thức nền; case study | 3 |
| VII — Cảm nhận | Giải phẫu một ngụm; ngôn ngữ nốt hương; xây khẩu vị | 3 |
| VIII — Sổ tay | Nhật ký pha; dụng cụ; checklist khi thất bại | 3 |

## Tính năng

- Mục lục cố định, theo dõi chương đang đọc và đánh dấu chương đã đọc (lưu trong máy)
- Tìm kiếm toàn văn, xếp hạng theo tiêu đề → lede → số lần lặp
- Chế độ tối, chỉnh cỡ chữ
- Thanh tiến độ đọc
- Điều hướng bằng phím ← → ; nhấn `/` để tìm
- **Bản in**: Ctrl/Cmd + P cho ra bản sách in sạch, mỗi chương sang trang mới

## Cấu trúc

```
index.html          khung trang
styles.css          toàn bộ giao diện
book.js             router, mục lục, tìm kiếm, tiến độ
content/part-*.js   nội dung 8 phần (dữ liệu JS)
```

Nội dung nằm trong các file `content/part-N.js` dưới dạng dữ liệu — thêm chương chỉ cần thêm một object vào mảng `chapters`.

## Chạy tại máy

Không cần build. Chỉ cần một static server:

```bash
python3 -m http.server 8137
```

Rồi mở http://127.0.0.1:8137/

## Giấy phép

Nội dung và mã nguồn: dùng tự do cho mục đích cá nhân và phi thương mại.
