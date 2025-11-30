import { useState, useRef, useEffect } from "react";
import { HiDotsHorizontal, HiDotsVertical } from "react-icons/hi";

export function Menu({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // Effect for close the Menu if it is clicked outside menu
  useEffect(() => {
    function handleClickOutside(e) {
      if (!menuRef.current) return;

      if (
        !menuRef.current.contains(e.target) &&
        // Close if target isn't modal (in case when it opens two modal e.g. edit comment)
        !e.target.closest(".modal") &&
        // Close if target isn't friendsBox modal
        !e.target.closest("[data-modal-id='friendsBox']") &&
        // Close if target isn't blockedUsersBox modal
        !e.target.closest("[data-modal-id='blockedUsersBox']") &&
        // Close if target isn't editProfile modal
        !e.target.closest("[data-modal-id='editProfile']") &&
        // Close if target isn't blockUser modal
        !e.target.closest("[data-modal-id='blockUser']")
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left " ref={menuRef}>
      {children({ isOpen, setIsOpen })}
    </div>
  );
}

export function MenuButton({ onClick, type, isOpen }) {
  return (
    <button
      onClick={onClick}
      className={`text-white ${
        type === "post"
          ? "flex px-2 justify-center items-center w-full text-lg  bg-gray-500 rounded-sm cursor-pointer"
          : type === "comment"
          ? `text-xs ms-2 hover:underline cursor-pointer ${
              isOpen && " underline "
            }`
          : type === "profileOptions"
          ? "flex py-1.5 px-0.5 sm:py-[11px] justify-center items-center w-full text-lg  bg-gray-500 rounded-lg cursor-pointer hover:scale-[1.1] transition-all"
          : ""
      }`}
    >
      {type === "post" ? (
        <HiDotsHorizontal />
      ) : type === "comment" ? (
        "Options"
      ) : (
        <HiDotsVertical />
      )}
    </button>
  );
}

export function MenuItems({ isOpen, children }) {
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 z-10 mt-2 px-1 py-4 rounded-lg shadow-black bg-[#404a5a] shadow-2xl ">
      {children}
    </div>
  );
}

export function MenuItem({ children }) {
  return <div>{children}</div>;
}
