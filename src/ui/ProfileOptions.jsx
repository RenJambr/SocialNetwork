import { Menu, MenuButton, MenuItem, MenuItems } from "./Menu";
import ButtonGroup from "./ButtonGroup";
import { HiBan, HiPencil, HiUsers } from "react-icons/hi";
import UpdateUserDataForm from "../authentication/UpdateUserDataForm";
import FriendsBox from "../friendships/FriendsBox";
import Modal from "./Modal";

function ProfileOptions({ user, friends, blockedUsers, authUser }) {
  return (
    <div className=" flex justify-center items-center h-10 mr-4">
      <Menu>
        {({ isOpen, setIsOpen }) => (
          <>
            <MenuButton
              onClick={() => setIsOpen(!isOpen)}
              type="profileOptions"
              isOpen={isOpen}
            />

            <MenuItems isOpen={isOpen}>
              {/* Modal for edit profile */}
              <MenuItem>
                <Modal>
                  <Modal.Open opens="editProfile">
                    <ButtonGroup className="flex items-center justify-center rounded-md h-7 px-2 w-25 text-xs md:h-10 md:px-5 md:w-35 md:text-sm bg-[#626569] hover:bg-[#575d63] transition-all hover:scale-[1.05] text-white mb-3 ">
                      Edit profile <HiPencil className="ms-2" />
                    </ButtonGroup>
                  </Modal.Open>
                  <Modal.Window name="editProfile">
                    {(close) => <UpdateUserDataForm onCloseModal={close} />}
                  </Modal.Window>
                </Modal>
              </MenuItem>
              {/* Modal for show friends box */}
              <MenuItem>
                <Modal>
                  <Modal.Open opens="friendsBox">
                    <ButtonGroup className=" medium py-[2px] rounded-md h-7 px-2 w-25 text-xs md:h-10 md:px-5 md:w-35 md:text-sm transition-all hover:scale-[1.05] cursor-pointer flex justify-center items-center text-white bg-[#626569] hover:bg-[#575d63]">
                      Friends <HiUsers className="ms-2" />
                    </ButtonGroup>
                  </Modal.Open>
                  <Modal.Window name="friendsBox" isPrompt={true}>
                    <FriendsBox user={user} users={friends} type="friends" />
                  </Modal.Window>
                </Modal>
              </MenuItem>
              {/* Modal for show blocked users box */}
              <MenuItem>
                <Modal>
                  <Modal.Open opens="blockedUsersBox">
                    <ButtonGroup className="my-3 medium py-[2px] mb-0 rounded h-7 px-2 w-25 text-xs md:h-10 md:px-5 md:w-35 md:text-sm transition-all hover:scale-[1.05] cursor-pointer flex justify-center items-center text-white bg-[#626569] hover:bg-[#575d63]">
                      Blocked <HiBan className="ms-2" />
                    </ButtonGroup>
                  </Modal.Open>
                  <Modal.Window name="blockedUsersBox" isPrompt={true}>
                    <FriendsBox
                      user={user}
                      users={blockedUsers}
                      currUser={authUser}
                    />
                  </Modal.Window>
                </Modal>
              </MenuItem>
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  );
}

export default ProfileOptions;
