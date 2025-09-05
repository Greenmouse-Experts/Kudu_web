import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiClient from "../../../api/apiFactory";

export const VendorViewService = () => {
  const { id } = useParams();
  const query = useQuery<ServicesQueryResponse>({
    queryKey: ["services", id],
    queryFn: async () => {
      const response = await apiClient.get(`admin/services/${id}`);
      return response.data;
    },
  });

  return <>div {JSON.stringify(query.data)}</>;
};
