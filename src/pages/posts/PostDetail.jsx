import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const found = savedPosts.find((p) => p.id === parseInt(id));
    setPost(found);

    const savedComments = JSON.parse(localStorage.getItem("comments") || "[]");
    setComments(savedComments.filter((c) => c.postId === parseInt(id)));
  }, [id]);

  if (!post) return <p>Bài viết không tồn tại.</p>;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Bạn cần đăng nhập để bình luận!");
      navigate("/login");
      return;
    }
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      postId: post.id,
      username: user.username,
      text: commentText,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(
      "comments",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("comments") || "[]"),
        newComment,
      ])
    );
    setCommentText("");
  };

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      {/* Nút quay lại */}
      <button
        onClick={() => navigate("/posts")}
        className="bg-gray-200 text-gray-700 px-3 py-2 sm:px-4 rounded-lg hover:bg-gray-300 transition mb-4 sm:mb-6 flex items-center gap-1"
      >
        ← Quay lại
      </button>

      {/* Bài viết */}
      <div className="bg-white rounded-2xl shadow p-5 sm:p-6 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
          {post.title}
        </h2>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {post.body}
        </p>
      </div>

      {/* Bình luận */}
      <div className="bg-white rounded-2xl shadow p-5 sm:p-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
          Bình luận ({comments.length})
        </h3>

        {comments.length > 0 ? (
          <ul className="space-y-3">
            {comments.map((c) => (
              <li
                key={c.id}
                className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0"
              >
                {/* Avatar chữ cái đầu */}
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold">
                  {c.username?.[0]?.toUpperCase() || "A"}
                </div>

                {/* Nội dung */}
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-800">
                      {c.username}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                      {new Date(c.createdAt).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                  </p>
                  <p className="text-gray-700 text-sm mt-1 break-words">
                    {c.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm sm:text-base">
            Chưa có bình luận nào. Hãy là người đầu tiên!
          </p>
        )}

        {/* Form bình luận */}
        <form
          onSubmit={handleAddComment}
          className="mt-4 flex flex-col sm:flex-row gap-2"
        >
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Viết bình luận..."
            className="flex-1 border rounded-lg p-2 text-sm sm:text-base focus:ring-2 focus:ring-green-400 outline-none"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Gửi
          </button>
        </form>

        {/* Nút chuyển form riêng */}
        <button
          onClick={() => navigate(`/posts/${post.id}/comment`)}
          className="mt-3 text-blue-500 hover:underline text-sm sm:text-base"
        >
          + Viết bình luận nâng cao
        </button>
      </div>
    </div>
  );
}
