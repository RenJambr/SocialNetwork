import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikeComment as apiToggleLikeComment } from "../services/apiComments";

export function useToggleLikeComment() {
  const queryClient = useQueryClient();
  const { mutate: toggleLikeComment, isLoading } = useMutation({
    mutationFn: ({
      commentId,
      postId,
      updatedLikes,
      made_action_userid,
      notification_userid,
      isLikedComment,
    }) =>
      apiToggleLikeComment({
        commentId,
        postId,
        updatedLikes,
        made_action_userid,
        notification_userid,
        isLikedComment,
      }),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({
        queryKey: ["comment", id],
        exact: true,
      });
    },
  });

  return { toggleLikeComment, isLoading };
}
