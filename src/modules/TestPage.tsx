import { useQuery } from "@tanstack/react-query";
import apiClient from "../api/apiFactory";

export default function TestPage() {
  const query = useQuery({
    queryKey: ["test-query"],
    queryFn: async () => {
      const response = await apiClient(
        "user/shipping/addresses?shipToCountryCode=UK",
      );
      return response.data;
    },
  });
  return (
    <div data-theme="kudu" className="pt-26 min-h-screen">
      {JSON.stringify(query.data)}ss
    </div>
  );
}
