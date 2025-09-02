// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Captcha from "../components/Captcha";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { validateUsername, validatePassword } from "../utils/validation";

// export default function Register() {
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [captchaInput, setCaptchaInput] = useState("");
//   const [captchaCode, setCaptchaCode] = useState("");
//   const [errors, setErrors] = useState({
//     username: "",
//     password: "",
//     captcha: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const usernameError = validateUsername(username);
//     const passwordError = validatePassword(password);
//     const captchaError =
//       captchaInput !== captchaCode ? "CAPTCHA không đúng!" : "";

//     if (usernameError || passwordError || captchaError) {
//       setErrors({
//         username: usernameError,
//         password: passwordError,
//         captcha: captchaError,
//       });
//       return;
//     }

//     const success = register(username, password);
//     if (success) navigate("/login");
//   };

//   const isDisabled = !username || !password || !captchaInput;

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Đăng ký</h2>
//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           {/* Username */}
//           <div className="flex flex-col">
//             <input
//               type="text"
//               placeholder="Username"
//               className={`border p-2 rounded w-full ${
//                 errors.username ? "border-red-500" : ""
//               }`}
//               value={username}
//               onChange={(e) => {
//                 setUsername(e.target.value);
//                 setErrors((prev) => ({
//                   ...prev,
//                   username: validateUsername(e.target.value),
//                 }));
//               }}
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1">{errors.username}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div className="flex flex-col">
//             <div className="relative w-full">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className={`border p-2 rounded w-full pr-10 ${
//                   errors.password ? "border-red-500" : ""
//                 }`}
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                   setErrors((prev) => ({
//                     ...prev,
//                     password: validatePassword(e.target.value),
//                   }));
//                 }}
//               />
//               <button
//                 type="button"
//                 tabIndex={-1}
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>

//           {/* Captcha */}
//           <div className="flex flex-col">
//             <Captcha
//               value={captchaInput}
//               onChange={(val, code) => {
//                 setCaptchaInput(val);
//                 setCaptchaCode(code);
//                 setErrors((prev) => ({
//                   ...prev,
//                   captcha: val !== code ? "CAPTCHA không đúng!" : "",
//                 }));
//               }}
//             />
//             {errors.captcha && (
//               <p className="text-red-500 text-sm mt-1">{errors.captcha}</p>
//             )}
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={isDisabled}
//             className={`p-2 rounded text-white font-semibold ${
//               isDisabled
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-green-500 hover:bg-green-600"
//             }`}
//           >
//             Đăng ký
//           </button>
//         </form>
//         <p className="text-sm text-center mt-4">
//           Bạn đã có tài khoản?{" "}
//           <button
//             onClick={() => navigate("/login")}
//             className="text-green-500 hover:underline"
//           >
//             Đăng nhập
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Captcha from "../components/Captcha";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  validateUsername,
  validatePassword,
  validateEmail,
} from "../utils/validation";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    captcha: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const captchaError =
      captchaInput !== captchaCode ? "CAPTCHA không đúng!" : "";

    if (usernameError || emailError || passwordError || captchaError) {
      setErrors({
        email: emailError,
        username: usernameError,
        password: passwordError,
        captcha: captchaError,
      });
      return;
    }

    // Đúng thứ tự: email, username, password
    const success = register(email, username, password);
    if (success) navigate("/login");
  };

  const isDisabled = !username || !email || !password || !captchaInput;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          ✨ Đăng ký
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              autoComplete="email"
              className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({
                  ...prev,
                  email: validateEmail(e.target.value),
                }));
              }}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Tên đăng nhập"
              autoComplete="username"
              className={`border p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-green-400 ${
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
                autoComplete="new-password"
                className={`border p-3 rounded-lg w-full pr-10 focus:outline-none focus:ring-2 focus:ring-green-400 ${
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
                : "bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg"
            }`}
          >
            Đăng ký
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Bạn đã có tài khoản?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-500 font-medium hover:underline"
          >
            Đăng nhập ngay
          </button>
        </p>
      </div>
    </div>
  );
}
