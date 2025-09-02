import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostList from "../pages/posts/PostList";
import { vi } from "vitest";

// mock useAuth
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({ currentUser: { username: "TestUser" } }),
}));

describe("PostList", () => {
  test("render title Danh sách bài viết", () => {
    render(
      <MemoryRouter>
        <PostList />
      </MemoryRouter>
    );
    expect(screen.getByText(/Danh sách bài viết/i)).toBeInTheDocument();
  });
});
