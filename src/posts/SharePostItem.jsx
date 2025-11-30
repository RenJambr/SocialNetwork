import { useUserById } from "../authentication/useUserById";
import Modal from "../ui/Modal";
import SpinnerMini from "../ui/SpinnerMini";
import UserAvatar from "../ui/UserAvatar";
import { timeAgo } from "../utils/helpers";
import UnavailablePost from "./UnavailablePost";
import { useGetPost } from "./useGetPost";

function SharePostItem({
  post,
  postId,
  friendshipStatuses = [],
  shared = true,
}) {
  //fetch original post only if it's not deleted
  const { post: originalPost, isLoading } = useGetPost(
    shared && !post?.is_original_deleted ? postId : null
  );

  //get userid of original post
  const userIdToFetch =
    originalPost?.userid ?? post?.original_post_user_id ?? post?.userid;

  //fetch user of original post
  const { user, isLoading: isLoadingUser } = useUserById(userIdToFetch, {
    enabled: Boolean(originalPost?.userid ?? post?.original_post_user_id),
  });

  const formattedDate = timeAgo(originalPost?.created_at || post?.created_at);

  if (isLoading || isLoadingUser) return <SpinnerMini />;

  const imageToShow = shared
    ? originalPost?.content?.imageContent
    : post?.content?.imageContent;

  const textToShow = shared
    ? originalPost?.content?.textContent
    : post?.content?.textContent;

  const isBlocked = friendshipStatuses.some(
    (f) =>
      f.other_user_id === post.original_post_user_id && f.status === "blocked"
  );

  return (
    <div className="w-auto flex flex-col mx-4 border-gray-400 border-1 rounded-xl mt-4">
      {/* if original post is deleted or user is blocked it shows UnavailablePost component */}
      {post?.is_original_deleted || isBlocked ? (
        <UnavailablePost
          user={user}
          formattedDate={formattedDate}
          post={post}
        />
      ) : (
        <>
          {imageToShow && (
            <Modal>
              <Modal.Open opens="Post image">
                <div className="relative w-full h-auto sm:h-[400px] flex items-center justify-center rounded-t-xl cursor-pointer overflow-hidden">
                  <img
                    src={imageToShow}
                    alt="Preupload image"
                    className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-60"
                    aria-hidden="true"
                  />
                  <img
                    src={imageToShow}
                    alt="Post"
                    className="max-h-[400px] object-contain z-5"
                  />
                </div>
              </Modal.Open>
              <Modal.Window name="Post image">
                <img
                  src={imageToShow}
                  alt="Post"
                  className="max-h-[400px] object-contain"
                />
              </Modal.Window>
            </Modal>
          )}

          <div className="flex flex-col m-2">
            <div className="flex w-full justify-between">
              {user && (
                <UserAvatar
                  type="username"
                  username={user.username}
                  image={user.profileimage}
                  userId={userIdToFetch}
                  date={formattedDate}
                />
              )}
              <span className="text-sm text-gray-400 me-3">
                {(originalPost?.isEdited && "(Edited)") ||
                  (post?.isEdited && "(Edited)")}
              </span>
            </div>
            {textToShow && <p className="text-white mt-3">{textToShow}</p>}
          </div>
        </>
      )}
    </div>
  );
}

export default SharePostItem;
