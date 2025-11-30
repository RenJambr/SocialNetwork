import { useUser } from "../authentication/useUser";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Modal from "../ui/Modal";
import FriendsBox from "./FriendsBox";
import { useGetBlockedUsers } from "./useGetBlockedUsers";

function BlockedUsers() {
  const { user: authUser } = useUser();

  //get blocked users from authenticated user
  const { blockedUsers } = useGetBlockedUsers(authUser.sub);

  return (
    <div className="w-full flex justify-between items-center pe-[1.2rem]">
      <Heading as="h3">Blocked Users</Heading>
      <Modal>
        <Modal.Open opens="blockedUsersBox">
          <Button type="loginSignup" className="w-28 sm:w-31">
            View
          </Button>
        </Modal.Open>
        <Modal.Window name="blockedUsersBox" isPrompt={true}>
          <FriendsBox users={blockedUsers} currUser={authUser} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default BlockedUsers;
