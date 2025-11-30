import { useMutation } from "@tanstack/react-query";
import { sendLinkForChangePassword } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSendLinkChangePass() {
  const { mutate: sendLinkChangePass, isPending } = useMutation({
    mutationFn: sendLinkForChangePassword,
    onSuccess: () => {
      toast.success("Secure link was sent to your email.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { sendLinkChangePass, isPending };
}
