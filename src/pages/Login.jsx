import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateUsername, validatePassword } from "../utils/validation";
import Captcha from "../components/Captcha"; // ✅ nhớ import Captcha

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    captcha: "",
  });
  const [loginError, setLoginError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const captchaError =
      captchaInput !== captchaCode ? "CAPTCHA không đúng!" : "";

    if (usernameError || passwordError || captchaError) {
      setErrors({
        username: usernameError,
        password: passwordError,
        captcha: captchaError,
      });
      return;
    }

    const success = login(username, password);
    if (success) navigate("/posts");
    else setLoginError("Sai username hoặc password!");
  };

  const isDisabled = !username || !password || !captchaInput;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🔑 Đăng nhập
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              autoComplete="username"
              className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  username: validateUsername(e.target.value),
                }));
              }}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mật khẩu"
                autoComplete="current-password"
                className={`border p-3 rounded-lg w-full pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((prev) => ({
                    ...prev,
                    password: validatePassword(e.target.value),
                  }));
                }}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Login error */}
          {loginError && (
            <p className="text-red-500 text-sm text-center">{loginError}</p>
          )}

          {/* Captcha */}
          <div>
            <Captcha
              value={captchaInput}
              onChange={(val, code) => {
                setCaptchaInput(val);
                setCaptchaCode(code);
                setErrors((prev) => ({
                  ...prev,
                  captcha: val !== code ? "CAPTCHA không đúng!" : "",
                }));
              }}
            />
            {errors.captcha && (
              <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`p-3 rounded-lg text-white font-semibold transition-all duration-300 ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg"
            }`}
          >
            Đăng nhập
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Bạn chưa có tài khoản?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 font-medium hover:underline"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
}
