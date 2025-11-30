import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkNotification as checkNotificationAPI } from "../services/apiNotifications";

export function useCheckNotification() {
  const queryClient = useQueryClient();
  const { mutate: checkNotification, isPending } = useMutation({
    mutationFn: ({ notificationId }) =>
      checkNotificationAPI({ notificationId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["notifications", variables.userId],
      });
    },
  });

  return { checkNotification, isPending };
}
