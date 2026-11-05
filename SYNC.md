# Đồng bộ nhật ký pha lên Google Sheet và Drive

Trang [journal.html](journal.html) lưu dữ liệu trong trình duyệt của điện thoại. Đó là chỗ yếu nhất của nó: mất máy, xoá dữ liệu trình duyệt, hoặc iOS dọn IndexedDB sau bảy ngày không mở là mất sạch.

Phần đồng bộ dưới đây đẩy mỗi lần pha lên **một Google Sheet của bạn** và ảnh bã lên **một thư mục Drive của bạn**. Từ đó dữ liệu nằm ở Google, mở được bằng app Sheet trên bất kỳ máy nào, và không phụ thuộc cái điện thoại.

Không có server của cuốn sách ở giữa. Bạn tự dựng máy nhận, trong tài khoản của bạn, mất khoảng 5 phút.

Bản đọc trên web — ba bước có hình dung, câu hỏi hay gặp, và cách xử lý khi hỏng: [guide.html](guide.html). Tệp bạn đang đọc dành cho người sửa code.

## Ba bước phía Google

**1. Tạo một Google Sheet trống.** Tên gì cũng được. Trong Sheet: **Extensions → Apps Script**.

**2. Dán [tools/apps-script/Code.gs](tools/apps-script/Code.gs) vào `Code.gs`** (xoá nội dung mẫu trước), rồi đổi dòng đầu:

```js
const TOKEN = "DAN-TOKEN-CUA-BAN-VAO-DAY";
```

thành một chuỗi ngẫu nhiên của riêng bạn, dài ít nhất 20 ký tự:

```bash
openssl rand -hex 24
```

Đừng dùng chuỗi mẫu — script từ chối chạy khi còn chuỗi mẫu. **Đừng commit token** vào repo: nó chỉ cần nằm trong script của bạn và trong cài đặt của điện thoại.

**3. Deploy → New deployment → Web app**:

| Ô | Giá trị |
|---|---|
| Execute as | **Me** |
| Who has access | **Anyone** |

Bấm **Deploy**, cho phép quyền (Sheet + Drive), rồi copy **URL kết thúc bằng `/exec`**.

> Vì sao "Anyone": trang nhật ký là trang tĩnh, không có đăng nhập Google, nên trình duyệt không gửi được danh tính. Để "Anyone with Google account" thì mọi lần đẩy đều hỏng. Thứ chặn truy cập là **token**, không phải quyền của deployment — xem mục bảo mật bên dưới.

## Hai việc phía điện thoại

Mở `journal.html` → mục **Đồng bộ Google Sheet (tuỳ chọn)** → dán URL và token → **Lưu cấu hình** → **Kiểm tra kết nối**.

Thấy `Kết nối được. Sheet: Nhật ký pha` là xong. Từ đó:

- Mỗi lần bấm **Lưu lần pha này**, dòng được đẩy lên ngay (1–2 giây).
- Mất mạng thì bản ghi vẫn nằm trong máy và mang nhãn **chưa đẩy**; lần sau mở trang, nó tự đẩy lại.
- **Đẩy lên Sheet** đẩy tay toàn bộ hàng chờ.

Cấu hình nằm trong `localStorage` của trình duyệt đó (`nuocba.journal.sync`), không nằm trong trang, nên mở trang ở máy khác thì cần dán lại một lần.

## Ai ghi dòng nào

Trang không có đăng nhập, nên "của ai" được trả lời bằng dữ liệu chứ không bằng tài khoản: mỗi lần pha mang theo **mã nhật ký** (sinh tự động trong trình duyệt lần đầu mở trang) và **tên người ghi** bạn đặt ở ô “Nhật ký của ai”. Hai thứ đó thành hai cột cuối trong Sheet.

- **Mặc định nên theo: mỗi người một Sheet.** Deploy `Code.gs` vào Sheet của chính mình. Khi đó mọi dòng đều là của bạn; hai cột kia chỉ để đối chiếu khi bạn dùng nhiều máy.
- **Dùng chung một Sheet** (vợ/chồng, bạn cùng phòng): ai có URL và token thì ghi được vào cùng Sheet, và cột “Người ghi” cho biết dòng nào của ai. Trùng tên thì đối chiếu “Mã nhật ký”.
- Trong trang, bản ghi do nhật ký khác ghi — nhập từ bản sao của người khác — mang nhãn tên người đó; bản ghi của chính máy này thì không có nhãn gì.

Đây là **định danh, không phải phân quyền**. Không ai bị chặn ghi đè lên dòng của người khác nếu biết id, và token vẫn là bí mật chung của cả nhóm. Muốn tách hẳn quyền thì mỗi người deploy một `Code.gs` với token riêng, trỏ vào Sheet riêng.

