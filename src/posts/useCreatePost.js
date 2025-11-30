import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createpost as createPostApi } from "../services/apiPosts";
import toast from "react-hot-toast";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: createPostApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      toast.success("Post uploaded.");
    },
  });

  return { createPost, isPending };
}
