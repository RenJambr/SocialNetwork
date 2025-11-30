import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFriend as deleteFriendApi } from "../services/apiFriends";
import toast from "react-hot-toast";

export function useDeleteFriend() {
  const queryClient = useQueryClient();

  const { mutate: deleteFriend, isLoading } = useMutation({
    mutationFn: ({ p_user1, p_user2 }) => deleteFriendApi(p_user1, p_user2),
    onSuccess: () => {
      queryClient.invalidateQueries(["friendship"]);
      toast.success("Deleted friendship.");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteFriend, isLoading };
}
