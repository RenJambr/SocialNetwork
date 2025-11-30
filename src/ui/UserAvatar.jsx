import { Link } from "react-router";

function UserAvatar({
  show = "", //show is for showing the avatar on medium and high in the header, otherwise it will be shown in the headermenu
  type = "avatar",
  height = "h-8 md:h-10",
  width = "w-8 md:w-10",
  justifyContent = "",
  image,
  place,
  username,
  userId,
  textColor = "text-white",
  date = false,
  alignSelf = "",
  friendRequestButtons = false, // Buttons for friend requests tab in notifications
}) {
  return userId ? (
    // If there is userId it returns Link component that redirects to profile page of that user
    <Link
      to={`/user/${userId}`}
      className={`${show} ${place === "header" && "md:w-1/4"} ${
        place === "searchBar" && "px-3 py-3"
      } ${justifyContent}  items-center flex-row flex`}
    >
      <img
        src={`${image}`}
        alt="Profile pic"
        className={`rounded-full ${height} ${width} mr-2 object-cover aspect-square`}
      />
      {type === "username" && (
        // If type is username return username
        <div className="flex justify-between items-start flex-col">
          <span className={`text-xs sm:text-sm ${textColor}`}>{username}</span>
          {date && (
            <span className="text-[10px] sm:text-xs mt-1 text-gray-400">
              {date}
            </span>
          )}
          {friendRequestButtons && friendRequestButtons}
        </div>
      )}
    </Link>
  ) : (
    // If there's no userId it returns without redirect link
    <div
      className={`${show} ${justifyContent} items-center ${alignSelf} flex ${height} ${width}`}
    >
      <div className={`${height} ${width} flex-shrink-0`}>
        <img
          src={image}
          alt="Profile pic"
          className="w-full h-full rounded-full object-cover"
        />
      </div>
      {type === "username" && (
        <span className={`ml-2 text-sm text-nowrap ${textColor}`}>
          {username}
        </span>
      )}
    </div>
  );
}

export default UserAvatar;
