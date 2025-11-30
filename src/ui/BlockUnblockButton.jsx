import { HiBan } from "react-icons/hi";
import ButtonGroup from "./ButtonGroup";
import Modal from "./Modal";
import BlockUserPromptBox from "../friendships/BlockUserPromptBox";
import { useUnblockUser } from "../friendships/useUnblockUser";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { Menu, MenuButton, MenuItem, MenuItems } from "./Menu";

function BlockUnblockButton({ friendship, authUser, user }) {
  const { unblockUser } = useUnblockUser();
  //Block button that opens modal BlockUserPromptBox
  const blockButton = (
    <Modal>
      <Modal.Open opens="blockUser">
        <ButtonGroup
          type="danger"
          className="bg-red-500 hover:bg-red-600 hover:scale-[1.05] text-white font-medium px-2 py-[15px] sm:py-[10px] sm:px-5 w-18 sm:w-25 rounded-lg text-xs sm:text-sm transition-all ease-in-out duration-200 cursor-pointer flex justify-between items-center h-5 sm:h-[100%]"
        >
          Block
          <HiBan className="ms-1" />
        </ButtonGroup>
      </Modal.Open>
      <Modal.Window name="blockUser">
        {(close) => (
          <BlockUserPromptBox
            onCloseModal={close}
            user={user}
            authUser={authUser}
          />
        )}
      </Modal.Window>
    </Modal>
  );

  const unblockButton = (
    <ButtonGroup
      onClick={() =>
        unblockUser({ p_blocker: authUser.sub, p_blocked: user.id })
      }
      className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-2 py-[15px] sm:py-[10px] sm:px-5 w-18 sm:w-25 rounded-3xl text-xs sm:text-sm transition-all ease-in-out duration-200 cursor-pointer flex justify-between items-center h-5 sm:h-[100%]"
    >
      Unblock
      <HiArrowUturnLeft className="ms-1" />
    </ButtonGroup>
  );

  return (
    //Return a Menu component
    <Menu>
      {({ isOpen, setIsOpen }) => (
        <>
          <MenuButton
            onClick={() => setIsOpen(!isOpen)}
            type="profileOptions"
            isOpen={isOpen}
          />
          <MenuItems isOpen={isOpen}>
            <MenuItem>
              {authUser.sub !== user.id && friendship !== "blocked"
                ? blockButton
                : authUser.sub !== user.id && friendship === "blocked"
                ? unblockButton
                : ""}
            </MenuItem>
          </MenuItems>
        </>
      )}
    </Menu>
  );
}

export default BlockUnblockButton;
