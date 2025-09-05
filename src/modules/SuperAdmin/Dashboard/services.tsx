import { useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiFactory";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../../../hooks/appState";
import { SimplePagination } from "../../../components/SimplePagination";

interface Attribute {
  name: string;
  values?: string[];
  value?: boolean;
}

interface ProviderLocation {
  city: string;
  state: string;
  country: string;
  street?: string;
}

interface Provider {
  location: ProviderLocation;
  isVerified: boolean;
  id: string;
  trackingId: string;
  firstName: string;
  lastName: string;
  gender: string | null;
  email: string;
  email_verified_at: string | null;
  phoneNumber: string;
  dateOfBirth: string | null;
  photo: string | null;
  fcmToken: string;
  wallet: string;
  dollarWallet: string;
  facebookId: null;
  googleId: null;
  accountType: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
}

interface SubCategory {
  id: number;
  name: string;
}

interface Service {
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
  discount_price: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  provider: Provider;
  category: Category;
  subCategory: SubCategory;
}

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
}

interface SuperAdmin {
  message: string;
  data: Service[];
  pagination: Pagination;
}
export default function AdminServices() {
  const page_params = usePagination();
  const services = useQuery<SuperAdmin>({
    queryKey: ["services", page_params.params],
    queryFn: async () => {
      const response = await apiClient("admin/services", {
        params: {
          limit: page_params.limit,
          page: page_params.page,
          // status: "suspended",
        },
      });
      return response.data;
    },
  });
  const data = services.data?.data;
  return (
    <div data-theme="kudu" id="root" className="p-2">
      <div className="p-4 flex justify-between items-center">
        <div className="flex gap-2">
          <h1 className="text-3xl font-bold">All Services</h1>
          {services.isFetching && (
            <span className="ml-4 loading text-primary"></span>
          )}
          {services.isError && (
            <div>
              <button className="btn ml-3" onClick={() => services.refetch()}>
                Reload
              </button>
            </div>
          )}
        </div>
        <button className="btn btn-primary">Add New Service</button>
      </div>
      {services.isLoading && (
        <div className="flex justify-center items-center h-96">
          <p>Loading services...</p>
        </div>
      )}
      {services.isError && (
        <div className="flex justify-center items-center h-96">
          <p>Error loading services.</p>
        </div>
      )}
      {!services.isLoading && !services.isError && data?.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <p>No services found.</p>
        </div>
      )}
      {!services.isLoading && !services.isError && data && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
      <div className="bg-white mt-12">
        <SimplePagination total={data?.length || 0} paginate={page_params} />
      </div>
    </div>
  );
}

const ServiceCard = ({ service }: { service: Service }) => {
  const navigate = useNavigate();
  const navigateToService = () => {
    navigate(`/admin/services/${service.id}`);
  };
  return (
    <div
      key={service.id}
      className="card w-full bg-base-100 shadow-xl transition-transform duration-300 "
    >
      <figure>
        <img
          src={service.image_url}
          alt={service.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl font-bold truncate">
          {service.title}
        </h2>
        <p className="text-gray-600 line-clamp-3">{service.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <div className="badge badge-primary badge-outline">
            {service.category.name}
          </div>
          <div className="badge badge-secondary badge-outline">
            {service.subCategory.name}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <span className="font-semibold text-lg">
            {service.price !== "0.00"
              ? `$${parseFloat(service.price).toFixed(2)}`
              : "Price Negotiable"}
          </span>
          <button
            className="btn btn-sm btn-primary"
            onClick={() => {
              navigateToService();
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
