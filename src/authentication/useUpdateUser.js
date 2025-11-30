import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("Successfully updated profile.");
      queryClient.setQueriesData(["user"], user);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { updateUser, isPending };
}
