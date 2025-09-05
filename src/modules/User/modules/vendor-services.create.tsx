import { useForm } from "react-hook-form";
import DropZone from "../../../components/DropZone";
import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../api/apiFactory";
import { toast } from "react-toastify";

export default function VendorCreateService() {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "Professional Deep Cleaning Service for Homes",
      description:
        "Transform your home with our comprehensive deep cleaning service. We handle everything from kitchen appliances to bathroom sanitization, window cleaning, and carpet deep cleaning. Our team uses eco-friendly products safe for children and pets. Perfect for move-in/move-out or seasonal cleaning.",
      image_url:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      video_url: "https://www.youtube.com/watch?v=cleaning_demo_123",
      service_category_id: 1,
      service_subcategory_id: 7,
      location_city: "Lagos",
      location_state: "Lagos State",
      location_country: "Nigeria",
      is_negotiable: true,
      work_experience_years: 5,
      additional_images: [
        "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400",
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400",
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=400",
      ],
      price: 25000.0,
      discount_price: 20000.0,
      attributes: [
        { attributeId: 1, value: 12 },
        { attributeId: 3, value: "five years experience" },
        { attributeId: 6, value: true },
      ],
    },
  });

  const create_service = useMutation({
    mutationFn: async (data: any) => {
      let resp = await apiClient.post("/vendor/services", data);
      return resp.data;
    },
    onSuccess: (data) => {
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
              onUpload={(files: File[]) => {
                if (files.length > 0) {
                  setValue("image_url", URL.createObjectURL(files[0]));
                }
              }}
            />
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
              onUpload={(files: File[]) => {
                const urls = files.map((file) => URL.createObjectURL(file));
                setValue("additional_images", urls);
              }}
            />
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
