import { forwardRef } from "react";

const RadioInput = forwardRef(function RadioInput(
  { label, name, ...props },
  ref
) {
  return (
    <div>
      <input ref={ref} type="radio" id={label} name={name} {...props} />
      <label htmlFor={label} className="ps-2 text-white">
        {label}
      </label>
    </div>
  );
});

export default RadioInput;
