import { useUser } from "../authentication/useUser";
import SearchBar from "../search/SearchBar";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import Notifications from "../notifications/Notifications";

function Header() {
  const { user } = useUser();
  return (
    <header className="h-15 md:h-20 flex md:flex-row items-center justify-between bg-gray-800 text-white px-4 md:px-25 fixed w-full z-1000">
      <div className="flex items-center w-1/4">
        <Logo />
        <SearchBar />
      </div>
      <div className="flex justify-end items-center w-1/4">
        <Notifications user={user} />
        <HeaderMenu user={user} />
      </div>
    </header>
  );
}

export default Header;
