import { forwardRef } from "react";
import { HiOutlinePhoto } from "react-icons/hi2";

const FileInput = forwardRef(function FileInput(
  { place, accept, onChange, id, ...props },
  ref
) {
  if (place === "post") {
    // Input for upload image post form
    return (
      <label
        htmlFor={id}
        className="cursor-pointer inline-flex items-center gap-2 text-black absolute left-4 bottom-2"
      >
        <HiOutlinePhoto className="text-2xl hover:text-gray-900 transition-all hover:scale-[1.1]" />
        <input
          type="file"
          id={id}
          accept={accept}
          onChange={onChange}
          className="hidden"
          ref={ref}
          {...props}
        />
      </label>
    );
  }

  return (
    <input
      type="file"
      id={id}
      accept={accept}
      onChange={onChange}
      ref={ref}
      {...props}
      className="
        text-sm w-full xs:w-auto text-white
        border border-gray-500 rounded-sm
        file:mr-3 file:rounded-sm file:border-0
        file:bg-gray-700 file:text-white
        file:font-medium file:px-3 file:py-1.5
        file:cursor-pointer
        file:transition-colors file:duration-200
        hover:file:bg-gray-800
        bg-transparent
      "
    />
  );
});

export default FileInput;
