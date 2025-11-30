import { HiSearch } from "react-icons/hi";
import { useSearchByQuery } from "./useSearchByQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import SearchItem from "./SearchItem";
import SpinnerMini from "../ui/SpinnerMini";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useFriendshipStatuses } from "../friendships/useFriendshipStatuses";
import { useUser } from "../authentication/useUser";

function SearchBar() {
  const [query, setQuery] = useState("");
  const queryClient = useQueryClient();
  // If window width is less than 468px then it won't have on focus animation, otherwise it will has an animation to width
  const windowWidth = window.innerWidth;
  const searchResults = queryClient.getQueryData(["searchedUsers"]);
  //containerRef if user clicks outside list of users
  //it sets query to "" and reset query data for searchedUsers
  const containerRef = useOutsideClick(() => {
    setQuery("");
    queryClient.setQueryData(["searchedUsers"], []);
  });

  //hook for searching by query
  const { searchByQuery, isPending } = useSearchByQuery();
  //hook for getting authenticated user
  const { user: currUser, isLoading: isLoadingUser } = useUser();

  //memoized function for getting id of searched users
  const usersIdsFromSearchResults = useMemo(
    () =>
      searchResults
        ?.map((user) => user.id)
        .filter((id, i, arr) => id !== currUser.sub && arr.indexOf(id) === i),
    [searchResults, currUser.sub]
  );

  //hook for getting friendship statuses with searched users that serves to filter users that is blocked
  const { friendshipStatuses } = useFriendshipStatuses(
    currUser.sub,
    usersIdsFromSearchResults,
    {
      enabled: Boolean(usersIdsFromSearchResults?.length > 0 && currUser.sub),
    }
  );

  function handleSearch(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) searchByQuery(value);
    else queryClient.setQueryData(["searchedUsers"], []);
  }

  return (
    <div className="flex justify-center sm:relative ms-5 " ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          placeholder="Search"
          onChange={handleSearch}
          className={`md:text-sm text-xs w-25 ${
            windowWidth > 468 && "focus:w-56"
          } transition-all duration-300 ease-in-out py-1 pl-7 pr-1 text-gray-200 bg-gray-700 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm`}
        />
        <HiSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-200 text-lg" />
      </div>

      {Array.isArray(searchResults) && searchResults.length > 0 && (
        <div className="w-full h-auto bg-[#1E2939] absolute mt-[35px] sm:mt-[30px] rounded-b-md left-0 right-0">
          {isPending || isLoadingUser ? (
            <SpinnerMini />
          ) : (
            //piece of code that filter blocked users in search bar
            searchResults
              ?.filter(
                (user) =>
                  !friendshipStatuses?.some(
                    (f) => f.other_user_id === user.id && f.status === "blocked"
                  )
              )
              .map((user) => (
                <SearchItem user={user} key={user.id} setQuery={setQuery} />
              ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
