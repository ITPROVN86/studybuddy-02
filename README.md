# StudyBuddy – ReactJS

Chuyển từ bộ HTML Stitch thành một ứng dụng React 18, React Router 6, Vite và Tailwind CSS biên dịch tại lúc build (không dùng Tailwind CDN).

## Chạy trên máy

Cài Node.js 20.19+ hoặc 22.12+. Mở terminal tại thư mục chứa package.json:

```bash
npm install
npm run dev
```

Mở địa chỉ được terminal hiển thị, mặc định http://127.0.0.1:5173.
Không mở index.html trực tiếp bằng cách nhấp đúp.

## Build để đưa lên hosting

```bash
npm run build
npm run preview
```

Đưa toàn bộ nội dung thư mục dist lên static hosting. Router dùng URL hash nên không cần cấu hình rewrite. Vite dùng base tương đối để chạy trong thư mục con.

## Các màn hình

| URL | Component | Nội dung |
| --- | --- | --- |
| #/trang-chu | src/pages/Home.jsx | Danh sách bài học, tìm kiếm và bộ lọc |
| #/the-ghi-nho | src/pages/Flashcards.jsx | Giao diện thẻ 3D, lật thẻ, tiến độ, bookmark, phím tắt |
| #/trac-nghiem-quiz | src/pages/Quiz.jsx | Giao diện quiz, chọn đáp án và đồng hồ |
| #/tro-ly-ai-chat | src/pages/Chat.jsx | Giao diện trợ lý, gợi ý câu hỏi |
| #/hoc-nhom | src/main.jsx | Thông báo chờ phát triển vì nguồn không có thiết kế |

Hai trang nguồn trang_ch_danh_m_c_b_i_h_c và studybuddy_learning_platform trùng nhau nên gộp thành Home.
Menu đầu trang, chân trang, các nút Flashcard/Quiz trong bài học đã nối với router. Tham số lesson được giữ trong URL để mở rộng sau này. Thêm menu cuộn ngang cho màn hình nhỏ.

## Cấu trúc

- src/main.jsx: điểm khởi động và khai báo route.
- src/pages/: các component JSX chuyển từ HTML, giữ nội dung và lớp CSS gốc.
- src/behaviors/: tương tác JavaScript của từng trang được tách riêng; timer và listener được dọn khi chuyển trang.
- src/styles.css: Tailwind và CSS gốc.
- tailwind.config.js: bảng màu, font, khoảng cách từ bộ thiết kế.
- dist/: bản production đã build sẵn.

## Phạm vi và giới hạn

Đây là chuyển đổi giao diện frontend, giữ mức chức năng demo của bộ HTML đầu vào. Chưa có backend, đăng nhập, cơ sở dữ liệu, AI thực tế, PDF hay phòng học nhóm. Gửi câu hỏi sẽ thông báo chưa kết nối AI. Các nút chuyển thẻ trong bản gốc chỉ cập nhật tiến độ, chưa có ngân hàng 25 thẻ; quiz vẫn sử dụng câu hỏi mẫu, điểm số mẫu và các thông báo demo. Tham số lesson chưa tải dữ liệu riêng cho từng bài. Các liên kết tài nguyên chưa có nội dung sẽ hiện thông báo.

Ảnh và font vẫn tải từ các URL gốc của Google, cần Internet; các URL ảnh có thể hết hiệu lực. Muốn chạy độc lập hoàn toàn cần tải ảnh/font về public và đổi đường dẫn.

## Kiểm tra

Đã chạy thành công npm install và npm run build. Kiểm tra mã nguồn xác nhận các route nội bộ và handler React. Không xác nhận kiểm thử giao diện trình duyệt tự động vì môi trường chạy chặn khởi động Chromium.
