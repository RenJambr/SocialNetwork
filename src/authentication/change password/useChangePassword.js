import { useMutation } from "@tanstack/react-query";
import { changePassword as changePasswordApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useChangePassword(onSuccess) {
  //getting onSuccess function that shows successfully change password component
  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: changePasswordApi,
    onSuccess: () => {
      toast.success("Successfully changed password.");
      onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { changePassword, isPending };
}
