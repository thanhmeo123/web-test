export const useAuth = () => ({
  user: { username: "MockUser" },
  currentUser: { username: "MockUser" },
  login: vi.fn(),
  logout: vi.fn(),
  register: vi.fn(),
});
