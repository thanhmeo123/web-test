// import { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";

// export default function PostItem({ post, comments, onDelete }) {
//   const [openMenu, setOpenMenu] = useState(false);
//   const menuRef = useRef();

//   // ✅ Format ngày giờ
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleString("vi-VN", {
//       day: "2-digit",
//       month: "2-digit",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const truncate = (text, length = 100) =>
//     text.length > length ? text.slice(0, length) + "..." : text;

//   // Đóng menu khi click ra ngoài
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpenMenu(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <li className="border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow relative">
//       {/* Header: username + ngày giờ + menu */}
//       <div className="flex justify-between items-start">
//         <div className="text-sm text-gray-500">
//           {post.username || "Ẩn danh"} - {formatDate(post.createdAt)}
//         </div>
//         <div className="relative" ref={menuRef}>
//           <button
//             onClick={() => setOpenMenu((prev) => !prev)}
//             className="p-1 rounded-full hover:bg-gray-200"
//           >
//             ⋮
//           </button>
//           {openMenu && (
//             <div className="absolute right-0 mt-1 bg-white border rounded shadow-md z-10 w-28">
//               <Link
//                 to={`/posts/${post.id}`}
//                 className="block px-3 py-2 text-sm hover:bg-gray-100"
//               >
//                 Xem
//               </Link>
//               <Link
//                 to={`/posts/${post.id}/edit`}
//                 className="block px-3 py-2 text-sm hover:bg-gray-100"
//               >
//                 Sửa
//               </Link>
//               <button
//                 onClick={() => onDelete(post.id)}
//                 className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-gray-100"
//               >
//                 Xóa
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Tiêu đề + nội dung */}
//       <h3 className="font-semibold text-lg mt-2">{post.title}</h3>
//       <p className="text-gray-700">{truncate(post.body)}</p>

//       {/* Hiển thị bình luận */}
//       <div className="mt-4">
//         <h4 className="font-medium text-gray-800">Bình luận</h4>
//         <div className="space-y-2 mt-2">
//           {comments.length > 0 ? (
//             comments.map((c) => (
//               <div
//                 key={c.id}
//                 className="text-sm border-l-2 pl-2 border-gray-300"
//               >
//                 <span className="font-semibold">{c.username || "Ẩn danh"}</span>
//                 <p className="text-gray-600">› {c.text}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm">Chưa có bình luận</p>
//           )}
//         </div>
//       </div>
//     </li>
//   );
// }

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PostItem({ post, comments, onDelete, onAddComment }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [text, setText] = useState("");
  const menuRef = useRef();

  // ✅ Format ngày giờ
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const truncate = (text, length = 100) =>
    text.length > length ? text.slice(0, length) + "..." : text;

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(post.id, text);
    setText("");
  };

  return (
    <li className="border rounded-xl shadow-sm p-5 bg-white hover:shadow-md transition-all duration-300 relative">
      {/* Header: username + ngày giờ + menu */}
      <div className="flex justify-between items-start">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">
            {post.username || "Ẩn danh"}
          </span>{" "}
          · {formatDate(post.createdAt)}
        </div>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className="p-1 rounded-full hover:bg-gray-200 transition"
          >
            ⋮
          </button>
          {openMenu && (
            <div className="absolute right-0 mt-1 bg-white border rounded-lg shadow-lg z-10 w-32 overflow-hidden">
              <Link
                to={`/posts/${post.id}`}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                👁 Xem
              </Link>
              <Link
                to={`/posts/${post.id}/edit`}
                className="block px-4 py-2 text-sm hover:bg-gray-100"
              >
                ✏️ Sửa
              </Link>
              <button
                onClick={() => onDelete(post.id)}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                🗑 Xóa
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tiêu đề + nội dung */}
      <h3 className="font-semibold text-lg mt-3 text-gray-800">{post.title}</h3>
      <p className="text-gray-700 mt-1">{truncate(post.body)}</p>

      {/* Hiển thị bình luận */}
      <div className="mt-5">
        <h4 className="font-medium text-gray-800 text-sm flex items-center gap-1">
          💬 Bình luận
        </h4>
        <div className="space-y-2 mt-2">
          {comments.length > 0 ? (
            comments.map((c) => (
              <div
                key={c.id}
                className="text-sm border-l-4 pl-3 border-gray-200 bg-gray-50 rounded-r-md py-1"
              >
                <span className="font-semibold text-gray-700">
                  {c.username || "Ẩn danh"}
                </span>
                <p className="text-gray-600">› {c.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm italic">Chưa có bình luận</p>
          )}
        </div>

        {/* Form nhập bình luận trực tiếp */}
        <form onSubmit={handleSubmit} className="flex gap-2 mt-4 items-center">
          <input
            type="text"
            placeholder="Viết bình luận..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Gửi
          </button>
        </form>
      </div>
    </li>
  );
}
