import { useState } from "react";

const regex = /^[\x20-\x7E]{8,12}$/; 
// 8–12 ký tự ASCII, không dấu, không Unicode

export default function useValidation() {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    let message = "";

    if (!value) {
      message = `${name} không được để trống`;
    } else if (!regex.test(value)) {
      message = `${name} phải từ 8-12 ký tự, không dấu, không Unicode.`;
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
    return message === "";
  };

  return {
    errors,
    validateField,
  };
}
