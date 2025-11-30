// Component for buttons with icon
function ButtonGroup({
  children,
  onClick,
  type = "submit",
  className,
  hover,
  marginX = "mx-2",
  disabled = false,
}) {
  const hoverStyles = {
    hoverPostFeatures:
      "transition-all duration-300 px-[10px] py-[5px] hover:rounded-[10px] hover:bg-gray-500",
    hoverUploadBtn:
      "transition-all duration-75 hover:bg-gray-500 hover:font-bold",
    hoverReloadBtn: "transition-all hover:scale-[1.05]",
    hoverNotificationsBtn: "transition-all duration-300 hover:bg-gray-500",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${marginX} cursor-pointer ${
        disabled && "!cursor-not-allowed"
      } ${className} ${hoverStyles[hover] || ""}`}
    >
      {children}
    </button>
  );
}

export default ButtonGroup;
