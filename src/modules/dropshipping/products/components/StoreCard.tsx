import Modal from "../../../../components/dialogs-modals/SimpleModal";
import { useModal } from "../../../../helpers/client";

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

  return (
    <>
      <div key={item.id} className="card bg-base-100 shadow-xl">
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
              <div className="w-full h-32 bg-gray-200 rounded-t-lg"></div>
            </>
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.name}</h2>
          <p className="text-sm">
            {item.location.city}, {item.location.state}
          </p>
          <p className="text-xs">{item.tipsOnFinding}</p>
          <div
            className={
              "badge ring ring-current/50 badge-soft " +
              (item.isVerified ? "badge-success" : "badge-error")
            }
          >
            Status: {item.isVerified ? "Active" : "Inactive"}
          </div>
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
      <Modal ref={modal.ref} title="Select Category"></Modal>
    </>
  );
}
