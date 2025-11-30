import { useMutation, useQueryClient } from "@tanstack/react-query";
import { blockUser as blockUserApi } from "../services/apiFriends";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useBlockUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: blockUser, isPending } = useMutation({
    mutationFn: ({ p_blocker, p_blocked }) =>
      blockUserApi(p_blocker, p_blocked),

    onMutate: async ({ p_blocked }) => {
      //cancel any refetch of friendship-stauses
      await queryClient.cancelQueries(["friendship-statuses"]);
      //grabs the current cached data
      const previousData = queryClient.getQueryData(["friendship-statuses"]);
      //loop through all the rows of statuses and if any of users ids match p_blocked id, set the status blocked for that user
      queryClient.setQueryData(["friendship-statuses"], (old = []) =>
        old.map((row) =>
          row.other_user_id === p_blocked ? { ...row, status: "blocked" } : row
        )
      );

      return { previousData };
    },

    onError: (err, _vars, context) => {
      if (context?.previousData) {
        //if mutatation fails return the previousData
        queryClient.setQueryData(["friendship-statuses"], context.previousData);
      }
      toast.error(err.message);
    },

    onSettled: () => {
      queryClient.invalidateQueries(["friendship-statuses"]);
      queryClient.invalidateQueries(["friendship"]);
      //invalidate posts query hides the posts of blocked user
      queryClient.invalidateQueries(["posts"]);
    },

    onSuccess: () => {
      navigate("/home");
      toast.success("User was blocked.");
    },
  });

  return { blockUser, isPending };
}
