import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(["user"]);

      //replace true because of that user can't go back on previous page with the back button
      navigate("/login", { replace: true });
      toast.success("Successfully logout");
    },
    onError: () => {
      toast.error("There was a problem with logout.");
    },
  });

  return { logout, isLoading };
}
