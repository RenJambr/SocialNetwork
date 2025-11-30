import { useQuery } from "@tanstack/react-query";
import { getBlockedUsers } from "../services/apiFriends";

export function useGetBlockedUsers(userId) {
  const { data: blockedUsers, isLoading } = useQuery({
    queryKey: ["blockedUsers", userId],
    queryFn: () => getBlockedUsers(userId),
    enabled: Boolean(userId),
  });

  return { blockedUsers, isLoading };
}
