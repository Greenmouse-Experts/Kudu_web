import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import apiClient from "./apiFactory";

export function useProductById(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await apiClient.get(`/product?productId=${id}`);
      return response.data.data;
    },
    enabled: !!id,
  });
}
