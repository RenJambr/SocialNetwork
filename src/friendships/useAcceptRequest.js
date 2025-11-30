import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptRequest as acceptRequestApi } from "../services/apiFriends";
import toast from "react-hot-toast";

export function useAcceptRequest() {
  const queryClient = useQueryClient();

  const { mutate: acceptRequest, isLoading } = useMutation({
    mutationFn: ({ p_sender, p_receiver }) =>
      acceptRequestApi(p_sender, p_receiver),
    onSuccess: () => {
      queryClient.invalidateQueries(["friendship"]);
      toast.success("Request accepted.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { acceptRequest, isLoading };
}
