import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Search from "../../components/Search";
import PostItem from "../../components/posts/PostItem";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Search & Sort
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // ✅ Pagination
  const [page, setPage] = useState(1);
  const limit = 5; // số bài trên mỗi trang

  // Load dữ liệu từ localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts") || "[]");
    const savedComments = JSON.parse(localStorage.getItem("comments") || "[]");
    setPosts(savedPosts);
    setComments(savedComments);
  }, []);

  // Lọc theo search
  const filtered = searchKeyword.trim()
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          p.body.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : posts;

  // Sắp xếp theo sortBy
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (sortBy === "comments") {
      const countA = comments.filter((c) => c.postId === a.id).length;
      const countB = comments.filter((c) => c.postId === b.id).length;
      return countB - countA;
    }
    return 0;
  });

  // ✅ Pagination logic
  const totalPages = Math.ceil(sorted.length / limit);
  const paginatedPosts = sorted.slice((page - 1) * limit, page * limit);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = (id) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const handleDeleteAll = () => {
    setPosts([]);
    localStorage.setItem("posts", "[]");
  };

  const handleAddPost = () => {
    if (!user) {
      alert("Bạn cần đăng nhập để thêm bài viết!");
      navigate("/login");
    } else {
      navigate("/posts/new");
    }
  };

  const handleAddComment = (postId, text) => {
    const newComment = {
      id: Date.now(),
      postId,
      text,
      username: user?.username || "Ẩn danh",
      createdAt: new Date().toISOString(),
    };

    const updated = [...comments, newComment];
    setComments(updated);
    localStorage.setItem("comments", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-200 via-white to-blue-300">
      {/* Header */}
      <div className="bg-gray-800 text-white p-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1
            className="text-lg font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            My Blog
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            {user ? (
              <>
                <span className="text-sm sm:text-base">
                  Xin chào, {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-500 rounded hover:bg-red-600 w-full sm:w-auto"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600 w-full sm:w-auto"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-3 py-1 bg-green-500 rounded hover:bg-green-600 w-full sm:w-auto"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Nội dung */}
      <div className="flex-1 p-4 max-w-3xl mx-auto w-full">
        {/* Chức năng bài viết */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-3">
          <h1 className="text-2xl font-bold">Danh sách bài viết</h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={handleAddPost}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
            >
              + Thêm bài viết
            </button>
            <button
              onClick={handleDeleteAll}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full sm:w-auto"
            >
              Xóa tất cả
            </button>
          </div>
        </div>

        {/* Search */}
        <Search onSearch={setSearchKeyword} onSort={setSortBy} />

        {/* Danh sách bài viết */}
        <ul className="space-y-6 mt-4">
          {paginatedPosts.map((post) => {
            const postComments = comments.filter((c) => c.postId === post.id);
            return (
              <PostItem
                key={post.id}
                post={post}
                comments={postComments}
                onDelete={handleDelete}
                onAddComment={handleAddComment}
              />
            );
          })}
        </ul>

        {sorted.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            Không tìm thấy bài viết nào.
          </p>
        )}

        {/* Pagination */}
        {sorted.length > 0 && (
          <div className="flex justify-center items-center gap-3 mt-6 flex-wrap">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              ← Trang trước
            </button>
            <span className="text-sm sm:text-base">
              Trang {page} / {totalPages || 1}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Trang sau →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
