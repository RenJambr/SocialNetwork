import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import UserAvatar from "../ui/UserAvatar";
import Button from "../ui/Button";
import SharePostItem from "./SharePostItem";
import { useCreatePost } from "./useCreatePost";
import SpinnerMini from "../ui/SpinnerMini";
import React from "react";

const SharePostForm = React.forwardRef(function SharePostForm(
  { profileImage, username, post, userid, onCloseModal },
  ref
) {
  const { register, handleSubmit } = useForm();

  const { createPost, isPending } = useCreatePost();

  function onSubmit(data) {
    const likes = {
      usersIds: [],
      get length() {
        return this.usersIds.length;
      },
    };

    const { textContent } = data;

    //if post is not shared it takes current post id
    const original_post_id = post?.original_post_id ?? post?.id;
    //if post is not shared it takes current post user id
    const original_post_user_id = post?.original_post_user_id ?? post?.userid;

    createPost(
      {
        content: { textContent },
        userid,
        likes,
        original_post_id,
        original_post_user_id,
      },
      {
        onSettled: () => {
          onCloseModal();
        },
      }
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-auto max-w-[500px]">
      <Heading as="h2">Share</Heading>
      <UserAvatar
        type="username"
        image={profileImage}
        username={username}
        alignSelf="self-start"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative w-full h-full"
        ref={ref}
      >
        <div className="relative mb-3 flex flex-col">
          <textarea
            disabled={isPending}
            {...register("textContent")}
            className="max-w-[650px] text-white w-full h-full rounded-sm resize-none p-4 outline-0 text-xs md:text-sm focus:outline-none"
            placeholder="Write something..."
          ></textarea>

          <Button type="shareAction">
            {isPending ? <SpinnerMini size="1.2rem" /> : "Share"}
          </Button>
        </div>

        <SharePostItem
          post={post}
          shared={Boolean(post?.original_post_id)}
          postId={post?.original_post_id}
        />
      </form>
    </div>
  );
});

export default SharePostForm;
