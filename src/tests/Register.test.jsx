import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Register from "../pages/Register";

// ✅ Mock useAuth
vi.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    register: vi.fn(), // giả lập hàm register
    user: null,
  }),
}));

describe("Register Page", () => {
  test("render form fields", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/Tên đăng nhập/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Mật khẩu/i)).toBeInTheDocument();
  });

  test("typing works", () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    const usernameInput = screen.getByPlaceholderText(/Tên đăng nhập/i);
    fireEvent.change(usernameInput, { target: { value: "newuser" } });
    expect(usernameInput.value).toBe("newuser");
  });
});
