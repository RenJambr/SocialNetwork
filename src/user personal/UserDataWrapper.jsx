import {
  HiCheck,
  HiCheckCircle,
  HiUserAdd,
  HiX,
  HiXCircle,
} from "react-icons/hi";
import { useUser } from "../authentication/useUser";
import Modal from "../ui/Modal";
import Spinner from "../ui/Spinner";
import ButtonGroup from "../ui/ButtonGroup";
import { useCheckFriendship } from "../friendships/useCheckFriendship";
import { useSendRequest } from "../friendships/useSendRequest";
import { useAcceptRequest } from "../friendships/useAcceptRequest";
import { useRejectRequest } from "../friendships/useRejectRequest";

import UnfriendPromptBox from "../friendships/UnfriendPromptBox";
import SpinnerMini from "../ui/SpinnerMini";
import BlockUnblockButton from "../ui/BlockUnblockButton";
import { useGetBlockedUsers } from "../friendships/useGetBlockedUsers";
import ProfileOptions from "../ui/ProfileOptions";

function UserDataWrapper({ user, friends }) {
  const { user: authUser, isLoading: isLoadingUser } = useUser();
  const { blockedUsers, isLoading: isLoadingBlockedUsers } = useGetBlockedUsers(
    authUser.sub
  );
  //Hook that checking friendship and returns status, in case if it's own profile it returns own profile value
  const { friendship, isLoading } = useCheckFriendship(authUser?.sub, user?.id);
  //Hooks for friendship actions
  const { sendRequest, isLoading: isSendingRequest } = useSendRequest();
  const { acceptRequest, isLoading: isAcceptingRequest } = useAcceptRequest();
  const { rejectRequest, isLoading: isRejectingRequest } = useRejectRequest();

  if (isLoadingUser || isLoading || isLoadingBlockedUsers) return <Spinner />;

  let friendshipCase;

  switch (friendship) {
    case "friends":
      friendshipCase = (
        <Modal>
          <Modal.Open opens="Unfriend prompt">
            <ButtonGroup
              marginX="mx-4"
              className="flex justify-between items-center bg-gray-500 hover:scale-[1.1] text-red-50 font-medium px-2 text-nowrap py-[15px] sm:py-[2px] sm:px-3 rounded-lg text-xs sm:text-sm transition duration-200 cursor-pointer"
            >
              Friend <HiCheck className="ms-2" />
            </ButtonGroup>
          </Modal.Open>
          <Modal.Window name="Unfriend prompt" isPrompt={true}>
            {(close) => (
              <UnfriendPromptBox
                friendName={user.username}
                authUser={authUser}
                friendUser={user}
                onCloseModal={close}
              />
            )}
          </Modal.Window>
        </Modal>
      );
      break;
    case "sent":
      friendshipCase = (
        <ButtonGroup
          onClick={() => {
            rejectRequest({ p_sender: authUser?.sub, p_receiver: user?.id });
          }}
          marginX="mx-4"
          className="bg-[#626970] hover:scale-[1.1] text-white font-medium px-2 text-nowrap py-[15px] sm:py-[2px] sm:px-3 rounded-lg text-xs sm:text-sm transition duration-200 cursor-pointer flex justify-between items-center"
        >
          Cancel request <HiX className="ms-2" />
        </ButtonGroup>
      );
      break;
    case "received":
      friendshipCase = (
        <>
          {isAcceptingRequest ? (
            <SpinnerMini />
          ) : (
            <ButtonGroup
              onClick={() => {
                acceptRequest({
                  p_sender: user?.id,
                  p_receiver: authUser?.sub,
                });
              }}
              marginX="mx-1"
              className="bg-[#217c29] hover:scale-[1.1] text-white font-medium px-2 text-nowrap py-[15px] sm:py-[2px] sm:px-3 rounded-lg text-xs sm:text-sm transition duration-200 cursor-pointer flex justify-between items-center"
            >
              Accept <HiCheckCircle className="ms-2" />
            </ButtonGroup>
          )}
          {isRejectingRequest ? (
            <SpinnerMini />
          ) : (
            <ButtonGroup
              onClick={() => {
                rejectRequest({
                  p_sender: user?.id,
                  p_receiver: authUser?.sub,
                });
              }}
              marginX="mx-1"
              className="bg-red-500 hover:scale-[1.1] text-red-50 font-medium px-2 text-nowrap py-[15px] sm:py-[2px] sm:px-3 rounded-lg text-xs sm:text-sm transition duration-200 cursor-pointer flex justify-between items-center"
            >
              Reject <HiXCircle className="ms-2" />
            </ButtonGroup>
          )}
        </>
      );
      break;
    case "own profile":
      friendshipCase = "";
      break;
    default:
      friendshipCase = isSendingRequest ? (
        <SpinnerMini />
      ) : friendship !== "blocked" ? (
        <ButtonGroup
          onClick={() =>
            sendRequest({
              p_sender: authUser?.sub,
              p_receiver: user?.id,
            })
          }
          marginX="mx-4"
          className="bg-[#0f6ec7] hover:scale-[1.1] text-white font-medium px-2 text-nowrap py-[15px] sm:py-[2px] sm:px-3 rounded-lg text-xs sm:text-sm transition duration-200 cursor-pointer flex justify-between items-center"
        >
          Add friend
          <HiUserAdd className="ms-2" />
        </ButtonGroup>
      ) : (
        ""
      );
  }
  return (
    <div className="w-full h-[150px] sm:h-[250px] md:h-[400px] relative mb-[50px]">
      <Modal>
        <Modal.Open opens="Cover image">
          <img
            src={user.coverimage}
            alt="Cover img"
            className="w-full object-cover h-[150px] sm:h-[250px] md:h-[400px] cursor-pointer"
          />
        </Modal.Open>
        <Modal.Window name="Cover image">
          <img
            src={user.coverimage}
            alt="Cover img"
            className="w-full object-cover h-[150px] sm:h-[250px] md:h-[400px]"
          />
        </Modal.Window>
      </Modal>
      <div className="absolute h-24 w-24 rounded sm:h-30 sm:w-30 md:h-40 md:w-40 left-5 sm:left-10 bottom-0  translate-y-1/2">
        <Modal>
          <Modal.Open opens="Profile image">
            <img
              src={user.profileimage}
              alt="Profile img"
              className="w-full h-full object-cover rounded-full border-[#364153] border-3 cursor-pointer"
            />
          </Modal.Open>
          <Modal.Window name="Profile image">
            <img
              src={user.profileimage}
              alt="Profile img"
              className="w-[50%] h-[50%] object-cover  border-[#364153] border-3"
            />
          </Modal.Window>
        </Modal>
      </div>
      <div className="flex w-full justify-between">
        <div
          className={`${
            authUser?.sub === user?.id
              ? "mt-5 ms-30"
              : "ms-10 mt-12 xs:mt-5 xs:ms-30"
          } sm:ms-45 md:ms-55 flex flex-col w-full`}
        >
          <p className="text-white text-sm sm:text-lg font-bold w-full">
            {user.username}{" "}
            <span className="bg-[#626569] rounded-full text-white text-xs sm:text-sm ms-2 px-1.5 py-1">
              {user.age}
            </span>
          </p>
          <div className="flex items-center mt-2 w-auto">
            <p className="text-[#b8bec5] text-xs italic whitespace-nowrap sm:text-sm">
              {user.nationality}{" "}
            </p>
            <span className="ms-2 flex-shrink-0">
              <img
                src={user.countryflag}
                alt="Country"
                className="h-3 sm:h-4 rounded"
              />
            </span>
          </div>
        </div>
        <div className="sm:h-10 flex flex-row items-center justify-center mt-2 sm:mt-6 me-4">
          <div className="sm:h-10 h-7.5 flex justify-end ">
            {friendshipCase}
          </div>

          {authUser.sub === user.id ? (
            //If it's profile of authenticated user this shows ProfileOption component, in other case it shows block/unblock button
            <ProfileOptions
              user={user}
              friends={friends}
              blockedUsers={blockedUsers}
              authUser={authUser}
            />
          ) : (
            <BlockUnblockButton
              authUser={authUser}
              user={user}
              friendship={friendship}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDataWrapper;
