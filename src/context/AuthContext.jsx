// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [accounts, setAccounts] = useState(() => {
//     return JSON.parse(localStorage.getItem("accounts") || "[]");
//   });
//   const [user, setUser] = useState(() => {
//     return JSON.parse(localStorage.getItem("currentUser") || "null");
//   });

//   // Save accounts
//   useEffect(() => {
//     localStorage.setItem("accounts", JSON.stringify(accounts));
//   }, [accounts]);

//   // Save currentUser
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("currentUser", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("currentUser");
//     }
//   }, [user]);

//   // Fake hash (demo)
//   const fakeHash = (password) => btoa(password);

//   // Validate Username
//   const validateUsername = (username) => {
//     const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{4,19}$/;
//     return usernameRegex.test(username);
//   };

//   // Validate Password
//   const validatePassword = (password) => {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
//     return passwordRegex.test(password);
//   };

//   const register = (username, password) => {
//     if (!validateUsername(username)) {
//       alert(
//         "❌ Username không hợp lệ!\n- 5-20 ký tự\n- Bắt đầu bằng chữ cái\n- Chỉ chứa chữ, số, gạch dưới (_)\n- Không chứa khoảng trắng hoặc ký tự đặc biệt."
//       );
//       return false;
//     }

//     if (!validatePassword(password)) {
//       alert(
//         "❌ Password không hợp lệ!\n- Ít nhất 8 ký tự\n- Có chữ hoa, chữ thường, số và ký tự đặc biệt."
//       );
//       return false;
//     }

//     const normalizedUsername = username.trim();

//     const exists = accounts.find(
//       (acc) => acc.username.toLowerCase() === normalizedUsername.toLowerCase()
//     );
//     if (exists) {
//       alert("❌ Tài khoản đã tồn tại!");
//       return false;
//     }

//     setAccounts([
//       ...accounts,
//       { username: normalizedUsername, password: fakeHash(password) },
//     ]);
//     alert("✅ Đăng ký thành công! Mời bạn đăng nhập.");
//     return true;
//   };

//   const login = (username, password) => {
//     const exists = accounts.find(
//       (acc) =>
//         acc.username.toLowerCase() === username.trim().toLowerCase() &&
//         acc.password === fakeHash(password)
//     );

//     if (!exists) {
//       alert("❌ Sai username hoặc password!");
//       return false;
//     }

//     const token = "fake-jwt-token-" + Date.now();
//     const currentUser = { username: exists.username, token };
//     setUser(currentUser);
//     return true;
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, register, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useState, useEffect } from "react";
// import {
//   validateUsername,
//   validatePassword,
//   validateEmail,
// } from "../utils/validation";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [accounts, setAccounts] = useState(() => {
//     return JSON.parse(localStorage.getItem("accounts") || "[]");
//   });
//   const [user, setUser] = useState(() => {
//     return JSON.parse(localStorage.getItem("currentUser") || "null");
//   });

//   // Save accounts
//   useEffect(() => {
//     localStorage.setItem("accounts", JSON.stringify(accounts));
//   }, [accounts]);

//   // Save currentUser
//   useEffect(() => {
//     if (user) {
//       localStorage.setItem("currentUser", JSON.stringify(user));
//     } else {
//       localStorage.removeItem("currentUser");
//     }
//   }, [user]);

//   // Fake hash (demo)
//   const fakeHash = (password) => btoa(password);

//   // Register
//   const register = (email, username, password) => {
//     const emailError = validateEmail(email);
//     const usernameError = validateUsername(username);
//     const passwordError = validatePassword(password);

//     if (emailError || usernameError || passwordError) {
//       alert(emailError || usernameError || passwordError);
//       return false;
//     }

//     const normalizedUsername = username.trim();
//     const normalizedEmail = email.trim();

//     // Check tồn tại (an toàn với ?. để tránh undefined)
//     const exists = accounts.find(
//       (acc) =>
//         acc.username?.toLowerCase() === normalizedUsername.toLowerCase() ||
//         acc.email?.toLowerCase() === normalizedEmail.toLowerCase()
//     );

//     if (exists) {
//       alert("❌ Username hoặc Email đã tồn tại!");
//       return false;
//     }

//     // Thêm tài khoản mới
//     setAccounts([
//       ...accounts,
//       {
//         id: Date.now(),
//         email: normalizedEmail,
//         username: normalizedUsername,
//         password: fakeHash(password),
//       },
//     ]);

//     alert("✅ Đăng ký thành công! Mời bạn đăng nhập.");
//     return true;
//   };

//   // Login
//   const login = (usernameOrEmail, password) => {
//     const exists = accounts.find(
//       (acc) =>
//         (acc.username.toLowerCase() === usernameOrEmail.trim().toLowerCase() ||
//           acc.email.toLowerCase() === usernameOrEmail.trim().toLowerCase()) &&
//         acc.password === fakeHash(password)
//     );

//     if (!exists) {
//       alert("❌ Sai username/email hoặc password!");
//       return false;
//     }

//     const token = "fake-jwt-token-" + Date.now();
//     const currentUser = {
//       id: exists.id, // ✅ thêm id vào đây
//       username: exists.username,
//       email: exists.email,
//       token,
//     };
//     setUser(currentUser);
//     return true;
//   };

//   //logout
//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, register, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useState, useEffect } from "react";
import {
  validateUsername,
  validatePassword,
  validateEmail,
} from "../utils/validation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accounts, setAccounts] = useState(() => {
    return JSON.parse(localStorage.getItem("accounts") || "[]");
  });

  const [user, setUser] = useState(() => {
    // ✅ Khôi phục currentUser từ localStorage khi app khởi động
    return JSON.parse(localStorage.getItem("currentUser") || "null");
  });

  // Save accounts
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts));
  }, [accounts]);

  // Save currentUser
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  // Fake hash
  const fakeHash = (password) => btoa(password);

  // Register
  const register = (email, username, password) => {
    const emailError = validateEmail(email);
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (emailError || usernameError || passwordError) {
      alert(emailError || usernameError || passwordError);
      return false;
    }

    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim();

    const exists = accounts.find(
      (acc) =>
        acc.username?.toLowerCase() === normalizedUsername.toLowerCase() ||
        acc.email?.toLowerCase() === normalizedEmail.toLowerCase()
    );

    if (exists) {
      alert("❌ Username hoặc Email đã tồn tại!");
      return false;
    }

    setAccounts([
      ...accounts,
      {
        id: Date.now(),
        email: normalizedEmail,
        username: normalizedUsername,
        password: fakeHash(password),
      },
    ]);

    alert("✅ Đăng ký thành công! Mời bạn đăng nhập.");
    return true;
  };

  // Login
  const login = (usernameOrEmail, password) => {
    const exists = accounts.find(
      (acc) =>
        (acc.username.toLowerCase() === usernameOrEmail.trim().toLowerCase() ||
          acc.email.toLowerCase() === usernameOrEmail.trim().toLowerCase()) &&
        acc.password === fakeHash(password)
    );

    if (!exists) {
      alert("❌ Sai username/email hoặc password!");
      return false;
    }

    const token = "fake-jwt-token-" + Date.now();
    const currentUser = {
      id: exists.id,
      username: exists.username,
      email: exists.email,
      token,
    };

    // ✅ cập nhật state + lưu ngay vào localStorage
    setUser(currentUser);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    return true;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
