import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  return {
    isLoading,
    userid: user?.id,
    user: user?.user_metadata,
    isAuthenticated: user?.role === "authenticated",
  };
}
