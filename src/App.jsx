import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostList from "./pages/posts/PostList";
import PostDetail from "./pages/posts/PostDetail";
import PostForm from "./pages/posts/PostForm";
import RequireAuth from "./components/RequireAuth"; // ✅ thêm
import CommentForm from "./components/comments/CommentForm";

function App() {
  return (
    <Routes>
      {/* Trang gốc: redirect sang home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Các route cơ bản */}
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* CRUD posts */}
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route
        path="/posts/:id/comment"
        element={
          <RequireAuth>
            <CommentForm />
          </RequireAuth>
        }
      />
      {/* ✅ Chỉ cho user đã đăng nhập */}
      <Route
        path="/posts/new"
        element={
          <RequireAuth>
            <PostForm mode="create" />
          </RequireAuth>
        }
      />
      <Route
        path="/posts/:id/edit"
        element={
          <RequireAuth>
            <PostForm mode="edit" />
          </RequireAuth>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;

// ******Option 2******

// import { Routes, Route, Navigate } from "react-router-dom";
// import { useAuth } from "./context/AuthContext";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import PostList from "./pages/posts/PostList";
// import PostDetail from "./pages/posts/PostDetail";
// import PostForm from "./pages/posts/PostForm";
// import ProtectedRoute from "./components/ProtectedRoute";

// function App() {
//   const { user } = useAuth();

//   return (
//     <Routes>
//       {/* Trang gốc */}
//       <Route path="/" element={<Navigate to="/home" replace />} />

//       {/* Luôn cho vào */}
//       <Route path="/home" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* Route cần login */}
//       <Route
//         path="/posts"
//         element={
//           <ProtectedRoute>
//             <PostList />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/posts/:id"
//         element={
//           <ProtectedRoute>
//             <PostDetail />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/posts/new"
//         element={
//           <ProtectedRoute>
//             <PostForm mode="create" />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/posts/:id/edit"
//         element={
//           <ProtectedRoute>
//             <PostForm mode="edit" />
//           </ProtectedRoute>
//         }
//       />

//       {/* Catch all */}
//       <Route path="*" element={<Navigate to="/home" replace />} />
//     </Routes>
//   );
// }

// export default App;
