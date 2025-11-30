import { HiXCircle } from "react-icons/hi";

// ImagePreview component for preview image in the post form
function ImagePreview({ image, onClose, type = "post" }) {
  return (
    <div
      className={`absolute ${
        type === "edit" ? "bottom-16 right-5" : "bottom-2 left-20"
      } imagePreview`}
    >
      <div className="relative">
        <img
          src={image}
          alt="Preview"
          className="w-[50px] h-[50px] object-cover rounded-md shadow-sm"
        />
        <button
          type="button"
          className="cursor-pointer absolute top-[-10px] right-[-10px]"
          onClick={onClose}
        >
          <HiXCircle fontSize={"20px"} />
        </button>
      </div>
    </div>
  );
}

export default ImagePreview;
