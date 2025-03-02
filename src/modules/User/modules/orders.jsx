import { useEffect, useState } from "react";
import useAppState from "../../../hooks/appState";
import useApiMutation from "../../../api/hooks/useApiMutation";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Tables";

export default function ProfileOrders() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [loader, setLoader] = useState(true);
  const [orders, setOrders] = useState([]);

  const { user } = useAppState();

  const { mutate } = useApiMutation();

  const navigate = useNavigate();

  const getOrders = () => {
    mutate({
      url: `${user.accountType === 'Vendor' ? 'user/orders' : 'user/orders'}`,
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




  const markDelivered = (orderId) => {
    mutate({
      url: `/user/order/item/update/status`,
      method: "POST",
      headers: true,
      data: {
        orderItemId: orderId,
        status: 'delivered'
      },
      onSuccess: (response) => {
        getOrders();
      }
    });
  }




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
                        {
                          label: (row) => {
                              return 'Mark as Delivered';
                          },
                          onClick: (row) => markDelivered(`${row.id}`),
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
