import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useErrorHandler from "./errorHooks";
import apiClient from "../apiFactory";

const useApiMutation = () => {
    const handleError = useErrorHandler();
    const token = localStorage.getItem("kuduUserToken");

    const mutation = useMutation({
        mutationFn: ({ url, data = null, method = "POST", headers = false }) => {
            const config = headers ? {
                headers: {
                    Authorization: `Bearer ${token}`, // Add the token dynamically
                    "Content-Type": "application/json",  // Optional: Specify the content type
                },
            } :
                {};

            switch (method.toUpperCase()) {
                case "GET":
                    return apiClient.get(url, { params: data, ...config });
                case "POST":
                    return data ? apiClient.post(url, data, config) : apiClient.post(url, undefined, config);
                case "PUT":
                    return apiClient.put(url, data, config);
                case "DELETE":
                    return data ? apiClient.delete(url, { data, ...config }) : apiClient.delete(url, { undefined, ...config });
                case "PATCH":
                    return data ? apiClient.patch(url, data, config) : apiClient.patch(url, undefined, config);
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }
        },
        onSuccess: (data, variables) => {
            // Call external success callback if provided
            if (variables.onSuccess) {
                variables.onSuccess(data);
            }

            if (!variables.hideToast) {
                // Show toast message
                if (data.data?.message) {
                    toast.success(data.data.message);
                }
            }
        },
        onError: (error, variables) => {
            if (!variables.hideToast) {
                handleError(error);
            }
            variables.onError(error);
        },
    });

    return mutation;
};

export default useApiMutation;
