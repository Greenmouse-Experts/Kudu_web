import { useQuery } from "@tanstack/react-query";
import { usePagination } from "../../../hooks/appState";
import apiClient from "../../../api/apiFactory";

export default function AdminNotifications() {
  const page_params = usePagination();
  const notifications = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await apiClient.get("admin/notifications", {});
      return response.data;
    },
  });

  return <div>ssssadad {JSON.stringify(notifications.data)}</div>;
}
