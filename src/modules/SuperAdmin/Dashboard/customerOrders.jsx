import React, { useEffect, useState } from 'react';
import useApiMutation from '../../../api/hooks/useApiMutation';
import Loader from '../../../components/Loader';
import Table from '../../../components/Tables';
import { dateFormat } from '../../../helpers/dateHelper';
import { useNavigate } from 'react-router-dom';

const CustomerOrders = () => {

    const { mutate } = useApiMutation();
    const [orders, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    const getOrders = () => {
        mutate({
            url: `/admin/order/items`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setOrdersData(response.data.data);
                setLoading(false);
            },
            onError: () => {
                setLoading(false)
            }
        });
    }

    useEffect(() => {
        getOrders();
    }, []);



    return (
        <div className="min-h-screen">
            <div className='All'>
                <div className="rounded-md pb-2 w-full gap-5"><h2 className="text-lg font-semibold text-black-700 mt-4">Customer's Orders </h2></div>
                {loading ?
                    <div className="w-full h-screen flex items-center justify-center">
                        <Loader />
                    </div>
                    :
                    <div className="mt-5">
                        <Table
                            headers={[
                                { key: 'productName', label: 'Product Name' },
                                { key: 'productImage', label: 'Product Image', render: (value) => (<img src={value} width={50} />) },
                                { key: 'quantity', label: 'Quantity' },
                                { key: 'price', label: 'Price' },
                                { key: 'createdAt', label: 'Date', render: (value) => (dateFormat(value, 'dd-MM-yyyy')) },
                            ]}
                            data={orders}
                            transformData={(orders) => orders.map((item) => ({
                                ...item,
                                productName: `${item.product.name}`,
                                productImage: `${item.product.image_url}`,
                            }))}
                            actions={[
                                {
                                    label: (row) => {
                                        return 'View Order';
                                    },
                                    onClick: (row) => navigate(`order-details/${row.orderId}/${row.id}`),
                                }
                            ]}
                            currentPage={null}
                            totalPages={null}
                        />
                    </div>
                }
            </div>
        </div>
    );
};

export default CustomerOrders;
