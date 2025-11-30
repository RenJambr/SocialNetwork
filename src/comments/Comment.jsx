import React, { useEffect, useRef, useState } from "react";
import { useUserById } from "../authentication/useUserById";
import SpinnerMini from "../ui/SpinnerMini";
import UserAvatar from "../ui/UserAvatar";
import { useGetComment } from "./useGetComment";
import CommentFeatures from "./CommentFeatures";
import { timeAgo } from "../utils/helpers";
import PortalDiv from "../ui/PortalDiv";
import { Link } from "react-router";

const Comment = React.memo(function Comment({ commentId, authUser, postId }) {
  const { comment, isLoading: isLoadingComment } = useGetComment(commentId);
  const userCommentId = comment?.userid;

  const { user: userComment, isLoading: isLoadingUser } = useUserById(
    userCommentId,
    { enabled: !!userCommentId }
  );

  const ref = useRef();

  const [likesCount, setLikesCount] = useState(0);

  // effect is using for updating likesCount state that is forwarded to PortalDiv
  useEffect(() => {
    if (comment?.likes?.length >= 0) {
      setLikesCount(comment.likes.length);
    }
  }, [comment?.likes?.length]);

  if (isLoadingComment || isLoadingUser) return <SpinnerMini />;

  const { content, date, likes, isEdited } = comment;
  const { profileimage, username } = userComment;

  return (
    <div className="flex w-full justify-center items-start my-4">
      <UserAvatar type="avatar" image={profileimage} userId={userCommentId} />
      <div className="w-full flex flex-col ml-2 items-start">
        <div className="w-full flex flex-col  bg-gray-500 rounded-lg p-2">
          <div className="w-full flex justify-between">
            <Link to={`/user/${userCommentId}`}>
              <p className="font-semibold text-xs sm:text-sm text-white">
                {username}
              </p>
            </Link>
            <div className="flex flex-row justify-between items-center">
              <span className="text-xs  text-gray-200 me-3">
                {isEdited && "(Edited)"}
              </span>
              <p className="text-xs mt-1 mr-2 text-white">{timeAgo(date)}</p>
            </div>
          </div>
          <div className="flex w-full">
            <p className="text-xs md:text-sm mt-1 text-white">{content}</p>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex">
            <CommentFeatures
              commentId={commentId}
              postId={postId}
              userCommentId={userCommentId}
              likes={likes}
              content={content}
              date={timeAgo(date)}
              setLikesCount={setLikesCount}
              authUser={authUser}
            />
          </div>
          {/* PortalDiv is used for show the likes of the comment */}
          <PortalDiv
            ref={ref}
            likesCount={likesCount}
            likes={likes}
          ></PortalDiv>
        </div>
      </div>
    </div>
  );
});

export default Comment;
