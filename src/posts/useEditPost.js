import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost as editPostApi } from "../services/apiPosts";
import toast from "react-hot-toast";

export function useEditPost() {
  const queryClient = useQueryClient();

  const { mutate: editPost, isPending } = useMutation({
    mutationFn: ({ id, data }) => editPostApi({ id, content: data }),
    onSuccess: ({ id }) => {
      toast.success("Successfully updated post.");
      queryClient.invalidateQueries({ queryKey: ["post", id], exact: true });
    },
  });

  return { editPost, isPending };
}
