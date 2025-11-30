import { useQuery } from "@tanstack/react-query";
import { getPost } from "../services/apiPosts";

export function useGetPost(postId) {
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
    keepPreviousData: true,
    enabled: !!postId,
  });

  return { isLoading, post };
}
