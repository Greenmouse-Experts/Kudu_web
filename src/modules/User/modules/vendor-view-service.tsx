import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../api/apiFactory";
import { toast } from "react-toastify";

interface VendorService {
  message: string;
  data: {
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
    discount_price: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    category: {
      id: number;
      name: string;
    };
    subCategory: {
      id: number;
      name: string;
    };
  }[];
}
export const VendorViewService = () => {
  const { id } = useParams();
  const query = useQuery<VendorService>({
    queryKey: ["services", id],
    queryFn: async () => {
      const response = await apiClient.get(`vendor/services/${id}`);
      return response.data;
    },
  });
  const nav = useNavigate();
  const delete_service = useMutation({
    mutationFn: async (data: any) => {
      let resp = await apiClient.delete(
        `/vendor/services/${service?.id}`,
        data,
      );
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Service deleted successfully");
      nav("/profile/services");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create service");
    },
  });

  if (query.isLoading) return <div>Loading...</div>;
  if (query.isError) return <div>Error loading service data</div>;

  const service = query.data?.data[0];

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-xl" data-theme="kudu">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-0">
          {service?.title}
        </h1>
        <div className="flex space-x-2">
          <Link to={`/profile/service/edit/${id}`} className="btn btn-primary">
            Edit
          </Link>
          <button
            disabled={delete_service.isPending}
            className="btn btn-error"
            onClick={() => delete_service.mutate({})}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="mb-6">
        <img
          src={service?.image_url}
          alt={service?.title}
          className="w-full rounded-lg shadow-lg object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Description
            </h3>
            <p className="text-base text-base-content leading-relaxed">
              {service?.description}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <span className="font-medium text-base-content">Price:</span>
                <span className="font-semibold">{service?.price}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-base-content">Category:</span>
                <span className="font-semibold">{service?.category?.name}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-base-content">
                  Subcategory:
                </span>
                <span className="font-semibold">
                  {service?.subCategory?.name}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-base-content">Location:</span>
                <span className="font-semibold">{`${service?.location_city}, ${service?.location_state}, ${service?.location_country}`}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-base-content">
                  Work Experience:
                </span>
                <span className="font-semibold">
                  {service?.work_experience_years} years
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-base-content">Status:</span>
                <span className="font-semibold">{service?.status}</span>
              </div>
            </div>
          </div>
        </div>

        {service?.additional_images && service.additional_images.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-3 text-primary">
              Additional Images
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.additional_images.map((image: string, index: number) => (
                <img
                  key={index}
                  src={image}
                  alt={`Additional ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
