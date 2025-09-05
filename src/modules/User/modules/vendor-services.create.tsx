import { Controller, useForm } from "react-hook-form";
import DropZone from "../../../components/DropZone";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../../api/apiFactory";
import { toast } from "react-toastify";
import { useState } from "react";

export default function VendorCreateService() {
  const { register, handleSubmit, setValue, control, watch } = useForm({
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      video_url: "https://www.youtube.com/watch?v=cleaning_demo_123",
      service_category_id: 1,
      service_subcategory_id: 7,
      location_city: "Lagos",
      location_state: "Lagos State",
      location_country: "Nigeria",
      is_negotiable: true,
      work_experience_years: 5,
      additional_images: [],
      price: 0,
      discount_price: 0,
      // attributes: [
      //   { attributeId: 1, value: 12 },
      //   { attributeId: 3, value: "five years experience" },
      //   { attributeId: 6, value: true },
      // ],
    },
  });
  const cat_id = watch("service_category_id");
  const mainImage = watch("image_url");
  const additionalImages = watch("additional_images");
  const create_service = useMutation({
    mutationFn: async (data: any) => {
      let resp = await apiClient.post("/vendor/services", data);
      return resp.data;
    },
    onSuccess: () => {
      toast.success("Service created successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to create service");
    },
  });

  const onSubmit = (data: any) => {
    create_service.mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-8 max-w-4xl mx-auto"
      data-theme="kudu"
    >
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Service Details</h2>
          <div className="form-control flex flex-col gap-2">
            <label className="label">
              <span className="label-text font-semibold">Service Title</span>
            </label>
            <input
              type="text"
              {...register("title")}
              className="input input-bordered input-lg w-full"
              placeholder="e.g. Professional Deep Cleaning Service"
            />
          </div>

          <div className="form-control mt-4 w-full">
            <label className="label">
              <span className="label-text font-semibold">Description</span>
              <span className="label-text-alt">
                Describe your service in detail
              </span>
            </label>
            <textarea
              {...register("description")}
              className="textarea textarea-bordered h-40 mt-2 w-full"
              placeholder="Tell customers what makes your service special..."
            />
          </div>
          <div className="form-control flex flex-col mt-4 gap-2">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <div>
              <Controller
                control={control}
                name="service_category_id"
                render={({ field: { onChange } }) => (
                  <CategorySelect onChange={onChange} />
                )}
              ></Controller>
            </div>
          </div>
          <div className="form-control flex flex-col mt-4 gap-2">
            <label className="label">
              <span className="label-text font-semibold">Sub Category</span>
            </label>
            <div>
              <Controller
                control={control}
                name="service_subcategory_id"
                render={({ field: { onChange } }) => (
                  <SubCategorySelect onChange={onChange} categoryId={cat_id} />
                )}
              ></Controller>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Media</h2>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Main Service Image
              </span>
            </label>
            <DropZone
              text="Drop your main service image here"
              single={true}
              onUpload={(url: string) => {
                if (url.trim()) {
                  setValue("image_url", url);
                }
              }}
            />
            {mainImage && (
              <div className="mt-4">
                <img
                  src={mainImage}
                  alt="Main service preview"
                  className="rounded-lg object-cover h-48 w-full"
                />
              </div>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Additional Images
              </span>
              <span className="label-text-alt">Showcase your work</span>
            </label>
            <DropZone
              text="Upload multiple images to showcase your service"
              single={false}
              onUpload={(urls: string) => {
                if (!additionalImages) {
                  return;
                }
                if (additionalImages.length < 3) {
                  return setValue("additional_images", [
                    ...additionalImages,
                    urls[0],
                  ]);
                }
              }}
            />
            {additionalImages && additionalImages.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {additionalImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img}
                      alt={`Additional service preview ${idx + 1}`}
                      className="rounded-lg object-cover h-32 w-full"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = additionalImages.filter(
                          (_, i) => i !== idx,
                        );
                        setValue("additional_images", newImages);
                      }}
                      className="absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Pricing & Location</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control flex-col flex gap-2">
              <label className="label">
                <span className="label-text font-semibold">Price (₦)</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price")}
                className="input input-bordered"
                placeholder="0.00"
              />
            </div>

            <div className="form-control flex-col flex gap-2">
              <label className="label">
                <span className="label-text font-semibold">
                  Discount Price (₦)
                </span>
                <span className="label-text-alt">Optional</span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("discount_price")}
                className="input input-bordered"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text font-semibold">
                Price is negotiable
              </span>
              <input
                type="checkbox"
                {...register("is_negotiable")}
                className="checkbox checkbox-primary checkbox-lg"
              />
            </label>
          </div>

          <div className="divider">Location</div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control flex-col flex gap-2">
              <label className="label">
                <span className="label-text font-semibold">City</span>
              </label>
              <input
                type="text"
                {...register("location_city")}
                className="input input-bordered"
                placeholder="e.g. Lagos"
              />
            </div>

            <div className="form-control flex-col flex gap-2">
              <label className="label">
                <span className="label-text font-semibold">State</span>
              </label>
              <input
                type="text"
                {...register("location_state")}
                className="input input-bordered"
                placeholder="e.g. Lagos State"
              />
            </div>

            <div className="form-control flex-col flex gap-2">
              <label className="label">
                <span className="label-text font-semibold">Country</span>
              </label>
              <input
                type="text"
                {...register("location_country")}
                className="input input-bordered"
                placeholder="e.g. Nigeria"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-6">Experience</h2>

          <div className="form-control flex-col flex gap-2">
            <label className="label">
              <span className="label-text font-semibold">
                Years of Experience
              </span>
            </label>
            <input
              type="number"
              {...register("work_experience_years")}
              className="input input-bordered"
              placeholder="0"
              min="0"
            />
          </div>
        </div>
      </div>

      <div className="card-actions justify-end">
        <button type="submit" className="btn btn-primary btn-lg">
          Create Service Listing
        </button>
      </div>
    </form>
  );
}