## Cái gì rơi vào đâu

- **Sheet "Nhật ký pha"** — một hàng một lần pha, đúng thứ tự cột trong `HEADER` của `Code.gs`: id, ngày, cà, ngày sau rang, cà/nước, tỉ lệ, nhiệt, xay, dụng cụ, tổng/rút (giây), bã, bốn trục vị, ghi chú, **URL ảnh**, mốc cập nhật, mã nhật ký, tên người ghi, **các bước rót** (một ô, dạng `0:00/30 · 0:45/120`; để trống nếu lần pha không ghi bước). Tự tạo khi lần đẩy đầu tiên chạy; sheet đã có từ trước thì hai cột mới được điền tiêu đề vào lần đẩy kế tiếp, không phải tạo lại sheet.
- **Folder "Brewing Bible — ảnh bã"** trong Drive — ảnh JPEG 1200 px, tên dạng `2026-11-03_ethiopia-guji_ba.jpg`. Folder riêng tư theo mặc định; mở được từ link trong Sheet vì bạn là chủ.

**Ghi theo `id`, không phải ghi thêm.** Máy nhận tìm dòng có cùng id: có thì cập nhật, chưa có thì thêm. Nhờ vậy đẩy lại (mất mạng, đóng tab giữa lúc đẩy, bấm hai lần) không sinh dòng trùng, và sửa một lần pha trên điện thoại thì Sheet cũng được sửa theo.

Ảnh chỉ được tải lên lần đẩy đầu. Sửa lại ghi chú không tạo thêm tệp trong Drive; đổi ảnh thì ảnh mới được tải lên và URL trong dòng được thay.

## Bảo mật: nói thẳng nó chặn được gì

Mô hình này là **"không ai biết", không phải "bảo mật"** — cùng kiểu với cách cuốn sách này vẫn nói về giới hạn.

- Người có **URL `/exec`** mà không có token thì không ghi được gì: mọi request đều bị từ chối. Script cũng **không có lệnh đọc** — không `doGet` trả dữ liệu — nên lộ URL cũng không lấy được nhật ký của bạn.
- Người có **cả URL và token** thì ghi được: thêm dòng, hoặc cập nhật một dòng nếu biết id. Vì vậy đừng dán token vào chat, ảnh chụp màn hình, hay commit.
- Token lộ thì đổi `TOKEN` trong `Code.gs` và **deploy phiên bản mới** (xem dưới), rồi dán token mới vào điện thoại. Dữ liệu cũ không bị ảnh hưởng.
- Request đi qua máy chủ Google; nội dung là dữ liệu pha cà của bạn và đường dẫn ảnh. Không có gì khác rời khỏi điện thoại.
- Script chạy dưới quyền của bạn nên nó chạm được vào Drive của bạn — nếu bạn không đọc code thì đừng dán code của người khác. Bản trong repo này chỉ tạo một folder và ghi một Sheet, cả hai đều theo tên cố định ở đầu tệp.

## Giới hạn đã biết

- **Một chiều.** Đẩy lên chứ không kéo về. Điện thoại mới thì dựng lại bằng **Xuất bản sao (.html)** / **Nhập bản sao**, không phải từ Sheet. Muốn kéo về thì ảnh trong Drive phải mở quyền chia sẻ, và đó là một đánh đổi khác — chưa làm.
- **Chậm.** Mỗi lần đẩy 1–2 giây vì Apps Script khởi động lại mỗi request. Vì thế trang đẩy tuần tự và không chặn việc lưu.
- **Quota.** Apps Script miễn phí có hạn mức mỗi ngày (thời gian chạy và số lần gọi). Một người uống ba ly mỗi ngày thì không bao giờ chạm tới.
- **Hai tab cùng lúc** có thể đẩy hai lần; máy nhận ghi theo id nên kết quả vẫn đúng một dòng.
- **Đổi code thì phải deploy phiên bản mới.** Deploy → Manage deployments → bút chì → Version: **New version** → Deploy. Chỉ bấm Save trong editor thì URL cũ vẫn chạy code cũ — đây là lỗi phổ biến nhất khi sửa Apps Script.

## Kiểm tra nhanh bằng dòng lệnh

Thay cả ba chỗ in hoa rồi chạy:

```bash
curl -s -X POST "URL_EXEC_CUA_BAN" \
  -H "Content-Type: text/plain" \
  -d '{"token":"TOKEN_CUA_BAN","kind":"ping"}'
```

Ra `{"ok":true,"pong":true,"sheet":"Nhật ký pha"}` là máy nhận sống. Ra `{"ok":false,"error":"Sai token."}` là token lệch — chép lại đúng chuỗi trong `Code.gs`, không có khoảng trắng thừa.
