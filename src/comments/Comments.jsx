import { useUser } from "../authentication/useUser";
import SpinnerMini from "../ui/SpinnerMini";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";

function Comments({ comments, postid, post_userid }) {
  const { user: authUser, isLoading } = useUser();
  const sortedComments = comments.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  if (isLoading) return <SpinnerMini />;
  return (
    <>
      <div className="w-full p-3 flex flex-col justify-center items-center bg-gray-700  rounded-t-sm text-white">
        {comments?.length > 0
          ? sortedComments.map((comment) => (
              <Comment
                commentId={comment.id}
                postId={postid}
                key={comment.id}
                authUser={authUser}
              />
            ))
          : "This post doesn't have comments yet."}
      </div>
      <CreateCommentForm postid={postid} post_userid={post_userid} />
    </>
  );
}

export default Comments;
