import { useState, useEffect } from "react";
import { useGetSubcriptionsPlanQuery } from "../../../reducers/storeSlice"
import Loader from "../../../components/Loader";
import SubscriptionTable from "../../../components/SubscriptionsTable";
import CreateSubscription from "./createSubscription";

const Subscription = () => {
    const [loading, setLoading] = useState(true);
    const [addNewSubModal, setAddNewSubModal] = useState(false)
    const [subscriptionPlans, setSubscriptionPlans] = useState()

    const { data: subscriptions } = useGetSubcriptionsPlanQuery({refetchOnMountOrArgChange: true});

    useEffect(() => {
      if(subscriptions){
        setSubscriptionPlans(subscriptions)
        setLoading(false)
      } 
    }, [subscriptions]);

    const openAddNewSubModal = () => {
      console.log("Open modal")
      setAddNewSubModal(true)
    }

    const closeAddNewSubModal = () => {
      setAddNewSubModal(false)
    }
    
      return (
        <div className="min-h-screen">
          <div>
            {loading ?
              <div className="w-full h-screen flex items-center justify-center">
                <Loader />
              </div>
              :
              <SubscriptionTable data={subscriptionPlans} openAddNewSubModal={openAddNewSubModal} />
            }
          </div>
          {addNewSubModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
                    <div className="bg-white rounded-lg w-11/12 h-[95%] max-w-screen-md overflow-y-auto scrollbar-none"> 
                        <CreateSubscription 
                            closeAddNewSubModal={closeAddNewSubModal} 
                        />
                    </div>
                </div>
            )}
          </div>
      );
};

export default Subscription;