import { useQuery } from "@tanstack/react-query";
import { getFriendsById } from "../services/apiFriends";

//This hook is made to get all friends of authenticated user and show them in FriendsBox
export function useGetFriends(userId) {
  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends", userId],
    queryFn: () => getFriendsById(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  });

  return { friends, isLoading };
}
