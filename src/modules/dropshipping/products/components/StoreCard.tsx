import { useMutation } from "@tanstack/react-query";
import Modal from "../../../../components/dialogs-modals/SimpleModal";
import { useModal } from "../../../../helpers/client";
import { useSingleSelect } from "../../../../helpers/selectors";
import GetCategories from "./GetCategoris";
import apiClient from "../../../../api/apiFactory";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { extract_message } from "../../../../helpers/auth";
interface Store {
  id: string;
  name: string;
  location: {
    city: string;
    state: string;
    address: string;
    country: string;
  };
  businessHours: {
    sunday: string;
    saturday: string;
    monday_friday: string;
  };
  tipsOnFinding: string;
  logo: string;
  isVerified: boolean;
  currency: {
    symbol: string;
  };
}

export default function StoreCard({ item }: { item: Store }) {
  const modal = useModal();
  const selectProps = useSingleSelect(null);
  const mutation = useMutation({
    mutationFn: (fn: any) => fn(),
  });
  const { itemId } = useParams();
  const add_to_store = async () => {
    const resp = await apiClient.post("admin/aliexpress/products/import", {
      productId: itemId,
      shippingCountry: "NG",
      currency: "USD",
      storeId: item.id,
      categoryId: selectProps.selectedItem,
      priceIncrementPercent: "30",
    });
    return resp.data;
  };
  return (
    <>
      <div key={item.id} className="card bg-base-100 shadow-xl relative">
        <figure>
          {item.logo ? (
            <>
              <img
                src={item.logo}
                alt={item.name}
                className="w-full h-32 object-cover"
              />
            </>
          ) : (
            <>
              <div className="w-full h-32 bg-gray-200 rounded-t-lg grid place-items-center">
                No Image
              </div>
            </>
          )}
        </figure>
        <div
          className={
            "badge ring ring-current/50 badge-soft  absolute right-0 top-0  m-2 " +
            (item.isVerified ? "badge-success" : "badge-error")
          }
        >
          Status: {item.isVerified ? "Active" : "Inactive"}
        </div>
        <div className="card-body p-4 space-y-1">
          <div className="flex justify-between">
            <h2 className="card-title">{item.name}</h2>
            <div className="text-primary font-bold text-xl">
              {item.currency.symbol}
            </div>
          </div>
          <p className="">
            {item.location.city}, {item.location.state}
          </p>
          <p className="line-clamp-1 ">{item.tipsOnFinding}</p>

          <div className="card-actions justify-end">
            <button
              onClick={() => modal.showModal()}
              className="btn btn-primary"
              color="blue"
            >
              Import Product
            </button>
          </div>
        </div>
      </div>
      <Modal
        ref={modal.ref}
        title="Select Category"
        actions={
          <>
            <button
              onClick={() => {
                toast.promise(mutation.mutateAsync(add_to_store), {
                  loading: "Importing...",
                  success: "Product imported successfully!",
                  error: extract_message,
                });
              }}
              className="btn ml-auto btn-primary"
            >
              Import
            </button>
          </>
        }
      >
        <GetCategories selectProps={selectProps} />
      </Modal>
    </>
  );
}
