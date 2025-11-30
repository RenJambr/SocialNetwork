import { useParams } from "react-router";
import { useEffect } from "react";
import PostItem from "../posts/PostItem";

function PostPage() {
  const { postId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col mx-auto my-0 gap-3 p-0 max-w-[720px]">
        <PostItem id={postId} />
      </div>
    </div>
  );
}

export default PostPage;
