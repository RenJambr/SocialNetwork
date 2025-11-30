import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsersByQuery } from "../services/apiAuth";

export function useSearchByQuery() {
  const queryClient = useQueryClient();
  const { mutate: searchByQuery, isPending } = useMutation({
    mutationFn: getUsersByQuery,
    onSuccess: (data) => {
      queryClient.setQueryData(["searchedUsers"], data);
      queryClient.invalidateQueries(["searchedUsers"]);
    },
  });

  return { searchByQuery, isPending };
}
