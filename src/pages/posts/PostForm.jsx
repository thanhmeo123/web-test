// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function PostForm({ mode }) {
//   const navigate = useNavigate();
//   const { id } = useParams(); // lấy id từ route
//   const [postData, setPostData] = useState({
//     title: "",
//     body: "",
//   });

//   useEffect(() => {
//     if (mode === "edit" && id) {
//       // Lấy bài từ localStorage nếu có
//       const saved = JSON.parse(localStorage.getItem("posts") || "[]");
//       const post = saved.find((p) => p.id === parseInt(id));
//       if (post) {
//         setPostData({ title: post.title, body: post.body });
//       } else {
//         // Nếu không tìm thấy localStorage thì có thể fetch từ API
//         fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
//           .then((res) => res.json())
//           .then((data) => setPostData({ title: data.title, body: data.body }));
//       }
//     }
//   }, [mode, id]);

//   const handleChange = (e) => {
//     setPostData({ ...postData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (mode === "create") {
//       const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(postData),
//       });
//       const newPost = await res.json();
//       newPost.id = Date.now(); // fake ID

//       const saved = JSON.parse(localStorage.getItem("posts") || "[]");
//       localStorage.setItem("posts", JSON.stringify([newPost, ...saved]));
//     }

//     if (mode === "edit") {
//       // update localStorage
//       const saved = JSON.parse(localStorage.getItem("posts") || "[]");
//       const updated = saved.map((p) =>
//         p.id === parseInt(id) ? { ...p, ...postData } : p
//       );
//       localStorage.setItem("posts", JSON.stringify(updated));
//     }

//     navigate("/posts");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">
//         {mode === "create" ? "Thêm bài viết" : "Sửa bài viết"}
//       </h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="title"
//           value={postData.title}
//           onChange={handleChange}
//           placeholder="Tiêu đề"
//           className="w-full border px-3 py-2 rounded"
//         />
//         <textarea
//           name="body"
//           value={postData.body}
//           onChange={handleChange}
//           placeholder="Nội dung"
//           className="w-full border px-3 py-2 rounded"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           {mode === "create" ? "Thêm" : "Cập nhật"}
//         </button>
//       </form>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function PostForm({ mode = "create" }) {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");

//   useEffect(() => {
//     if (mode === "edit") {
//       const updated = saved.map((p) =>
//         p.id === parseInt(id)
//           ? { ...p, title, body } // giữ nguyên userId, username
//           : p
//       );
//       localStorage.setItem("posts", JSON.stringify(updated));
//     }
//   }, [id, mode]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title || !body) return alert("Vui lòng nhập đầy đủ thông tin");

//     const saved = JSON.parse(localStorage.getItem("posts") || "[]");

//     if (mode === "create") {
//       const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//       const newPost = {
//         id: Date.now(),
//         title,
//         body,
//         userId: currentUser?.id || null,
//         username: currentUser?.username || "Ẩn danh",
//       };
//       saved.push(newPost);
//       localStorage.setItem("posts", JSON.stringify(saved));
//     } else if (mode === "edit") {
//       const updated = saved.map((p) =>
//         p.id === parseInt(id) ? { ...p, title, body } : p
//       );
//       localStorage.setItem("posts", JSON.stringify(updated));
//     }

//     navigate("/posts");
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">
//         {mode === "create" ? "Thêm bài viết" : "Sửa bài viết"}
//       </h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Tiêu đề"
//           className="border p-2 rounded w-full"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Nội dung"
//           className="border p-2 rounded w-full h-32"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//         />
//         <div className="flex gap-3">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             {mode === "create" ? "Thêm bài viết" : "Cập nhật"}
//           </button>
//           <button
//             type="button"
//             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//             onClick={() => navigate("/posts")}
//           >
//             ← Quay lại
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function PostForm({ mode = "create" }) {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");

//   useEffect(() => {
//     // Check login
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));
//     if (!currentUser) {
//       alert("Vui lòng đăng nhập để thực hiện chức năng này!");
//       navigate("/login");
//       return;
//     }

//     // Nếu edit thì load dữ liệu cũ
//     if (mode === "edit") {
//       const saved = JSON.parse(localStorage.getItem("posts") || "[]");
//       const post = saved.find((p) => p.id === parseInt(id));
//       if (post) {
//         setTitle(post.title);
//         setBody(post.body);
//       }
//     }
//   }, [id, mode, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title || !body) {
//       alert("Vui lòng nhập đầy đủ thông tin");
//       return;
//     }

//     const saved = JSON.parse(localStorage.getItem("posts") || "[]");
//     const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//     if (!currentUser) {
//       alert("Bạn cần đăng nhập!");
//       navigate("/login");
//       return;
//     }

