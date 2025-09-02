📝 Blog App

Ứng dụng blog đơn giản cho phép người dùng đăng ký, đăng nhập, tạo bài viết, bình luận và quản lý nội dung cá nhân.

🚀 Cài đặt & chạy project
Yêu cầu

Node.js >= 18

npm hoặc yarn

Cài đặt

# clone repo

git clone https://github.com/your-username/blog-app.git
cd blog-app

# cài dependencies

npm install

Chạy development
npm run dev

Ứng dụng sẽ chạy tại http://localhost:5173 (Vite).

Build production
npm run build
npm run preview

Chạy test
npm run test

✨ Tính năng chính

👤 Xác thực người dùng: đăng ký, đăng nhập, lưu session.

📝 Bài viết: thêm, sửa, xóa, xem chi tiết.

💬 Bình luận: thêm bình luận vào bài viết.

🔒 Phân quyền: chỉ tác giả mới được sửa / xóa bài viết hoặc bình luận của mình.

🎨 UI/UX hiện đại: responsive, dễ sử dụng.

📂 LocalStorage (hoặc API thật nếu cấu hình).

🔑 Luồng xác thực

Người dùng đăng ký → thông tin được lưu.

Khi đăng nhập thành công → lưu user vào localStorage (hoặc nhận JWT token từ API).

Các route yêu cầu đăng nhập (/create-post, /profile) sẽ kiểm tra currentUser.

Khi đăng xuất → xóa thông tin khỏi localStorage.

🌍 Demo

👉 Xem bản demo tại đây

🛠️ Công nghệ sử dụng

React + Vite

React Router v6

TailwindCSS (UI)

Vitest + React Testing Library (test)

React Query (tùy chọn, nếu kết nối API)
