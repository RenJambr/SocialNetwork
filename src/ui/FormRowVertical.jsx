function FormRowVertical({
  children,
  label,
  error,
  width = "",
  marginYAxis = "my-4",
  alignItems = "items-start",
  gap = "gap-[1.2rem]",
}) {
  return (
    <div
      className={`flex flex-col ${alignItems} ${gap} px-[1.2rem] ${marginYAxis} ${width}`}
    >
      {label && (
        <label className="font-medium text-white text-md">{label}</label>
      )}
      {children}
      {error && <p className="text-red-700 font-sm">{error}</p>}
    </div>
  );
}

export default FormRowVertical;