//     if (mode === "create") {
//       const newPost = {
//         id: Date.now(),
//         title,
//         body,
//         userId: currentUser.id,
//         username: currentUser.username,
//       };
//       saved.push(newPost);
//       localStorage.setItem("posts", JSON.stringify(saved));
//     } else if (mode === "edit") {
//       const updated = saved.map((p) =>
//         p.id === parseInt(id) ? { ...p, title, body } : p
//       );
//       localStorage.setItem("posts", JSON.stringify(updated));
//     }

//     navigate("/posts");
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">
//         {mode === "create" ? "Thêm bài viết" : "Sửa bài viết"}
//       </h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Tiêu đề"
//           className="border p-2 rounded w-full"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Nội dung"
//           className="border p-2 rounded w-full h-32"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//         />
//         <div className="flex gap-3">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             {mode === "create" ? "Thêm bài viết" : "Cập nhật"}
//           </button>
//           <button
//             type="button"
//             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//             onClick={() => navigate("/posts")}
//           >
//             ← Quay lại
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// export default function PostForm({ mode = "create" }) {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { user } = useAuth(); // 👈 dùng AuthContext

//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");

//   useEffect(() => {
//     if (mode === "edit") {
//       const saved = JSON.parse(localStorage.getItem("posts") || "[]");
//       const found = saved.find((p) => p.id === parseInt(id));
//       if (found) {
//         setTitle(found.title);
//         setBody(found.body);
//       }
//     }
//   }, [id, mode]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title || !body) return alert("Vui lòng nhập đầy đủ thông tin");

//     if (!user) {
//       alert("Bạn cần đăng nhập để đăng bài!");
//       navigate("/login");
//       return;
//     }

//     const saved = JSON.parse(localStorage.getItem("posts") || "[]");

//     if (mode === "create") {
//       const newPost = {
//         id: Date.now(),
//         title,
//         body,
//         userId: user.id,
//         username: user.username,
//       };
//       saved.push(newPost);
//       localStorage.setItem("posts", JSON.stringify(saved));
//     } else if (mode === "edit") {
//       const updated = saved.map((p) =>
//         p.id === parseInt(id) ? { ...p, title, body } : p
//       );
//       localStorage.setItem("posts", JSON.stringify(updated));
//     }

//     navigate("/posts");
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">
//         {mode === "create" ? "Thêm bài viết" : "Sửa bài viết"}
//       </h2>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Tiêu đề"
//           className="border p-2 rounded w-full"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <textarea
//           placeholder="Nội dung"
//           className="border p-2 rounded w-full h-32"
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//         />
//         <div className="flex gap-3">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//           >
//             {mode === "create" ? "Thêm bài viết" : "Cập nhật"}
//           </button>
//           <button
//             type="button"
//             className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//             onClick={() => navigate("/posts")}
//           >
//             ← Quay lại
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PostForm({ mode = "create" }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (mode === "edit") {
      const saved = JSON.parse(localStorage.getItem("posts") || "[]");
      const found = saved.find((p) => p.id === parseInt(id));
      if (found) {
        setTitle(found.title);
        setBody(found.body);
      }
    }
  }, [id, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return alert("Vui lòng nhập đầy đủ thông tin");

    if (!user) {
      alert("Bạn cần đăng nhập để đăng bài!");
      navigate("/login");
      return;
    }

    const saved = JSON.parse(localStorage.getItem("posts") || "[]");

    if (mode === "create") {
      const newPost = {
        id: Date.now(),
        title,
        body,
        userId: user.id,
        username: user.username,
        createdAt: new Date().toLocaleString("vi-VN", {
          dateStyle: "short",
          timeStyle: "short",
        }), // ✅ thêm ngày giờ
      };
      saved.push(newPost);
      localStorage.setItem("posts", JSON.stringify(saved));
    } else if (mode === "edit") {
      const updated = saved.map((p) =>
        p.id === parseInt(id)
          ? { ...p, title, body } // giữ nguyên createdAt + createdTime
          : p
      );
      localStorage.setItem("posts", JSON.stringify(updated));
    }

    navigate("/posts");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        {/* Tiêu đề */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {mode === "create" ? "✍️ Thêm bài viết mới" : "📝 Cập nhật bài viết"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Tiêu đề */}
          <input
            type="text"
            placeholder="Tiêu đề bài viết"
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg w-full outline-none transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Nội dung */}
          <textarea
            placeholder="Nội dung bài viết"
            className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg w-full h-40 outline-none transition resize-none"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 shadow transition"
            >
              {mode === "create" ? "Thêm bài viết" : "Cập nhật"}
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-500 shadow transition"
              onClick={() => navigate("/posts")}
            >
              ← Quay lại
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
