import toast from "react-hot-toast";
import { signup as apiSignUp } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: apiSignUp,
    onSuccess: (user) => {
      queryClient.setQueriesData(["user"], user);
      queryClient.invalidateQueries(["user"]);

      navigate("/home", { replace: true });
      toast.success("Account successfully created!");
    },
  });

  return { signup, isPending };
}
