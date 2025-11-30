import { useQuery } from "@tanstack/react-query";
import { getNotificationsByUserId } from "../services/apiNotifications";

export function useGetNotificationsById(userId) {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications", userId],
    queryFn: () => getNotificationsByUserId(userId),
    enabled: !!userId,
  });

  return { notifications, isLoading };
}
