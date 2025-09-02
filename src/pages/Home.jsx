import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 via-blue-400 to-purple-500">
      <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 w-11/12 max-w-md text-center transform hover:scale-[1.02] transition duration-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-gray-800">
          🌟 Chào mừng bạn!
        </h1>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Hãy đăng ký tài khoản hoặc đăng nhập để tiếp tục trải nghiệm.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            to="/register"
            className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Đăng ký
          </Link>
          <Link
            to="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 shadow-md hover:shadow-lg"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
