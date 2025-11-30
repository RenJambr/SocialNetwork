import { useForm } from "react-hook-form";
import UserAvatar from "./UserAvatar";
import ButtonGroup from "./ButtonGroup";
import ImagePreview from "./ImagePreview";
import { useState } from "react";

function EditPostCommentBox({
  user,
  content,
  id,
  date,
  editFunction,
  onCloseModal,
  type,
}) {
  // Image preview state for shoW uploaded image while creating a post
  const [imagePreview, setImagePreview] = useState(content.imageContent);

  // Check if there is shared content while creating a post
  const shareContent = content?.shareContent;

  const { handleSubmit, register, setValue } = useForm();

  function onSubmit(data) {
    const { textContent } = data;
    // If type is "post" return textcontent, imagecontent and share content if it exists, if type is "comment" return only text content
    data =
      type === "post"
        ? { textContent, imageContent: imagePreview, shareContent }
        : textContent;

    editFunction(
      { id, data },
      {
        onSettled: () => {
          onCloseModal();
        },
      }
    );
  }
  return (
    <div>
      <div className="w-full flex justify-between items-center relative z-10 mt-4">
        <div className="flex w-full justify-between items-center mb-4">
          <UserAvatar
            type="username"
            image={user.profileImage}
            username={user.username}
            justifyContent={"justify-start"}
          />
          <p className="text-xs mt-1 mr-2 text-white">{date}</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full h-full"
      >
        <textarea
          {...register("textContent", {
            required: "This field is required.",
          })}
          className="bg-gray-200  w-full h-full rounded-sm resize-none p-4 outline-0 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          placeholder="Write something..."
          defaultValue={type === "post" ? content.textContent : content}
        ></textarea>
        {/* If image preview exists return */}
        {imagePreview && (
          <ImagePreview
            image={content.imageContent}
            type="edit"
            onClose={() => {
              setValue("imageContent", null);
              setImagePreview(null);
            }}
          />
        )}
        <div className="flex justify-between items-center w-full my-3">
          <ButtonGroup
            type="button"
            onClick={() => onCloseModal()}
            className="flex justify-between items-center rounded bg-gray-600 text-white px-4 text-sm py-2 ms-0 transition-all hover:scale-[1.05]"
          >
            Cancel
          </ButtonGroup>
          <ButtonGroup
            type="submit"
            className="flex justify-between items-center rounded bg-[#0f6ec7] text-white px-4 text-sm py-2 !mx-0 transition-all hover:scale-[1.05]"
          >
            Confirm
          </ButtonGroup>
        </div>
      </form>
    </div>
  );
}

export default EditPostCommentBox;
