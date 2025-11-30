import { useMutation } from "@tanstack/react-query";
import { sendVerificationCode } from "../services/apiAuth";
import toast from "react-hot-toast";

//custom hook for mutate sending verification code to the email

export function useVerifyEmail() {
  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: sendVerificationCode,
    onSuccess: () => {
      toast.success("The code has been sent to your email.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { verifyEmail, isPending };
}
