function Button({
  children,
  type,
  buttonType = "",
  disabled = false,
  className = "",
  onClick,
}) {
  const baseStyle =
    "cursor-pointer rounded-xs uppercase px-5 py-2 font-semibold text-xs"; // Common styles
  const styles = {
    danger: "bg-red-500 text-white !rounded-lg", // Apply styles only if type is 'danger'
    default:
      "bg-gray-300 text-black !rounded-lg transition-all hover:scale-[1.05]", // Default button style
    loginSignup: `bg-[#0f6ec7] text-white px-[25px] py-2 sm:px-[40px] sm:py-2 rounded-sm text-sm text-nowrap !rounded-lg transition-all hover:scale-[1.05] ${className}`, // Apply styles only if type is 'loginSignup'
    postAction:
      "bg-[#0f6ec7] text-white font-sans absolute bottom-2 right-[10px] px-[25px] py-1 sm:px-[35px] sm:py-2 !rounded-lg text-xs tracking-wide hover:scale-[1.05] md:hover:bg-[#067ae7] transition-all", // Apply styles only if type is 'postAction'
    shareAction:
      "bg-[#0f6ec7] text-white px-[25px] py-1 sm:px-[35px] font-sans sm:py-2 rounded-sm text-xs self-end !rounded-lg text-xs tracking-wide hover:scale-[1.05] md:hover:bg-[#067ae7] transition-all", // Apply styles only if type is 'shareAction'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={buttonType}
      className={`${baseStyle} ${styles[type] || styles.default}`}
    >
      {children}
    </button>
  );
}

export default Button;
