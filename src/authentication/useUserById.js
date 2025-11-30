import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../services/apiAuth";

export function useUserById(userId, options = {}) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId && options.enabled !== false,
  });

  return { isLoading, user };
}
