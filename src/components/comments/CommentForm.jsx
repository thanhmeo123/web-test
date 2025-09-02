import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CommentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [text, setText] = useState("");

  // 🚀 Chuyển hướng trong useEffect
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Vui lòng nhập bình luận!");
      return;
    }

    const savedComments = JSON.parse(localStorage.getItem("comments") || "[]");

    const newComment = {
      id: Date.now(),
      postId: String(id),
      text,
      username: currentUser.username,
      createdAt: new Date().toISOString(),
    };

    const updated = [...savedComments, newComment];
    localStorage.setItem("comments", JSON.stringify(updated));

    navigate(`/posts/${id}`);
  };

  if (!currentUser) return null; // tránh render lúc chưa có user

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Viết bình luận mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* ✅ Textarea có aria-label để test tìm thấy */}
          <textarea
            aria-label="comment-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition outline-none"
            rows="4"
            placeholder="Viết bình luận..."
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-blue-600 transition"
            >
              Gửi bình luận
            </button>
            <button
              type="button"
              onClick={() => navigate(`/posts/${id}`)}
              className="px-4 py-2 bg-gray-300 text-gray-800 font-medium rounded-lg shadow hover:bg-gray-400 transition"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
