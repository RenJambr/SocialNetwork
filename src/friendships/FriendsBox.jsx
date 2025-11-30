import { HiArrowUturnLeft } from "react-icons/hi2";
import ButtonGroup from "../ui/ButtonGroup";
import Heading from "../ui/Heading";
import UserAvatar from "../ui/UserAvatar";
import { useUnblockUser } from "./useUnblockUser";

// FriendsBox serves for show the blocked users or friend depends on type
function FriendsBox({ currUser, user, users, type }) {
  const { unblockUser } = useUnblockUser();

  return (
    <div className="flex justify-between items-start flex-col">
      {type === "friends" ? (
        <>
          <Heading as="h3">{user.username}'s friends</Heading>
          {users.length > 0 ? (
            users.map((friend) => (
              <div className="py-3 ps-5" key={friend.friend_id}>
                <UserAvatar
                  type="username"
                  image={friend.friend_avatar}
                  username={friend.friend_username}
                  userId={friend.friend_id}
                />
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm px-4">
              {user.username} doesn't have any friends.
            </div>
          )}
        </>
      ) : (
        <>
          <Heading as="h3">Blocked users</Heading>
          {users.length > 0 ? (
            users.map((user) => (
              <div
                className="py-3 ps-5 flex justify-between items-center"
                key={user.id}
              >
                <UserAvatar
                  type="username"
                  image={user.profileimage}
                  username={user.username}
                  userId={user.id}
                />
                <ButtonGroup
                  onClick={() =>
                    unblockUser({ p_blocker: currUser.sub, p_blocked: user.id })
                  }
                  className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-[2px] px-3 rounded text-sm transition-all ease-in-out duration-200 cursor-pointer flex justify-between items-center h-[100%]"
                >
                  Unblock
                  <HiArrowUturnLeft className="ms-1" />
                </ButtonGroup>
              </div>
            ))
          ) : (
            <div className="text-gray-400 text-sm px-4">
              There's no blocked users.
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default FriendsBox;
