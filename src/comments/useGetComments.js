import { useQuery } from "@tanstack/react-query";
import { getComments as getCommentsApi } from "../services/apiComments";

export function useGetComments(postId) {
  const { data: comments, isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsApi(postId),
    keepPreviousData: true,
  });

  return { comments, isLoading };
}