interface Category {
  id: string;
  name: string;
  symbol: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryResponse {
  data: Category[];
}

const CategorySelect = ({ onChange }: { onChange: (item: any) => any }) => {
  const [selected, setSelected] = useState<Category | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const categories = useQuery<CategoryResponse>({
    queryKey: ["categories", "services", page, limit],
    queryFn: () =>
      apiClient
        .get(`/service/categories?page=${page}&limit=${limit}`)
        .then((res) => res.data),
  });

  const handleSelect = (item: Category) => {
    setSelected(item);
    onChange(item.id);
  };

  return (
    <>
      <div className="space-y-3">
        {selected && (
          <div className="badge badge-primary badge-lg badge-soft">
            Selected: {selected.name}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {/*{categories.isFetching && (
            <div className="badge badge-primary badge-lg">Loading...</div>
          )}*/}
          {categories.data?.data?.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`btn btn-sm ${selected?.id === item.id ? "btn-primary" : "btn-ghost"}`}
              onClick={() => handleSelect(item)}
            >
              {item.name}
              {/*<span className="text-xs opacity-70 ml-1">
                ({(item as any)?.subCategories?.length || 0})
              </span>*/}
            </button>
          ))}
        </div>

        {/*{categories?.data?.data?.length > 1 && (
          <div className="join flex justify-center">
            <button
              type="button"
              className="join-item btn btn-xs"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              «
            </button>
            <button className="join-item btn btn-xs">Page {page}</button>
            <button
              type="button"
              className="join-item btn btn-xs"
              onClick={() => setPage(page + 1)}
              // disabled={}
            >
              »
            </button>
          </div>
        )}*/}
      </div>
    </>
  );
};

const SubCategorySelect = ({
  onChange,
  categoryId,
}: {
  onChange: (item: any) => any;
  categoryId: string | number;
}) => {
  const [selected, setSelected] = useState<Category | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const categories = useQuery<CategoryResponse>({
    queryKey: ["sub-categories", "services", categoryId],
    queryFn: () =>
      apiClient
        .get(`/service/subcategories/${categoryId}?page=${page}&limit=${limit}`)
        .then((res) => res.data),
  });

  const totalPages = Math.ceil((categories.data?.data.length || 0) / limit);
  const paginatedData = categories.data?.data.slice(
    (page - 1) * limit,
    page * limit,
  );

  const handleSelect = (item: Category) => {
    setSelected(item);
    onChange(item.id);
  };

  return (
    <>
      <div className="space-y-3">
        {selected && (
          <div className="badge badge-primary badge-lg badge-soft">
            Selected: {selected.name}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {categories.isFetching && (
            <div className="badge badge-primary badge-soft badge-lg">
              Loading...
            </div>
          )}

          {}
          {categories.data?.data?.length === 0 ? (
            <div className="text-sm text-base-content/60">
              No sub-categories found
            </div>
          ) : (
            paginatedData?.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`btn btn-sm ${selected?.id === item.id ? "btn-primary" : "btn-ghost"}`}
                onClick={() => handleSelect(item)}
              >
                {item.name}
                <span className="text-xs opacity-70 ml-1">({item.symbol})</span>
              </button>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="join flex justify-center">
            <button
              type="button"
              className="join-item btn btn-xs"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              «
            </button>
            <button className="join-item btn btn-xs" type="button">
              Page {page}
            </button>
            <button
              type="button"
              className="join-item btn btn-xs"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              »
            </button>
          </div>
        )}
      </div>
    </>
  );
};
