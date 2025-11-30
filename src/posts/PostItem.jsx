import React, { useEffect, useState } from "react";
import PostFeatures from "./PostFeatures";
import PostInfo from "./PostInfo";
import { useGetComments } from "../comments/useGetComments";
import SkeletonPostLoader from "../ui/SkeletonPostLoader";
import { useGetPost } from "./useGetPost";
import Modal from "../ui/Modal";
import SharePostItem from "./SharePostItem";

const PostItem = React.memo(function PostItem({ id, friendshipStatuses }) {
  const { post, isLoading: isLoadingPost } = useGetPost(id);
  //get comments by post id
  const { comments, isLoading: isLoadingComments } = useGetComments(id);
  //state for showing number of likes and update it from PostFeatures component
  const [likesCount, setLikesCount] = useState(0);

  //effect for set likes count, but initial state is from the server, because of that I have to use effect here
  useEffect(() => {
    if (post?.likes?.length >= 0) {
      setLikesCount(post.likes.length);
    }
  }, [post?.likes?.length]);

  if (isLoadingComments || isLoadingPost) return <SkeletonPostLoader />;

  const {
    userid,
    content,
    likes,
    created_at: date,
    isEdited,
    original_post_id,
    is_original_deleted,
  } = post;
  return (
    <div className="w-full my-7 drop-shadow-lg">
      <PostInfo
        userId={userid}
        date={date}
        content={content}
        postId={id}
        isEdited={isEdited}
      />
      <div className="text-md rounded-sm bg-gray-600 text-white mt-3 flex flex-col items-center justify-center">
        <div className="w-[100%]  text-sm md:text-lg text-start d-flex justify-start items-start">
          {content.textContent && (
            <p className="p-3 md:px-5">{content.textContent}</p>
          )}
          {content.imageContent && (
            <Modal>
              <Modal.Open opens="Post image">
                <div
                  className="relative w-full h-auto sm:h-[595px] flex items-center justify-center cursor-pointer overflow-hidden"
                  // style={{
                  //   background: `linear-gradient(to right, #1a1a1a, transparent 25%, transparent 75%, #1a1a1a)`,
                  // }}
                >
                  <img
                    src={content.imageContent}
                    className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
                    aria-hidden="true"
                    alt="background-blur-img"
                  />
                  <img
                    src={content.imageContent}
                    alt="Post content"
                    className="h-auto sm:h-[595px] w-auto max-w-full object-contain z-5"
                  />
                </div>
              </Modal.Open>
              <Modal.Window name="Post image">
                <img
                  src={`${content.imageContent}`}
                  alt="Post content"
                  className="h-auto sm:h-[595px] w-auto object-cover cursor-pointer"
                />
              </Modal.Window>
            </Modal>
          )}
          {/* Render the shared post layout if this post is a shared one */}
          {original_post_id && (
            <SharePostItem
              post={post}
              postId={original_post_id}
              //is_original_deleted prop is for checking if original post is deleted to show the error
              is_original_deleted={is_original_deleted}
              friendshipStatuses={friendshipStatuses}
            />
          )}
        </div>
        {/* <div className="border-b-1 w-[40%] "></div> */}
        <div className="flex-row flex justify-start items-center w-full my-3 px-3 md:px-5">
          <PostFeatures
            postId={id}
            post={post}
            comments={comments}
            likes={likes}
            likesCount={likesCount}
            setLikesCount={setLikesCount}
          />
        </div>
      </div>
    </div>
  );
});

export default PostItem;
