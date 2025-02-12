import { useState, useEffect } from "react";
import { useGetSubcriptionsPlanQuery } from "../../../reducers/storeSlice";
import Loader from "../../../components/Loader";
import SubscriptionTable from "../components/subscriptionsTable";

const Subscription = () => {
  const [loading, setLoading] = useState(true);
  const [addNewSubModal, setAddNewSubModal] = useState(false);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  const { data: subscriptions, refetch } = useGetSubcriptionsPlanQuery({ refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (subscriptions) {
      setSubscriptionPlans(subscriptions.data);
      setLoading(false);
    }
  }, [subscriptions]);

  const openAddNewSubModal = () => {
    console.log("Open modal");
    setAddNewSubModal(true);
  };

  return (
    <div className="min-h-screen w-full">
      <div>
        {loading ? (
          <div className="w-full h-screen flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <SubscriptionTable data={subscriptionPlans} refetch={refetch} />
        )}
      </div>
    </div>
  );
};

export default Subscription;