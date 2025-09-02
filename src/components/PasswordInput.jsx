import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({ value, onChange, error }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="relative w-full">
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          className="border p-2 rounded w-full pr-10"
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
