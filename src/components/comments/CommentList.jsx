export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-500 mb-2">Chưa có bình luận nào.</p>;
  }

  return (
    <ul className="space-y-4 mb-6">
      {comments.map((c) => {
        const displayName = c.username || c.name || "Ẩn danh";
        const content = c.text || c.body || "";
        const key = c.id ? `comment-${c.id}` : `comment-${Date.now()}`;
        const firstLetter = displayName.charAt(0).toUpperCase();

        return (
          <li
            key={key}
            className="flex items-start gap-3 border rounded-lg bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Avatar giả */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold">
              {firstLetter}
            </div>

            {/* Nội dung */}
            <div className="flex-1">
              <p className="font-semibold text-sm text-gray-800">
                {displayName}
              </p>
              {c.email && <p className="text-xs text-gray-500">{c.email}</p>}
              <p className="text-gray-700 mt-1 text-sm">{content}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
