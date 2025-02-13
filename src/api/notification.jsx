import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export function useNotification() {
  return useQuery({
    queryKey: ["notification"],
    queryFn: async () => {
      const response = await axios.get(`/user/notifications`);
      return response.data.data;
    },
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId) => {
      return axios.patch(
        `/user/mark/notification/as/read?notificationId=${notificationId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notification"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}
