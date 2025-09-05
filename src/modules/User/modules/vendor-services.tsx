import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiFactory";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SimplePagination } from "../../../components/SimplePagination";
import { usePagination } from "../../../hooks/appState";

interface ServiceCategory {
  id: number;
  name: string;
}

interface ServiceSubCategory {
  id: number;
  name: string;
}

interface VendorService {
  additional_images: string[];
  attributes: any[];
  id: string;
  title: string;
  description: string;
  image_url: string;
  video_url: string;
  vendorId: string;
  service_category_id: number;
  service_subcategory_id: number;
  location_city: string;
  location_state: string;
  location_country: string;
  work_experience_years: number;
  is_negotiable: boolean;
  price: string;
  discount_price: null;
  status: string;
  createdAt: string;
  updatedAt: string;
  category: ServiceCategory;
  subCategory: ServiceSubCategory;
}

interface VendorServicesResponse {
  message: string;
  data: VendorService[];
}
export default function VendorServices() {
  const page_params = usePagination();

  const query = useQuery<VendorServicesResponse>({
    queryKey: [
      "vendorServices",
      page_params.params.page,
      page_params.params.limit,
    ],
    queryFn: async () => {
      const response = await apiClient.get("/vendor/services", {
        params: page_params.params,
      });
      return response.data;
    },
  });
  const publish_service = useMutation({
    mutationFn: async (id: string) => {
      let resp = await apiClient.patch(`/vendor/services/${id}/publish`);
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Service published successfully");
      query.refetch();
      // nav("/profile/service/" + service?.id);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create service");
    },
  });
  const unpublish_service = useMutation({
    mutationFn: async (id: string) => {
      let resp = await apiClient.patch(`/vendor/services/${id}/unpublish`);
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Service unpublished successfully");
      query.refetch();
      // nav("/profile/service/" + service?.id);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create service");
    },
  });
  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {JSON.stringify(query.error)}</div>;
  }

  return (
    <div data-theme="kudu" className="container mx-auto px-4 py-12 w-full ">
      <div className="items-center flex mb-2">
        <h2></h2>
        <Link
          className="btn btn-accent btn-soft ml-auto"
          to={"/profile/services/create"}
        >
          Create
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {query.data?.data &&
          query.data.data.map((service: VendorService) => (
            <div key={service.id} className="card bg-base-100 shadow-lg">
              <figure className="relative overflow-hidden">
                <img
                  src={service.image_url}
                  alt={service.title}
                  className="object-cover grayscale-50 h-56 w-full transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-3 right-3 ">
                  <div className="badge badge-primary badge-lg">
                    ${service.price}
                  </div>
                </div>
              </figure>
              <div className="card-body p-6 border-t border-current/20">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="card-title text-xl font-bold line-clamp-2">
                    {service.title}
                  </h2>
                </div>
                <p className="text-base-content/70 text-sm mt-2 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-base-content/60 mt-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {service.location_city}, {service.location_state}
                  </span>
                </div>
                {service?.status}
                <div className="card-actions justify-between items-center mt-4 pt-4 border-t border-base-200">
                  <div className="flex flex-wrap gap-2">
                    <div className="badge badge-outline badge-sm">
                      {service.category.name}
                    </div>
                    <div className="badge badge-outline badge-sm badge-secondary">
                      {service.subCategory.name}
                    </div>
                  </div>
                  <Link
                    to={`/profile/service/${service.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    View Details
                  </Link>
                  {service?.status === "active" && (
                    <button
                      onClick={() => unpublish_service.mutate(service.id)}
                      disabled={
                        unpublish_service.isPending || publish_service.isPending
                      }
                      className="btn btn-success btn-sm"
                    >
                      Active
                    </button>
                  )}
                  {service?.status === "inactive" && (
                    <button
                      onClick={() => publish_service.mutate(service.id)}
                      disabled={
                        unpublish_service.isPending || publish_service.isPending
                      }
                      className="btn btn-error btn-sm"
                    >
                      Inactive
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      <SimplePagination
        paginate={page_params}
        total={query.data?.data.length || 0}
      />
    </div>
  );
}
