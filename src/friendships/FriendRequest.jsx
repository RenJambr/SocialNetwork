import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import ButtonGroup from "../ui/ButtonGroup";
import UserAvatar from "../ui/UserAvatar";
import { timeAgo } from "../utils/helpers.js";
import { useUser } from "../authentication/useUser.js";
import SpinnerMini from "../ui/SpinnerMini";
import { useAcceptRequest } from "./useAcceptRequest.js";
import { useRejectRequest } from "./useRejectRequest.js";

function FriendRequest({
  sender_username,
  sender_profileImage,
  sent_at,
  sender_id,
}) {
  const { userid: receiver_id, isLoading } = useUser();
  const { acceptRequest, isLoading: isAcceptingRequest } = useAcceptRequest();
  const { rejectRequest, isLoading: isRejectingRequest } = useRejectRequest();

  if (isLoading || isAcceptingRequest || isRejectingRequest)
    return <SpinnerMini />;

  const buttons = (
    <div className="flex justify-between items-center mt-2 ">
      <ButtonGroup
        className="bg-gradient-to-r from-[#217c29] to-gray-600 hover:from-gray-600 hover:to-[#217c29] text-white font-medium py-[3px] px-3 rounded-lg text-xs sm:text-sm transition duration-200 cursor-pointer flex justify-between items-center ms-0"
        onClick={() => {
          acceptRequest({
            p_sender: sender_id,
            p_receiver: receiver_id,
          });
        }}
      >
        Accept <HiCheckCircle className="ms-2" />
      </ButtonGroup>
      <ButtonGroup
        onClick={() => {
          rejectRequest({
            p_sender: sender_id,
            p_receiver: receiver_id,
          });
        }}
        className="bg-gradient-to-r from-gray-600 to-red-500 hover:from-red-500 hover:to-gray-600 text-red-50 font-medium py-[3px] px-3 rounded-lg text-xs sm:text-sm transition duration-200 cursor-pointer flex justify-between items-center"
      >
        Reject <HiXCircle className="ms-2" />
      </ButtonGroup>
    </div>
  );

  return (
    <div className=" text-white rounded-lg px-4 py-3 drop-shadow-lg w-full my-2 sm:mx-4">
      <div className="flex justify-between items-center">
        <UserAvatar
          type="username"
          image={sender_profileImage}
          username={sender_username}
          userId={sender_id}
          date={timeAgo(sent_at)}
          height="h-17"
          width="h-17"
          friendRequestButtons={buttons}
        />
      </div>
    </div>
  );
}

export default FriendRequest;
