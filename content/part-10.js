window.BOOK_PARTS = window.BOOK_PARTS || [];

/* Phần cuối sách. Như phần mở đầu, nó KHÔNG đánh số chương: lời cảm ơn không
   phải chương 32, và nếu nó lấy số thì bìa phải ghi lại số chương.
   book.js / print.js / build-epub.mjs đọc cờ back để xử lý riêng. */
window.BOOK_PARTS.push({
  id: "cuoi-sach",
  roman: "B",
  back: true,
  title: "Cuối sách",
  blurb: "Những người đã giúp cuốn sách này thành hình",
  chapters: [

  {
    id: "ch-loi-cam-on",
    title: "Lời cảm ơn",
    lede: "Cuốn sách này không tự viết ra. Đây là những người đã làm nó tốt hơn, và những công trình nó đứng lên.",
    minutes: 4,
    tags: [],
    body: `
<p>Mình cảm ơn từng người ở đây, và nói rõ vì sao. Việc được nêu tên không có nghĩa họ đồng ý với mọi câu trong sách.</p>

<h3>Thầy cà phê</h3>

<p>Anh <strong>Nguyễn Tấn Mạnh Lân</strong>, chủ quán <strong>Cop Coffee Crafter</strong> ở Biên Hoà, là người thầy cà phê đầu tiên của mình. Mình đến với anh để học latte, chưa phải pour over. Cuốn sách này bắt đầu từ những buổi đứng quầy đó.</p>

<h3>Người cho mình cảm hứng</h3>

<p><strong>Lance Hedrick</strong> đã cho mình rất nhiều cảm hứng, và đó là lý do anh ấy đứng ở đây chứ không ở danh sách bên dưới. Những video của anh dẫn mình tới nhiều thí nghiệm trong sách, kể cả phép thử phin đôi. Các công thức ít lần rót của anh được bàn ở chương 17.</p>

<h3>Những công trình cuốn sách dựa vào</h3>

<p>Cảm ơn <strong>Jonathan Gagné</strong> (Coffee ad Astra): bài năm 2019 của anh là một trong những phân tích chi tiết nhất về mô hình chiết, và chính anh ghi rõ phần gắn với cảm quan là suy đoán, điều đó làm cho phần còn lại đáng tin hơn. Các bài về bột mịn và bypass của anh cũng nằm dưới chương 10 và chương 15.</p>

<p>Cảm ơn <strong>Scott Rao</strong>: các bài về bột mịn, về độ sâu lớp bã và về phễu không bypass đã định hướng thí nghiệm phin và chương hình học phễu. Đó là kinh nghiệm hành nghề, không phải nghiên cứu, và sách dẫn đúng như vậy.</p>

<p>Cảm ơn <strong>James Hoffmann</strong>: cách pha nhiều lần rót nhỏ được phân tích ở chương 18. Cảm ơn <strong>Tetsu Kasuya</strong> cho phương pháp 4:6 như một hệ thống chỉnh theo khẩu vị, cũng ở chương 17.</p>

<p>Cảm ơn <strong>Christopher Hendon</strong> cho phần hoá học của nước ở chương 4, và cảm ơn nhóm <strong>UC Davis Coffee Center</strong>, Batali, Ristenpart, Guinard và cộng sự, cho những nghiên cứu cảm quan về TDS, mức chiết, nhiệt độ và phân đoạn thời gian mà chương 7, 8 và 9 dựa vào. Phần lớn những chỗ sách phải sửa lại chính mình là nhờ các bài đó.</p>

<div class="callout">
<p class="callout-title">Về những người không có tên ở đây</p>
<p>Cuốn sách còn nợ những người mình chưa xin phép nêu tên, và mình thà thiếu một cái tên còn hơn thêm một cái tên không đúng. Nếu bạn thấy mình quên ai, đó là lỗi của mình, không phải của họ.</p>
</div>
`
  }

  ]
});
