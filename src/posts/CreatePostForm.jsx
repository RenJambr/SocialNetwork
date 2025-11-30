import { useForm } from "react-hook-form";
import { useUser } from "../authentication/useUser";
import Button from "../ui/Button";
import UserAvatar from "../ui/UserAvatar";
import { useCreatePost } from "./useCreatePost";
import FileInput from "../ui/FileInput";
import { useState } from "react";
import ImagePreview from "../ui/ImagePreview";
import SpinnerMini from "../ui/SpinnerMini";

function CreatePostForm() {
  const { user, userid } = useUser();
  const { profileImage, username } = user;
  const { createPost, isPending } = useCreatePost();
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const [imagePreview, setImagePreview] = useState(null);

  function onSubmit(data) {
    const likes = {
      usersIds: [],
      get length() {
        return this.usersIds.length;
      },
    };
    let { textContent, imageContent } = data;

    //If there's no content then return
    if (textContent === "" && imageContent === undefined) return;

    //If there's no uploaded image return ""
    imageContent = imageContent?.length === 0 ? "" : imageContent;

    createPost(
      { content: { textContent, imageContent }, userid, likes },
      {
        onSettled: () => {
          reset();
          setImagePreview(null);
        },
      }
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-auto">
      <h2 className=" mb-4 md:mb-5 text-white font-sans font-bold tracking-wider text-[22px] sm:text-[28px] sm:font-medium self-start md:text-[36px] sm:tracking-wide text-left">
        Create a post
      </h2>
      <div className="flex flex-row justify-center items-center gap-4 h-[150px] sm:h-[200px] mb-6 w-full">
        <div className="flex justify-center items-start self-start">
          <UserAvatar
            height="h-10 md:h-12"
            width="w-10 md:w-12"
            image={profileImage}
            username={username}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative w-full h-full"
        >
          <textarea
            disabled={isPending}
            {...register("textContent", {
              validate: (value) => {
                const file = watch("imageContent");
                if (!value && !file) return "Text or image is required.";
                return true;
              },
            })}
            className="bg-gray-200 max-w-[650px] w-full h-full rounded-lg resize-none p-4 outline-0 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            placeholder="What's on your mind?"
          ></textarea>
          {imagePreview && (
            <ImagePreview
              image={imagePreview}
              onClose={() => {
                setImagePreview(null);
                setValue("imageContent", null);
              }}
            />
          )}
          <FileInput
            place="post"
            id="profileImage"
            accept="image/*"
            {...register("imageContent", {
              validate: (file) => {
                //validate if there's no image file or text content to return
                const content = watch("textContent");
                if (!file && !content) return "Image or text is required.";
                return true;
              },
            })}
            onChange={(e) => {
              //1. Take the uploaded file
              const file = e.target.files[0];
              //2. Set file to imageContent
              setValue("imageContent", file);
              if (file) {
                //3. Make the url of image
                const imageUrl = URL.createObjectURL(file);
                //4. Set the preview image
                setImagePreview(imageUrl);
              } else {
                setImagePreview(null);
              }
            }}
          />
          <Button type="postAction">
            {isPending ? <SpinnerMini size="1.2rem" /> : "Post"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostForm;
