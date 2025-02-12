import { useEffect, useState } from 'react';
import Imgix from 'react-imgix';
import { Link } from 'react-router-dom';
import useAppState from '../../../hooks/appState';
import useApiMutation from '../../../api/hooks/useApiMutation';
import Loader from '../../../components/Loader';

export default function ProfileOrders() {

    const [activeTab, setActiveTab] = useState('ongoing');
    const [loader, setLoader] = useState(true);
    const [orders, setOrders] = useState([]);

    const { user } = useAppState();

    const { mutate } = useApiMutation();


    const getVendorOrders = () => {
        mutate({
            url: `/vendor/order/items`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setOrders(response.data.data);
                setLoader(false);
            },
            onError: (error) => {
                setLoader(false)
            },
        });
    }


    useEffect(() => {
        if (user.accountType === 'Vendor') {
            getVendorOrders();
        }
    }, []);


    if (loader) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <>
            <div className="bg-white rounded-lg w-full shadow">
                <h2 className="text-lg font-bold p-6">Orders</h2>
                <div className='w-full h-[1px] border' />
                {orders.length > 0 ?
                    <div className="py-5 px-4 w-full">
                        {/* Tabs */}
                        <div className="flex border-b-2 border-gray-200">
                            <div className='flex flex-grow'>
                                <button
                                    onClick={() => setActiveTab('ongoing')}
                                    className={`px-4 py-2 flex text-sm font-semibold ${activeTab === 'ongoing' ? 'text-kuduOrange border-kuduOrange border-b-2' : 'text-gray-500'
                                        }`}
                                >
                                    ONGOING / DELIVERED ({orders.filter(order => order.status === 'ongoing').length})
                                </button>
                            </div>
                            <div className='flex'>
                                <button
                                    onClick={() => setActiveTab('cancelled')}
                                    className={`px-4 py-2 text-sm font-semibold ${activeTab === 'cancelled' ? 'text-kuduOrange border-kuduOrange border-b-2' : 'text-gray-500'
                                        }`}
                                >
                                    CANCELLED / RETURNED (0)
                                </button>
                            </div>
                        </div>

                        {/* Orders List */}
                        <div className="mt-4">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map(order => (
                                    <div key={order.id} className="flex items-center justify-between p-4 border-b border-gray-200">
                                        <div className="flex items-center space-x-4">
                                            <Imgix src={order.image} alt={order.name} width={50} height={50} sizes='30vw' className="w-16 h-16 rounded-md object-cover" />
                                            <div className='flex flex-col gap-1'>
                                                <h2 className="font-semibold text-[rgba(120,120,120,1)]">{order.name}</h2>
                                                <div className='flex gap-1'>
                                                    <div className='w-2 h-2 mt-[4px] rounded-full bg-[rgba(3,168,78,1)]' />
                                                    <p className="text-xs text-[rgba(3,168,78,1)] font-[500]">Order {order.id}</p>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <p className="text-lg font-bold text-gray-800">${order.price}</p>
                                                    <span className="px-1 flex flex-col items-center py-[6px] text-xs font-medium text-white bg-kuduOrange rounded-lg">
                                                        ONGOING
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <Link to={'/profile/view-orders'} className="text-kuduOrange font-semibold text-sm hover:underline">SEE DETAILS</Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 text-sm mt-8">No orders found in this category.</p>
                            )}
                        </div>
                    </div>
                    :

                    <div className="empty-store">
                        <div className="text-center">
                            <img
                                src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                                alt="Empty Store Illustration"
                                className="w-80 h-80 mx-auto"
                            />
                        </div>
                        <h1 className="text-center text-lg font-bold mb-4">No order items found!</h1>
                    </div>

                }
            </div>
        </>
    )
}