import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentApi } from "../services/apiComments";
import toast from "react-hot-toast";

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: ({ id }) => deleteCommentApi({ id }),
    onSuccess: () => {
      toast.success("Successfully deleted comment.");
      queryClient.invalidateQueries(["comments"]);
    },
  });

  return { deleteComment, isPending };
}
