# Quy ước dịch The Brewing Bible

Bản gốc là tiếng Việt (`content/part-*.js`). Bản dịch nằm ở `content/en/text.js` và
`content/ja/text.js`, chỉ dùng cho bản web — PDF và EPUB vẫn là tiếng Việt.

## Nguyên tắc

1. **Không đổi số liệu.** Nhiệt độ, tỉ lệ, thời gian, ppm, phần trăm — chép nguyên.
2. **Không bỏ hàng bảng, không gộp đoạn.** Cấu trúc HTML phải khớp bản gốc: cùng số
   `<table>`, `<li>`, `<strong>`, `.callout`, `.steps`.
3. **Giữ nhãn bằng chứng.** Ba mức được dịch cố định (xem dưới), không diễn giải lại.
4. **Một thuật ngữ, một cách gọi.** Bảng dưới là nguồn duy nhất; thêm từ mới thì thêm
   vào đây trước khi dùng.
5. **Giọng văn:** câu ngắn, trực tiếp, không quảng cáo. Bản gốc nói "bạn", bản dịch
   nói "you" / 「〜です」thống nhất, không lên giọng dạy đời.

## Thuật ngữ

| Tiếng Việt | English | 日本語 |
|---|---|---|
| bã (cà) | bed (coffee bed) | 粉床（コーヒーベッド） |
| ly / tách | cup | カップ |
| con cà (một loại cà) | coffee / a coffee | コーヒー豆（その豆） |
| hạt xanh | green bean | 生豆 |
| mức rang | roast level | 焙煎度 |
| rang sáng / trung bình / đậm | light / medium / dark roast | 浅煎り／中煎り／深煎り |
| độ tươi | freshness | 鮮度 |
| thoát khí | degassing | ガス抜き |
| bloom (ủ) | bloom | 蒸らし |
| chiết xuất | extraction | 抽出 |
| chiết thiếu / chiết dư | under-extracted / over-extracted | 抽出不足／過抽出 |
| tỉ lệ | ratio | 比率 |
| cỡ xay | grind size | 挽き目 |
| khuấy | agitation / stir | 撹拌（かくはん） |
| rót | pour | 注湯 |
| dòng chảy ưu tiên | channelling | チャネリング |
| ngâm (immersion) | immersion | 浸漬 |
| chảy qua (percolation) | percolation | 透過 |
| phễu | dripper | ドリッパー |
| giấy lọc | filter paper | ペーパーフィルター |
| ấm / kettle | kettle | ケトル |
| nước | water | 湯（抽出時）／水 |
| độ kiềm (alkalinity) | alkalinity | アルカリ度 |
| độ cứng | hardness | 硬度 |
| TDS | TDS | TDS |
| cupping | cupping | カッピング |
| nốt hương | flavour note | フレーバーノート |
| hậu vị | finish / aftertaste | 後味 |
| độ ngọt | sweetness | 甘さ |
| vị chua | acidity / sourness | 酸味 |
| vị đắng | bitterness | 苦味 |
| xác thịt (body) | body | ボディ |
| khẩu vị | palate | 味覚 |
| giống | variety | 品種 |
| sơ chế | processing | 精製方法 |
| sơ chế ướt / khô / honey | washed / natural / honey | ウォッシュト／ナチュラル／ハニー |
| vùng trồng | region | 産地 |
| độ cao | altitude | 標高 |

## Ba nhãn bằng chứng

| Việt | English | 日本語 | Nghĩa |
|---|---|---|---|
| Bằng chứng | Evidence | 根拠あり | Có nghiên cứu công bố hoặc lý thuyết chắc chắn |
| Hợp lý | Plausible | 理にかなう | Cơ chế đúng, chưa có nghiên cứu kiểm soát |
| Truyền miệng | Folklore | 伝聞 | Được lặp lại nhiều, không ai kiểm chứng |

## Kiểm tra trước khi commit

```bash
node tools/check-i18n.mjs
```

Script so từng chương dịch với bản gốc: số bảng, số `<li>`, số `<strong>`, số đoạn,
và độ dài trong khoảng ±25%. Lệch thì báo lỗi — thường là dấu hiệu bị bỏ sót một hàng
bảng hoặc một đoạn.
