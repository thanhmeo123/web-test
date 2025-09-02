// src/tests/CommentForm.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import CommentForm from "../components/comments/CommentForm";

// Mock useAuth trả về currentUser
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    currentUser: { username: "TestUser" },
  }),
}));

function renderWithRouter(ui, { route = "/posts/1" } = {}) {
  window.history.pushState({}, "Test page", route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/posts/:id" element={ui} />
      </Routes>
    </MemoryRouter>
  );
}

describe("CommentForm", () => {
  test("render textarea and buttons", () => {
    renderWithRouter(<CommentForm />);

    expect(
      screen.getByPlaceholderText(/Viết bình luận.../i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Gửi bình luận/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Hủy/i })).toBeInTheDocument();
  });

  test("typing in textarea", () => {
    renderWithRouter(<CommentForm />);

    const textarea = screen.getByPlaceholderText(/Viết bình luận.../i);
    fireEvent.change(textarea, { target: { value: "Nội dung test" } });

    expect(textarea.value).toBe("Nội dung test");
  });
});
