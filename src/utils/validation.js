// Validate Username
export const validateUsername = (username) => {
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{4,19}$/;
  if (!username) return "Username không được để trống";
  if (!usernameRegex.test(username)) {
    return "❌ Username phải 5-20 ký tự, bắt đầu bằng chữ, chỉ chứa chữ, số hoặc _";
  }
  return "";
};

// Validate Password
export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!password) return "Password không được để trống";
  if (!passwordRegex.test(password)) {
    return "❌ Password tối thiểu 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt";
  }
  return "";
};

// Validate Email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email không được để trống";
  if (!emailRegex.test(email)) {
    return "❌ Email không hợp lệ. Ví dụ: example@gmail.com";
  }
  return "";
};
