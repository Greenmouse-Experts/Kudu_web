import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import apiClient from "../../../api/apiFactory";
import { toast } from "react-toastify";

interface Attribute {
  name: string;
  values?: string[];
  value?: boolean;
}

interface ProviderLocation {
  city: string;
  state: string;
  country: string;
}

interface Provider {
  location: ProviderLocation;
  isVerified: boolean;
  id: string;
  trackingId: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  email_verified_at: string;
  phoneNumber: string;
  dateOfBirth: string;
  photo: string;
  fcmToken: string;
  wallet: string;
  dollarWallet: string;
  facebookId: null;
  googleId: null;
  accountType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  kyc: {
    isVerified: boolean;
  };
}

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
}

interface ServiceData {
  additional_images: string[];
  attributes: Attribute[];
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
  provider: Provider;
  category: Category;
  subCategory: SubCategory;
}

interface ServicesQueryResponse {
  data: ServiceData;
}
export default function AdminViewService() {
  const { id } = useParams();
  const services = useQuery<ServicesQueryResponse>({
    queryKey: ["services", id],
    queryFn: async () => {
      const response = await apiClient.get(`/service/${id}`);
      return response.data;
    },
  });

  const suspendServiceMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post(`/admin/service/${id}/suspend`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Service suspended successfully");
      services.refetch(); // Refetch services to update status
    },
  });

  const activateServiceMutation = useMutation({
    mutationFn: async () => {
      const response = await apiClient.post(`/admin/service/${id}/activate`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Service activated successfully");
      services.refetch(); // Refetch services to update status
    },
  });

  if (services.isLoading) {
    return (
      <div className="container mx-auto p-4" data-theme="kudu" id="root">
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (services.isError) {
    return (
      <div className="container mx-auto p-4" data-theme="kudu" id="root">
        <div className="flex justify-center items-center h-screen">
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0-2l-2 2m1-2h.01M12 17.5h.01"
                ></path>
              </svg>
              <span>Error loading service. Please try again later.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const service = services.data?.data;

  return (
    <div className="container mx-auto p-4" data-theme="kudu" id="root">
      <h1 className="text-3xl font-bold mb-6">{service?.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Service Details Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image and Video */}
          <div>
            <img
              src={service?.image_url}
              alt={service?.title}
              className="w-full rounded-lg shadow-md"
              style={{ aspectRatio: "16/9" }}
            />
            {service?.video_url && (
              <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Video</h3>
                <video controls className="w-full rounded-lg shadow-md">
                  <source src={service.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {service?.description}
            </p>
          </div>

          {/* Additional Images */}
          {service?.additional_images &&
            service.additional_images.length > 0 && (
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Additional Images
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {service.additional_images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Additional service image ${index + 1}`}
                      className="w-full rounded-lg shadow-md"
                      style={{ aspectRatio: "1/1" }}
                    />
                  ))}
                </div>
              </div>
            )}

          {/* Attributes */}
          {service?.attributes && service.attributes.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Attributes</h3>
              <div className="space-y-2">
                {service.attributes.map((attr, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b border-gray-200"
                  >
                    <span className="font-medium text-gray-600">
                      {attr.name}:
                    </span>
                    {attr.values ? (
                      <span>{attr.values.join(", ")}</span>
                    ) : (
                      <span>{String(attr.value)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Provider and Pricing Column */}
        <div className="space-y-6">
          {/* Provider Info */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Provider Information</h3>
            <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-md">
              <div className="avatar">
                <div className="w-16 rounded-full">
                  <img src={service?.provider.photo} alt="Provider Photo" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-lg">
                  {service?.provider.firstName} {service?.provider.lastName}
                </p>
                <p className="text-sm text-gray-500">
                  {service?.provider.location.city},{" "}
                  {service?.provider.location.state}
                </p>
                <div className="flex items-center mt-1">
                  {service?.provider.isVerified && (
                    <span className="badge badge-success badge-sm">
                      Verified
                    </span>
                  )}
                  <span className="ml-2 text-xs text-gray-400">
                    ID: {service?.provider.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Pricing</h3>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p className="text-3xl font-bold text-primary">
                {service?.price}
                {service?.discount_price && (
                  <span className="line-through text-gray-400 text-lg ml-2">
                    {service.discount_price}
                  </span>
                )}
              </p>
              {service?.is_negotiable && (
                <div className="badge badge-outline badge-primary mt-2">
                  Negotiable
                </div>
              )}
            </div>
          </div>

          {/* Category & Subcategory */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Category</h3>
            <div className="p-4 bg-white rounded-lg shadow-md space-y-2">
              <p className="font-medium">
                Category:{" "}
                <span className="text-gray-600">{service?.category.name}</span>
              </p>
              <p className="font-medium">
                Subcategory:{" "}
                <span className="text-gray-600">
                  {service?.subCategory.name}
                </span>
              </p>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <p className="font-medium">
                {service?.location_city}, {service?.location_state},{" "}
                {service?.location_country}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Status</h3>
            <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-start gap-4">
              <div className={`badge ${getStatusBadgeClass(service?.status)}`}>
                {service?.status}
              </div>
              {service?.status === "active" ? (
                <button
                  onClick={() => suspendServiceMutation.mutate()}
                  disabled={suspendServiceMutation.isPending}
                  className="btn btn-error btn-sm"
                >
                  {suspendServiceMutation.isPending
                    ? "Suspending..."
                    : "Suspend Service"}
                </button>
              ) : (
                <button
                  onClick={() => activateServiceMutation.mutate()}
                  disabled={activateServiceMutation.isPending}
                  className="btn btn-success btn-sm"
                >
                  {activateServiceMutation.isPending
                    ? "Activating..."
                    : "Activate Service"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getStatusBadgeClass(status: string | undefined): string {
  switch (status) {
    case "active":
      return "badge-success";
    case "inactive":
      return "badge-warning";
    case "pending":
      return "badge-info";
    case "rejected":
      return "badge-error";
    default:
      return "badge-neutral";
  }
}
