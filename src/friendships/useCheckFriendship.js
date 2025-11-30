import { useQuery } from "@tanstack/react-query";
import { checkFriendship as checkFriendshipApi } from "../services/apiFriends";

export function useCheckFriendship(p_user1, p_user2) {
  const { data: friendship, isLoading } = useQuery({
    queryKey: ["friendship", p_user1, p_user2],
    queryFn: () => checkFriendshipApi(p_user1, p_user2),
  });

  return { friendship, isLoading };
}
