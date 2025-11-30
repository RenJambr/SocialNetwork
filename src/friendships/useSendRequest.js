import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRequest as sendRequestApi } from "../services/apiFriends";
import toast from "react-hot-toast";

export function useSendRequest() {
  const queryClient = useQueryClient();

  const { mutate: sendRequest, isLoading } = useMutation({
    mutationFn: ({ p_sender, p_receiver }) =>
      sendRequestApi(p_sender, p_receiver),
    onSuccess: () => {
      queryClient.invalidateQueries(["friendship"]);
      toast.success("Request sended.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { sendRequest, isLoading };
}
