import { useState } from "react";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";

const Subscription = () => {
    const { mutate } = useApiMutation();
    const [subscriptions, setSubscriptionData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSubscriptions = () => {
        mutate({
          url: `/admin/subscription/plans`,
          method: "GET",
          headers: true,
          hideToast: true,
          onSuccess: (response) => {
           console.log(response.data)
          },
          onError: () => {
          }
        });
      }
    
      useEffect(() => {
        getSubscriptions();
      }, []);
    
      return (
        <div className="min-h-screen">
          {loading ?
            <div className="w-full h-screen flex items-center justify-center">
              <Loader />
            </div>
            :
            <></>
          }
        </div>
      );
};

export default Subscription;