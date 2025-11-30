import { useUserById } from "../authentication/useUserById";
import SpinnerMini from "../ui/SpinnerMini";
import UserAvatar from "../ui/UserAvatar";
import { timeAgo } from "../utils/helpers";
import PostCommentOptions from "../ui/PostCommentOptions";
import { useUser } from "../authentication/useUser";

function PostInfo({ userId, date, content, postId, isEdited }) {
  const { user, isLoading } = useUserById(userId);
  const { user: authUser, isLoadingAuthUser } = useUser();

  const formattedDate = timeAgo(date);

  if (isLoading || isLoadingAuthUser) return <SpinnerMini />;

  return (
    <div className="w-full flex justify-between items-center relative z-10">
      <div className="flex flex-col items-end justify-end">
        <UserAvatar
          type="username"
          image={user.profileimage}
          username={user.username}
          userId={user.id}
          justifyContent={"justify-start"}
          date={formattedDate}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-xs  text-gray-400 me-3">
          {isEdited && "(Edited)"}
        </span>
        {/* In case if it's post of authenticated user there's options for edit and delete post*/}
        {authUser?.sub === user?.id && (
          <PostCommentOptions
            type="post"
            content={content}
            id={postId}
            user={authUser}
            date={formattedDate}
          />
        )}
      </div>
    </div>
  );
}

export default PostInfo;
