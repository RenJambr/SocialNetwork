import Button from "../ui/Button";
import Heading from "../ui/Heading";
import { useDeleteFriend } from "../friendships/useDeleteFriend";
import SpinnerMini from "../ui/SpinnerMini";

function UnfriendPromptBox({ friendName, onCloseModal, authUser, friendUser }) {
  const { deleteFriend, isLoading } = useDeleteFriend();

  return (
    <div className="w-full p-3 flex flex-col justify-center items-center bg-gray-700  rounded-t-sm text-white">
      {isLoading && <SpinnerMini />}
      <Heading as="h4" className="!pt-2 !pb-7">
        Do you want to unfriend {friendName}?
      </Heading>
      <div className="flex justify-between items-center w-xs">
        <Button buttonType="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          buttonType="submit"
          type="danger"
          onClick={() =>
            deleteFriend({ p_user1: authUser?.sub, p_user2: friendUser?.id })
          }
        >
          Unfriend
        </Button>
      </div>
    </div>
  );
}

export default UnfriendPromptBox;
