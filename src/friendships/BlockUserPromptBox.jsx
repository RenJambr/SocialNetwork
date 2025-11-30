import Button from "../ui/Button";
import Heading from "../ui/Heading";
import SpinnerMini from "../ui/SpinnerMini";
import { useBlockUser } from "./useBlockUser";

function BlockUserPromptBox({ user, onCloseModal, authUser }) {
  const { blockUser, isPending } = useBlockUser();
  return (
    <div className="w-full p-3 flex flex-col justify-center items-center bg-gray-700  rounded-t-sm text-white">
      {isPending && <SpinnerMini />}
      <Heading as="h4" className="!pt-2 !pb-7">
        Do you want to block {user.username}?
      </Heading>
      <div className="flex justify-between items-center w-xs">
        <Button buttonType="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button
          buttonType="submit"
          type="danger"
          onClick={() =>
            blockUser({ p_blocker: authUser?.sub, p_blocked: user?.id })
          }
        >
          Block
        </Button>
      </div>
    </div>
  );
}

export default BlockUserPromptBox;
