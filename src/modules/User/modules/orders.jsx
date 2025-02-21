import { useEffect, useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import useAppState from "../../../hooks/appState";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";
import Table from "../../../components/Tables";
import { dateFormat } from "../../../helpers/dateHelper";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import UserOrderTable from "../../orders/components/userOrder";

export default function ProfileOrders() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [loader, setLoader] = useState(true);
  const [orders, setOrders] = useState([""]);

  const { user } = useAppState();

  const { mutate } = useApiMutation();

  const getOrders = () => {
    mutate({
      url: `/user/orders`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setOrders(response.data.data);
        setLoader(false);
      },
      onError: (error) => {
        setLoader(false);
      },
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (loader) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg w-full shadow">
        <h2 className="text-lg font-bold p-6">Orders</h2>
        <div className="w-full h-[1px] border" />
        <div className="mt-5">
          {orders.length > 0 ? (
            <Tabs>
              <TabList>
                <Tab>All Orders</Tab>
                <Tab>Pending</Tab>
                <Tab>Completed</Tab>
                <Tab>Canceled</Tab>
              </TabList>

              <TabPanel>
                <div className="overflow-x-auto">
                  {orders.length > 0 ? (
                    <UserOrderTable cancelOrder={() =>{}} />
                  ) : (
                    <></>
                  )}
                </div>
              </TabPanel>
              {/* Pending Orders */}
              <TabPanel>
                {orders.length > 0 ? (
                  <UserOrderTable c cancelOrder={() =>{}} status="pending" />
                ) : (
                  <></>
                )}
              </TabPanel>

              {/* Delivered Orders */}
              <TabPanel>
                {orders.length > 0 ? (
                  <UserOrderTable status="completed" />
                ) : (
                  <></>
                )}
              </TabPanel>

              {/* Cancelled Orders */}
              <TabPanel>
                {orders.length > 0 ? (
                  <UserOrderTable
                    status="cancelled"
                    refundOrder={() =>{}}
                    refundTab
                  />
                ) : (
                  <></>
                )}
              </TabPanel>
            </Tabs>
          ) : (
            <div className="empty-store">
              <div className="text-center">
                <img
                  src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                  alt="Empty Store Illustration"
                  className="w-80 h-80 mx-auto"
                />
              </div>
              <h1 className="text-center text-lg font-bold mb-4">
                No order items found!
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
