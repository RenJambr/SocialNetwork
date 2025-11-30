import { login as loginApi } from "../../services/apiAuth.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      queryClient.invalidateQueries(["user"]);

      //replace true because of that user can't go back on previous page with the back button
      navigate("/home", { replace: true });
      toast.success("Successfully login");
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  return { login, isLoading };
}
