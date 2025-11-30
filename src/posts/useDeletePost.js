import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deletePostApi } from "../services/apiPosts";
import toast from "react-hot-toast";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isPending } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      toast.success("Successfully deleted post.");
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return { deletePost, isPending };
}
