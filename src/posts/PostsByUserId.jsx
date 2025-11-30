import { useMemo } from "react";
import { useFriendshipStatuses } from "../friendships/useFriendshipStatuses";
import Spinner from "../ui/Spinner";
import PostItem from "./PostItem";
import { useGetPostsByUserId } from "./useGetPostsByUserId";

function Posts({ userId }) {
  //get posts for personal page
  const { posts, isLoading } = useGetPostsByUserId(userId);

  //get id of users from original posts
  const usersIdsFromOriginalPosts = useMemo(
    () =>
      posts
        ?.map((post) => post?.original_post_user_id)
        .filter(
          (id, i, arr) => id !== userId && arr.indexOf(id) === i && id !== null
        ),
    [posts, userId]
  );

  //check friendship statuses with users from original posts
  const { friendshipStatuses } = useFriendshipStatuses(
    userId,
    usersIdsFromOriginalPosts,
    { enabled: Boolean(usersIdsFromOriginalPosts?.length > 0 && userId) }
  );

  if (isLoading) return <Spinner />;

  //sort posts by created date
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <div className="flex flex-col justify-center items-center w-full justify-self-end">
      {sortedPosts.map((post) => (
        <PostItem
          key={post.id}
          id={post.id}
          friendshipStatuses={friendshipStatuses}
        />
      ))}
    </div>
  );
}

export default Posts;
