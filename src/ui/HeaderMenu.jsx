import { useState } from "react";
import UserAvatar from "./UserAvatar";
import { useLogout } from "../authentication/login/useLogout.js";
import SpinnerMini from "./SpinnerMini";
import { useOutsideClick } from "../hooks/useOutsideClick.js";
import {
  HiChevronRight,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineUser,
} from "react-icons/hi";
import { Link } from "react-router";

function HeaderMenu({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // MenuRef for close the Menu if user click outside the Menu
  const menuRef = useOutsideClick(() => setIsMenuOpen(false));

  const { logout, isLoading } = useLogout();

  return (
    <div className="flex w-auto justify-center" ref={menuRef}>
      <button
        className="focus:outline-none cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <UserAvatar image={user?.profileImage} />
      </button>
      <ul
        onClick={() => setIsMenuOpen(false)}
        className={`w-full sm:w-50 md:w-60 flex top-[60px] md:top-[80px] items-center absolute z-50 right-0 gap-y-4 flex-col shadow-black bg-[#364153] shadow-2xl rounded-lg p-4 transition-all duration-300 ease-in-out transform ${
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-20 opacity-0 pointer-events-none"
        }`}
      >
        {/* Menu item for profile page */}
        <Link to={`/user/${user.sub}`} className="w-full sm:w-auto">
          <li className="flex justify-between items-center w-full sm:w-45 ps-2 py-2 rounded-3xl bg-[#1E2939] transition-all hover:scale-[1.1] hover:bg-[#30353d]">
            <div className="flex justify-start items-center">
              <HiOutlineUser className="me-2" />
              <span className="font-segoe">Profile</span>
            </div>
            <HiChevronRight className="me-2" />
          </li>
        </Link>
        {/* Menu item for settings */}
        <Link to="/settings" className="w-full sm:w-auto">
          <li className="w-full sm:w-45 rounded-3xl bg-[#1E2939]">
            <button className="flex justify-between items-center w-full ps-2  py-2 rounded-3xl transition-all hover:scale-[1.1] hover:bg-[#30353d] bg-[#1E2939] cursor-pointer">
              <div className="flex justify-start items-center">
                <HiOutlineCog className="me-2" />
                <span className="font-segoe">Settings</span>
              </div>
              <HiChevronRight className="me-2" />
            </button>
          </li>
        </Link>
        {/* Logout button */}
        <li className="w-full sm:w-45 rounded-3xl bg-[#1E2939]">
          <button
            onClick={logout}
            className="flex justify-between items-center w-full ps-2 py-2 rounded-3xl transition-all hover:scale-[1.1] hover:bg-[#30353d] bg-[#1E2939] cursor-pointer"
          >
            {isLoading ? (
              <SpinnerMini />
            ) : (
              <>
                <div className="flex justify-start items-center">
                  <HiOutlineLogout className="me-2" />
                  <span className="font-segoe">Logout</span>
                </div>
                <HiChevronRight className="me-2 " />
              </>
            )}
          </button>
        </li>
      </ul>
    </div>
  );
}

export default HeaderMenu;
