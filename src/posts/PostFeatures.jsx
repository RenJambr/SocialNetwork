import { HiOutlineChatBubbleOvalLeft, HiOutlineShare } from "react-icons/hi2";
import ButtonGroup from "../ui/ButtonGroup";
import { useToggleLikePost } from "./useToggleLikePost";
import { useUser } from "../authentication/useUser";
import { useRef, useState } from "react";
import Modal from "../ui/Modal";
import Comments from "../comments/Comments";
import SharePostForm from "./SharePostForm";
import SpinnerMini from "../ui/SpinnerMini";
import { HiHeart } from "react-icons/hi";
import PortalDiv from "../ui/PortalDiv";

function PostFeatures({
  postId,
  likes,
  setLikesCount,
  comments,
  post,
  likesCount,
}) {
  //hook for toggle like post
  const { toggleLikePost, isLoading } = useToggleLikePost();
  const { userid, user } = useUser();
  const ref = useRef();

  //check is post liked to fill the heart of like
  const [isLikedPost, setIsLikedPost] = useState(
    likes.usersIds.some((user) => user.id === userid)
  );

  function toggleLike(e) {
    e.preventDefault();

    //update likes logic
    const updatedLikes = isLikedPost
      ? {
          usersIds: likes.usersIds.filter((user) => user.id !== userid),
          length: likes.length - 1,
        }
      : {
          usersIds: [
            ...likes.usersIds,
            { id: userid, username: user.username },
          ],
          length: likes.length + 1,
        };

    setIsLikedPost((prev) => !prev);
    setLikesCount((prev) => (isLikedPost ? prev - 1 : prev + 1));

    toggleLikePost({
      postId,
      updatedLikes,
      made_action_userid: userid,
      notification_userid: post.userid,
      isLikedPost,
    });
  }

  if (isLoading) return <SpinnerMini />;

  return (
    <div className="flex flex-row justify-between items-center xs:self-start">
      <ButtonGroup
        onClick={toggleLike}
        hover="hoverPostFeatures"
        marginX={"mx-0-5 sm:mx-2 sm:me-0"}
      >
        <HiHeart
          className={`text-2xl duration-300 transition-all ${
            isLikedPost ? "fill-[#FF3040]" : "fill-transparent stroke-1"
          }`}
        />
      </ButtonGroup>
      <PortalDiv ref={ref} likesCount={likesCount} likes={likes}></PortalDiv>
      <Modal.Open opens={`post-${postId}`}>
        <ButtonGroup
          className={"flex justify-center items-center"}
          hover="hoverPostFeatures"
          marginX={"mx-0-5 sm:mx-2 sm:me-0"}
        >
          <HiOutlineChatBubbleOvalLeft className="text-2xl" />
          {comments.length > 0 && (
            <span className="ms-2 text-xs sm:text-sm text-gray-300 cursor-pointer">
              {comments.length > 1
                ? `${comments.length} comments`
                : comments.length === 1
                ? `${comments.length} comment`
                : ""}
            </span>
          )}
        </ButtonGroup>
      </Modal.Open>
      {/* Modal for open comments and create comment form */}
      <Modal.Window name={`post-${postId}`}>
        <Comments
          comments={comments}
          postid={postId}
          post_userid={post.userid}
        />
      </Modal.Window>
      <Modal.Open opens={`share-post-${postId}`}>
        <ButtonGroup
          // Added logic to disable the button if a user tries to share a post
          // that was already shared, but the original post has since been deleted.
          // This prevents sharing a post that no longer exists.
          disabled={post?.is_original_deleted ? true : false}
          hover="hoverPostFeatures"
          marginX={"mx-0-5 sm:mx-2"}
          className={"flex justify-center items-center"}
        >
          <HiOutlineShare className="text-[20px]" />
        </ButtonGroup>
      </Modal.Open>
      {/* Modal form for share the post */}
      <Modal.Window name={`share-post-${postId}`} customWidth="max-w-[500px]">
        {(close) => (
          <SharePostForm
            username={user.username}
            profileImage={user.profileImage}
            post={post}
            userid={userid}
            onCloseModal={close}
          />
        )}
      </Modal.Window>
    </div>
  );
}

export default PostFeatures;
