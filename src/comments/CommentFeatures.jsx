import { useState } from "react";
import { useToggleLikeComment } from "./useToggleLikeComment";
import ButtonLink from "../ui/ButtonLink";
import Spinner from "../ui/Spinner";
import PostCommentOptions from "../ui/PostCommentOptions";

function CommentFeatures({
  commentId,
  postId,
  likes,
  setLikesCount,
  content,
  date,
  userCommentId,
  authUser,
}) {
  const { toggleLikeComment, isLoading } = useToggleLikeComment();

  //check if current user likes the comment and set it to default value of state
  const [isLikedComment, setIsLikedComment] = useState(
    likes.usersIds.some((user) => user.id === authUser.sub)
  );

  function toggleLike(e) {
    e.preventDefault();

    const isLiked = likes.usersIds.some((e) => e.id === authUser.sub);
    const updatedLikes = isLiked
      ? {
          usersIds: likes.usersIds.filter((e) => e.id !== authUser.sub),
          length: likes.length - 1,
        }
      : {
          usersIds: [
            ...likes.usersIds,
            { id: authUser.sub, username: authUser.username },
          ],
          length: likes.length + 1,
        };

    setIsLikedComment((prev) => !prev);

    //setting the LikesCount state to update PortalDiv component
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    toggleLikeComment({
      commentId,
      postId,
      updatedLikes,
      made_action_userid: authUser.sub,
      notification_userid: userCommentId,
      isLikedComment,
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <ButtonLink
        onClick={toggleLike}
        textColor={isLikedComment ? "text-blue-400" : "text-gray-300"}
      >
        Like
      </ButtonLink>
      {authUser.sub === userCommentId && (
        <PostCommentOptions
          type="comment"
          id={commentId}
          user={authUser}
          content={content}
          date={date}
        />
      )}
    </>
  );
}

export default CommentFeatures;
