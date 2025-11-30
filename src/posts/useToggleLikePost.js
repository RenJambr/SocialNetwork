import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLikePost as toggleLikePostApi } from "../services/apiPosts";

export function useToggleLikePost() {
  const queryClient = useQueryClient();
  const { mutate: toggleLikePost, isPending } = useMutation({
    mutationFn: ({
      postId,
      updatedLikes,
      made_action_userid,
      notification_userid,
      isLikedPost,
    }) =>
      toggleLikePostApi({
        postId,
        updatedLikes,
        made_action_userid,
        notification_userid,
        isLikedPost,
      }),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["post", id], exact: true });
    },
  });

  return { toggleLikePost, isPending };
}
