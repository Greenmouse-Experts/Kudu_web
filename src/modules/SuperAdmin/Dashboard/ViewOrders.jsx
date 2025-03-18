import React from "react";
import { useState } from "react";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";
import { LuArrowLeft } from "react-icons/lu"
import TrackOrder from "../../../components/TrackOrder";
import Table from "../../../components/Tables";


const OrderDetails = () => {
    const navigate = useNavigate();

    const { orderId, id } = useParams();

    const [orderDetails, setOrderDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [ordersData, setOrders] = useState([]);

    const { mutate } = useApiMutation();



    useEffect(() => {
        getOrderDetails();
    }, []);



    const getOrderDetails = () => {
        setIsLoading(true);
        mutate({
            url: `/admin/order/item/details?orderId=${orderId}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setOrderDetails([response.data.data]);
                getOrders();
            },
            onError: (error) => {
                setIsLoading(false);
            },
        });
    };




    const getOrders = () => {
        mutate({
            url: `/admin/order/items`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                const filteredOrder = response.data.data.filter((order) => order.id === id);
                setOrders(filteredOrder)
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    }






    const handleRefetch = () => {
        getOrders();
    }





    if (isLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }


    const isVendorType = true;

    console.log(ordersData)


    return (
        <div className="w-full flex-col gap-5 flex">
            <div className='All flex flex-col gap-6'>
                <div className="rounded-md pb-2 w-full gap-5"><h2 className="text-lg font-semibold text-black-700 mt-4">Customer's Orders </h2></div>
                <div className="w-full flex flex-col md:flex-row justify-between gap-6">
                    <Table
                        headers={[
                            { key: 'refId', label: 'Order ID' },
                            { key: 'trackingNumber', label: 'Tracking Number' },
                            { key: 'totalAmount', label: 'Price' },
                            { key: 'userName', label: "Customer's Name"},
                            { key: 'createdAt', label: 'Date', render: (value) => (dateFormat(value, 'dd-MM-yyyy')) },
                            { key: 'shippingAddress', label: 'Shipping Address' },
                        ]}
                        data={orderDetails}
                        actions={[]}
                        currentPage={null}
                        totalPages={null}
                    />

                </div>

                <TrackOrder userType={isVendorType} admin orderId={orderDetails[0].id} status={ordersData[0].status} refetch={handleRefetch} />

            </div>
        </div>
    );
};

export default OrderDetails;
