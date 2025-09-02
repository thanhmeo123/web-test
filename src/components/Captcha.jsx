import { useState } from "react";
import { generateCaptcha } from "../utils/generateCaptcha";
import { FiRefreshCw } from "react-icons/fi"; // icon refresh

export default function Captcha({ value, onChange }) {
  const [captcha, setCaptcha] = useState(generateCaptcha());

  return (
    <div className="flex items-center gap-2">
      {/* Ô input */}
      <input
        type="text"
        placeholder="Nhập CAPTCHA"
        value={value}
        onChange={(e) => onChange(e.target.value, captcha)}
        className="border p-2 rounded flex-1"
      />
      {/* Mã CAPTCHA */}
      <span className="font-mono font-bold text-lg bg-gray-200 px-3 py-1 rounded">
        {captcha}
      </span>

      {/* Nút refresh */}
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setCaptcha(generateCaptcha())}
        className="text-blue-500 hover:text-blue-700"
      >
        <FiRefreshCw size={20} />
      </button>
    </div>
  );
}
