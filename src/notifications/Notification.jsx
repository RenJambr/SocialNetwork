import { Link } from "react-router";
import { useUserById } from "../authentication/useUserById";
import SpinnerMini from "../ui/SpinnerMini";
import UserAvatar from "../ui/UserAvatar";
import { useCheckNotification } from "./useCheckNotification";
import { timeAgo } from "../utils/helpers";

function Notification({ notification }) {
  // Fetching user that makes an action
  const { user, isLoading } = useUserById(notification.made_action_userid);
  const { checkNotification } = useCheckNotification();
  let notificationType;

  function onCheckNotification() {
    checkNotification({
      notificationId: notification.id,
      userId: notification.notification_userid,
    });
  }

  if (isLoading) return <SpinnerMini />;

  //Switch for different types of notifications
  switch (`${notification.action}-${notification.type}`) {
    case "like-post":
      notificationType = "liked your post.";
      break;
    case "like-comment":
      notificationType = "liked your comment.";
      break;
    case "comment-post":
      notificationType = "commented your post.";
      break;
    case "share-post":
      notificationType = "shared your post.";
      break;
    case "acceptedRequest-friendships":
      notificationType = "and you are friends now.";
      break;
    default:
      notificationType = "";
  }

  return (
    <Link
      to={`${
        notification.type === "friendships"
          ? `/user/${notification.made_action_userid}`
          : `/post/${notification.postId}`
      }`}
      onClick={() => onCheckNotification()}
      className="w-full flex flex-row items-center justify-between hover:bg-gray-500 transition-all p-2 rounded-md cursor-pointer"
    >
      <div className="flex justify-start items-center">
        <UserAvatar show="header" image={user?.profileimage} />
        <div className="flex justify-center items-start flex-col">
          <p className="px-3 text-sm sm:text-base">
            <span className="font-bold">{user?.username}</span>{" "}
            {notificationType}
          </p>
          <span className="text-xs text-gray-400 ms-3">
            {timeAgo(notification.created_at)}
          </span>
        </div>
      </div>
      {/* If seen is false return red circle, it disappears when user clicks on notification. */}
      {!notification.seen ? (
        <div className="w-3 h-3 rounded-full bg-red-500 flex flex-shrink-0"></div>
      ) : (
        ""
      )}
    </Link>
  );
}

export default Notification;
