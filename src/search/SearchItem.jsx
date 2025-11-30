import { useQueryClient } from "@tanstack/react-query";
import UserAvatar from "../ui/UserAvatar";

function SearchItem({ user, setQuery }) {
  const queryClient = useQueryClient();

  function handleClose() {
    setQuery("");
    queryClient.setQueryData(["searchedUsers"], []);
  }

  return (
    <div className="transition-all hover:bg-[#4A5565]" onClick={handleClose}>
      <UserAvatar
        type="username"
        place="searchBar"
        image={user.profileimage}
        username={user.username}
        userId={user.id}
        justifyContent={"justify-start"}
      />
    </div>
  );
}

export default SearchItem;
