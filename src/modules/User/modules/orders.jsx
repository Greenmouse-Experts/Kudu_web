import { useEffect, useState } from "react";
import useAppState from "../../../hooks/appState";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Tables";

export default function ProfileOrders() {
  const [activeTab, setActiveTab] = useState("my orders");
  const [loader, setLoader] = useState(true);
  const [orders, setOrders] = useState([]);

  const { user } = useAppState();

  const { mutate } = useApiMutation();

  const navigate = useNavigate();

  const getOrders = () => {
    setLoader(true);
    mutate({
      url: `user/orders`,
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



  const vendorOrders = () => {
    setLoader(true);
    mutate({
      url: `vendor/order/items`,
      method: "GET",
      headers: true,
      hideToast: true,
      onSuccess: (response) => {
        setOrders(response.data.data);
        setLoader(false);
      },
      onError: (error) => {
        setLoader(false);
        setOrders([]);
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
          <div className="flex border-b w-full justify-between px-4 text-xs sm:text-sm">
            <button
              className={`p-2 sm:p-3 font-semibold ${activeTab === "my orders" ?
                "text-[#FE6A3A] border-b-2 border-[#FE6A3A]" : "text-black"}`}
              onClick={() => [setActiveTab("my orders"), getOrders()]}
            >
              MY ORDERS
            </button>
            {/* <button
              className={`p-2 sm:p-3 font-semibold ml-2 sm:ml-4 ${activeTab === "customer orders" ?
                "text-[#FE6A3A] border-b-2 border-[#FE6A3A]" : "text-black"}`}
              onClick={() => [setActiveTab("customer orders"), vendorOrders()]}
            >
              CUSTOMER'S ORDERS
            </button> */}
          </div>
          {orders.length > 0 ? (
            <Table
              headers={[
                { key: 'refId', label: 'Order ID' },
                { key: 'trackingNumber', label: 'Tracking Number' },
                {
                  key: 'orderItemsCount', label: 'Order Items'
                },
                { key: 'totalAmount', label: 'Price' },
                { key: 'createdAt', label: 'Date', render: (value) => (dateFormat(value, 'dd-MM-yyyy')) },
                { key: 'shippingAddress', label: 'Shipping Address' },
              ]}
              data={orders}
              actions={[
                {
                  label: (row) => {
                    return 'View Order';
                  },
                  onClick: (row) => navigate(`order-details/${row.id}`),
                },
              ]}
              currentPage={null}
              totalPages={null}
            />
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
