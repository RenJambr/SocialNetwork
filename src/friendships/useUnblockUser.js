import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { unblockUser as unblockUserApi } from "../services/apiFriends";

export function useUnblockUser() {
  const queryClient = useQueryClient();

  const { mutate: unblockUser, isPending } = useMutation({
    mutationFn: ({ p_blocker, p_blocked }) =>
      unblockUserApi(p_blocker, p_blocked),

    onMutate: async ({ p_blocked }) => {
      //cancel any refetch of friendship-stauses
      await queryClient.cancelQueries(["friendship-statuses"]);
      //grabs the current cached data
      const previousData = queryClient.getQueryData(["friendship-statuses"]);
      //loop through all the rows of statuses and if any of users ids match p_blocked id, set the status none for that user
      queryClient.setQueryData(["friendship-statuses"], (old = []) =>
        old.map((row) =>
          row.other_user_id === p_blocked ? { ...row, status: "none" } : row
        )
      );

      return { previousData };
    },

    onError: (error, _vars, context) => {
      if (context?.previousData) {
        //if mutatation fails return the previousData
        queryClient.setQueryData(["friendship-statuses"], context.previousData);
      }
      toast.error(error.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["friendship-statuses"]);
      queryClient.invalidateQueries(["friendship"]);
      //invalidate posts query shows the posts of blocked user
      queryClient.invalidateQueries(["posts"]);
    },

    onSuccess: () => {
      toast.success("User was unblocked.");
    },
  });

  return { unblockUser, isPending };
}
