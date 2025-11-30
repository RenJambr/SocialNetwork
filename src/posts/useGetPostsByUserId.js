import { useQuery } from "@tanstack/react-query";
import { getPostsByUserId } from "../services/apiPosts";

export function useGetPostsByUserId(userId) {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => getPostsByUserId(userId),
    keepPreviousData: true,
    staleTime: 0,
    refetchInterval: 60 * 1000,
    refetchIntervalInBackground: true,
  });

  return { posts, isLoading };
}
