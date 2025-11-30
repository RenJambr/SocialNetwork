import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editComment as editCommentApi } from "../services/apiComments";

export function useEditComment() {
  const queryClient = useQueryClient();

  const { mutate: editComment, isPending } = useMutation({
    mutationFn: ({ id, data }) => editCommentApi({ id, content: data }),
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: ["comment", id], exact: true });
    },
  });

  return { editComment, isPending };
}
