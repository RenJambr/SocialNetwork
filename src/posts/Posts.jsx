import { useMemo } from "react";
import { useUser } from "../authentication/useUser";
import { useFriendshipStatuses } from "../friendships/useFriendshipStatuses";
import Spinner from "../ui/Spinner";
import PostItem from "./PostItem";
import { useGetPosts } from "./useGetPosts";

function Posts() {
  const { posts, isLoading: isLoadingPosts } = useGetPosts();
  const { user: currUser, isLoading: isLoadingCurrUser } = useUser();

  //get users ids from posts to get friendship status for each user
  const usersIdsFromPosts = useMemo(
    () =>
      posts
        ?.map((post) => post.userid)
        .filter((id, i, arr) => id !== currUser.sub && arr.indexOf(id) === i),
    [posts, currUser.sub]
  );

  //checking friendship statuses
  const { friendshipStatuses, isPending } = useFriendshipStatuses(
    currUser.sub,
    usersIdsFromPosts
    // {
    //   enabled: Boolean(usersIdsFromPosts?.length > 0 && currUser.sub),
    // }
  );

  if (isLoadingPosts || isLoadingCurrUser || isPending) return <Spinner />;

  //sort posts by created date
  let sortedPosts = posts.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  //filter posts of users that is blocked
  sortedPosts = sortedPosts.filter(
    (post) =>
      !friendshipStatuses.some(
        (f) => f.other_user_id === post.userid && f.status === "blocked"
      )
  );

  return (
    <div className="flex flex-col justify-center items-center w-full">
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
