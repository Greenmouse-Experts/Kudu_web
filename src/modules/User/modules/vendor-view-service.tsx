import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../api/apiFactory";
import { toast } from "react-toastify";

interface VendorService {
  message: string;
  data: {
    additional_images: string[];
    attributes: { name: string; values: string[] | number | boolean }[];
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
    <div className="w-full p-4" data-theme="kudu">
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-4 pt-4">
          <img
            src={service?.image_url}
            alt={service?.title}
            className="rounded-xl w-full h-96 object-cover"
          />
        </figure>

        <div className="card-body">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold mb-4">{service?.title}</h1>
            <div className="badge badge-primary badge-lg">
              {service?.category?.name}
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="badge badge-outline">
              {service?.subCategory?.name}
            </div>
            <div className="badge badge-ghost">
              📍 {service?.location_city}, {service?.location_country}
            </div>
          </div>

          <div className="text-2xl font-bold mb-4">
            ${Number(service?.price).toLocaleString()}
            {service?.discount_price && (
              <span className="text-lg line-through ml-2 text-gray-500">
                ${Number(service?.discount_price).toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-gray-600 mb-6">{service?.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Experience:</span>
              <span className="badge badge-info">
                {service?.work_experience_years} years
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Negotiable:</span>
              <span
                className={`badge ${service?.is_negotiable ? "badge-success" : "badge-error"}`}
              >
                {service?.is_negotiable ? "Yes" : "No"}
              </span>
            </div>
          </div>

          {service?.attributes && service.attributes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.attributes.map((attr, index) => (
                  <div key={index} className="card bg-base-200 p-4">
                    <div className="font-semibold">{attr.name}</div>
                    <div className="text-base-content/70">
                      {Array.isArray(attr.values)
                        ? attr.values.join(", ")
                        : String(attr.values)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {service?.additional_images?.length > 0 && (
            <div className="carousel rounded-box mb-6">
              {service.additional_images.map((img, index) => (
                <div key={index} className="carousel-item">
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    className="w-64 h-48 object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="card-actions justify-end">
            <Link
              to={`/profile/services/edit/${service?.id}`}
              className="btn btn-primary px-8"
            >
              Edit Service
            </Link>
            <button
              onClick={() => delete_service.mutate()}
              className="btn btn-error px-8"
            >
              Delete Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
