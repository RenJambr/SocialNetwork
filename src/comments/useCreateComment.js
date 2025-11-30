import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment as createCommentApi } from "../services/apiComments";
import toast from "react-hot-toast";

export function useCreateComment() {
  const queryClient = useQueryClient();
  const { mutate: createComment, isLoading } = useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
      toast.success("Comment is successfully added.");
    },
  });

  return { createComment, isLoading };
}
