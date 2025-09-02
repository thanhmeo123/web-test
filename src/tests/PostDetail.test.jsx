import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PostDetail from "../pages/posts/PostDetail";
import { vi } from "vitest";

// Mock useAuth để có user
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({ user: { username: "TestUser" } }),
}));

describe("PostDetail", () => {
  beforeEach(() => {
    // tạo dữ liệu giả trong localStorage
    const fakePosts = [
      {
        id: 1,
        title: "Bài viết test",
        body: "Nội dung test",
        username: "TestUser",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("posts", JSON.stringify(fakePosts));
    localStorage.setItem("comments", JSON.stringify([]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("render post detail page", () => {
    render(
      <MemoryRouter initialEntries={["/posts/1"]}>
        <Routes>
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // kiểm tra tiêu đề & nội dung bài viết
    expect(screen.getByText("Bài viết test")).toBeInTheDocument();
    expect(screen.getByText("Nội dung test")).toBeInTheDocument();

    // kiểm tra heading "Bình luận (...)"
    expect(
      screen.getByRole("heading", { name: /Bình luận/i })
    ).toBeInTheDocument();
  });
});
