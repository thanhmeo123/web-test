// tests/Login.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Login from "../pages/Login";
import { AuthProvider } from "../context/AuthContext";
import { MemoryRouter } from "react-router-dom";

function renderWithProviders(ui) {
  return render(
    <AuthProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </AuthProvider>
  );
}

describe("Login Page", () => {
  it("render form fields", () => {
    renderWithProviders(<Login />);

    expect(screen.getByPlaceholderText(/tên đăng nhập/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/mật khẩu/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /đăng nhập/i })
    ).toBeInTheDocument();
  });

  it("input works correctly", () => {
    renderWithProviders(<Login />);

    const username = screen.getByPlaceholderText(/tên đăng nhập/i);
    fireEvent.change(username, { target: { value: "demoUser" } });
    expect(username.value).toBe("demoUser");
  });
});
