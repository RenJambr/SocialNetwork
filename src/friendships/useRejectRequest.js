import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectRequest as rejectRequestApi } from "../services/apiFriends";
import toast from "react-hot-toast";

export function useRejectRequest() {
  const queryClient = useQueryClient();

  const { mutate: rejectRequest, isLoading } = useMutation({
    mutationFn: ({ p_sender, p_receiver }) =>
      rejectRequestApi(p_sender, p_receiver),
    onSuccess: () => {
      queryClient.invalidateQueries(["friendship"]);
      toast.success("Request rejected.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { rejectRequest, isLoading };
}
