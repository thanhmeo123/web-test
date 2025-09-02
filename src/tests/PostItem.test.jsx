import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import PostItem from "../components/posts/PostItem";

const fakePost = {
  id: 1,
  title: "Hello",
  body: "World",
  username: "Admin",
  createdAt: new Date(),
};
const fakeComments = [{ id: 1, text: "Nice post!", username: "User" }];

describe("PostItem", () => {
  test("render post title and content", () => {
    render(
      <MemoryRouter>
        <PostItem
          post={fakePost}
          comments={fakeComments}
          onDelete={vi.fn()} // ✅ đổi jest.fn() -> vi.fn()
          onAddComment={vi.fn()}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Hello/i)).toBeInTheDocument();
    expect(screen.getByText(/World/i)).toBeInTheDocument();
    expect(screen.getByText(/Nice post!/i)).toBeInTheDocument();
  });
});
