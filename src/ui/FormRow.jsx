function FormRow({
  children,
  padding = "px-[1.2rem]",
  width = "w-full",
  marginYAxis = "my-4",
  itemsPlace = "items-center",
}) {
  return (
    <div
      className={`flex justify-between ${itemsPlace} ${width} gap-[1.2rem] ${padding} ${marginYAxis}`}
    >
      {children}
    </div>
  );
}

export default FormRow;
