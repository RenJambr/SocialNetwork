import React from "react";

function Select({ options, value, onChange, selectType, ...params }, ref) {
  return (
    <select
      ref={ref}
      value={value}
      onChange={onChange}
      {...params}
      className="text-[14px] text-white px-2 cursor-pointer py-1 border border-gray-300 rounded-sm bg-gray-0 font-medium shadow-sm outline-0"
    >
      {options.map((option) => (
        <option
          className="text-black rounded-sm cursor-pointer"
          value={
            selectType === "nationality"
              ? JSON.stringify({
                  countryFlag: option.value,
                  nationality: option.label,
                })
              : option.value
          }
          key={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default React.forwardRef(Select);
