import { useQuery } from "@tanstack/react-query";
import { getFriendshipsStatuses } from "../services/apiFriends";

export function useFriendshipStatuses(userId, otherUsersIds, options = {}) {
  const { data: friendshipStatuses, isPending } = useQuery({
    queryKey: ["friendship-statuses", userId, otherUsersIds],
    queryFn: () => getFriendshipsStatuses(userId, otherUsersIds),
    enabled:
      Boolean(userId && otherUsersIds?.length > 0) && options.enabled !== false,
    ...options,
  });

  return { friendshipStatuses, isPending };
}
