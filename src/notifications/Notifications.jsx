import { useEffect, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { HiChevronDown, HiOutlineBell } from "react-icons/hi";
import Notification from "./Notification";
import { useGetNotificationsById } from "./useGetNotificationsById";
import SpinnerMini from "../ui/SpinnerMini";
import ButtonGroup from "../ui/ButtonGroup";
import { useGetFriendRequests } from "../friendships/useGetFriendRequests";
import FriendRequest from "../friendships/FriendRequest";
import { useParams } from "react-router";

function Notifications({ user }) {
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("requests");
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [showAllRequests, setShowAllRequests] = useState(false);

  // Fetching all notifications for authenticated user
  const { notifications, isLoading: isLoadingNotifications } =
    useGetNotificationsById(user.sub, {
      enabled: Boolean(user.sub),
    });

  // Fetching all requests for authenticated user
  const { requests, isLoading: isLoadingRequests } = useGetFriendRequests();

  // MenuRef for close the Menu if user click outside the Menu
  const menuRef = useOutsideClick(() => setIsMenuOpen(false));

  // Effect when menu is closed, hide all notifications (show only 5 newest)
  useEffect(() => {
    if (!isMenuOpen) {
      setShowAllNotifications(false);
      setShowAllRequests(false);
    }
  }, [isMenuOpen]);

  // Effect if params change, close the notifications
  useEffect(() => {
    setIsMenuOpen(false);
    setShowAllNotifications(false);
  }, [params]);

  if (isLoadingNotifications || isLoadingRequests) return <SpinnerMini />;

  // Number of filtered unseen notifications
  const unseenNotifications =
    notifications?.filter((notify) => !notify.seen).length || 0;

  // Sort notifications and requests that the newest is on the top
  const sortedNotifications = [...notifications]?.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // Show only the 5 newest notifications
  const visibleNotifications = showAllNotifications
    ? sortedNotifications
    : sortedNotifications.slice(0, 5);

  const sortedRequests = [...requests]?.sort(
    (a, b) => new Date(b.sent_at) - new Date(a.sent_at)
  );

  const visibleRequests = showAllRequests
    ? sortedRequests
    : sortedRequests.slice(0, 3);

  return (
    <div className="flex w-auto justify-center sm:me-8" ref={menuRef}>
      <ButtonGroup
        className={`focus:outline-none cursor-pointer rounded-full ${
          isMenuOpen && "bg-gray-500"
        }`}
        hover="hoverNotificationsBtn"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="flex justify-center items-center p-2">
          <div className="relative">
            <HiOutlineBell className="text-2xl" />
            {sortedNotifications?.length > 0 || requests?.length > 0 ? (
              <div className="w-2 h-2 rounded-full bg-red-500 flex flex-shrink-0 absolute right-0 top-0"></div>
            ) : (
              ""
            )}
          </div>
        </div>
      </ButtonGroup>
      <ul
        className={`w-full sm:w-90 md:w-100 flex top-[60px] md:top-[80px] items-center absolute z-50 right-0 gap-y-4 flex-col shadow-black bg-[#364153] shadow-2xl rounded-lg p-4 transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full h-7 flex justify-center items-center gap-x-3">
          <ButtonGroup
            hover="hoverPostFeatures"
            className={`relative w-27 text-sm sm:text-base ${
              activeTab === "requests" && "bg-gray-500 rounded-[10px]"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            Requests{" "}
            {sortedRequests?.length >= 1 && (
              <div className="absolute right-0 top-0 rounded-full w-4 h-4 bg-red-500 text-[10px] flex justify-center items-center">
                {sortedRequests?.length < 10 ? sortedRequests?.length : "9+"}
              </div>
            )}
          </ButtonGroup>
          <ButtonGroup
            hover="hoverPostFeatures"
            className={`relative w-33 text-sm sm:text-base ${
              activeTab === "notifications" && "bg-gray-500 rounded-[10px]"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
            {unseenNotifications >= 1 && (
              <div className="absolute right-0 top-0 rounded-full w-4 h-4 bg-red-500 text-[10px] flex justify-center items-center">
                {unseenNotifications < 10 ? unseenNotifications : "9+"}
              </div>
            )}
          </ButtonGroup>
        </div>
        <div className="w-full flex flex-col gap-y-4 justify-center items-center h-[100%]">
          {activeTab === "requests" ? (
            sortedRequests?.length >= 1 ? (
              <>
                {visibleRequests.map((request) => (
                  <FriendRequest
                    key={request.sender_id}
                    sender_id={request.sender_id}
                    sender_username={request.sender_username}
                    sender_profileImage={request.sender_profileimage}
                    sent_at={request.sent_at}
                  />
                ))}
                {/* If there's more than 3 notifications and showAllNotifications state is false then return See more button */}
                {sortedRequests?.length > 3 && !showAllRequests && (
                  <ButtonGroup
                    hover={"hoverPostFeatures"}
                    className={
                      "rounded-[10px] w-40 flex justify-center items-center"
                    }
                    onClick={() => setShowAllRequests(true)}
                  >
                    See more
                    <HiChevronDown className="ms-2" />
                  </ButtonGroup>
                )}
              </>
            ) : (
              <span className="text-gray-400 text-sm">
                There's no friend requests.
              </span>
            )
          ) : (
            ""
          )}
          {activeTab === "notifications" ? (
            sortedNotifications?.length >= 1 ? (
              <>
                {visibleNotifications.map((notification) => (
                  <Notification
                    key={notification.id}
                    notification={notification}
                  />
                ))}
                {/* If there's more than 5 notifications and showAllNotifications state is false then return See more button */}
                {sortedNotifications?.length > 5 && !showAllNotifications && (
                  <ButtonGroup
                    hover={"hoverPostFeatures"}
                    className={
                      "rounded-[10px] w-40 flex justify-center items-center"
                    }
                    onClick={() => setShowAllNotifications(true)}
                  >
                    See more
                    <HiChevronDown className="ms-2" />
                  </ButtonGroup>
                )}
              </>
            ) : (
              <span className="text-gray-400 text-sm">
                There's no notifications.
              </span>
            )
          ) : (
            ""
          )}
        </div>
      </ul>
    </div>
  );
}

export default Notifications;
