import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../services/apiFriends";

export function useGetFriendRequests() {
  const { data: requests, isLoading } = useQuery({
    queryKey: ["friend_requests"],
    queryFn: () => getFriendRequests(),
    staleTime: 0,
    refetchInterval: 60 * 1000,
    refetchIntervalInBackground: true,
  });

  return { requests, isLoading };
}
