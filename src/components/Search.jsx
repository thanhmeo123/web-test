import { useState, useEffect } from "react";

export default function Search({ onSearch, onSort }) {
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("date");

  // chỉ gọi khi keyword khác rỗng
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(keyword);
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, onSearch]);

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    onSort(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      {/* Ô tìm kiếm */}
      <div className="relative flex-1">
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          🔍
        </span>
        <input
          type="text"
          placeholder="Tìm kiếm bài viết..."
          value={keyword}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
        />
      </div>

      {/* Bộ lọc sắp xếp */}
      <select
        value={sortBy}
        onChange={handleSortChange}
        className="border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
      >
        <option value="date">Ngày đăng</option>
        <option value="comments">Số lượng bình luận</option>
      </select>
    </div>
  );
}
