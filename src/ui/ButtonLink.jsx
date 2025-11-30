function ButtonLink({
  children,
  onClick,
  textColor = "text-white",
  className,
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs ${textColor} hover:underline cursor-pointer mt-1 ${className}`}
    >
      {children}
    </button>
  );
}

export default ButtonLink;
