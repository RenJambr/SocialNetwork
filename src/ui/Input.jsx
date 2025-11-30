import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { type, placeholder, disabled = false, onChange, value, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className="w-full text-sm rounded-lg border-1 border-solid border-gray-300 py-[7px] px-[8px] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      {...props}
    />
  );
});

export default Input;
