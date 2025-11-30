import { useQuery } from "@tanstack/react-query";
import { getComment } from "../services/apiComments";

export function useGetComment(commentId) {
  const { data: comment, isLoading } = useQuery({
    queryKey: ["comment", commentId],
    queryFn: () => getComment(commentId),
    keepPreviousData: true,
  });

  return { comment, isLoading };
}
