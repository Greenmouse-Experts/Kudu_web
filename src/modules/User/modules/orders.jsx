import { useState } from 'react';
import Imgix from 'react-imgix';

export default function ProfileOrders() {

    const [activeTab, setActiveTab] = useState('ongoing');

    const orders = [
        { id: '1586388872', name: 'Classy Unisex Crocs Footwear', price: 680, status: 'ongoing', image: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735426593/kudu_mart/order_image_awi5dp.jpg' },
        { id: '1586388873', name: 'Classy Unisex Crocs Footwear', price: 680, status: 'ongoing', image: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735426594/kudu_mart/order_image2_a8advd.jpg' },
        { id: '1586388872', name: 'Classy Unisex Crocs Footwear', price: 680, status: 'ongoing', image: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735426593/kudu_mart/order_image_awi5dp.jpg' },
        { id: '1586388873', name: 'Classy Unisex Crocs Footwear', price: 680, status: 'ongoing', image: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735426594/kudu_mart/order_image2_a8advd.jpg' },
        { id: '1586388872', name: 'Classy Unisex Crocs Footwear', price: 680, status: 'ongoing', image: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735426593/kudu_mart/order_image_awi5dp.jpg' },
    ];

    const filteredOrders = orders.filter(order => order.status === activeTab);

    return (
        <>
            <div className="bg-white rounded-lg w-full shadow">
                <h2 className="text-lg font-bold p-6">Orders</h2>
                <div className='w-full h-[1px] border' />
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
                                        <button className="text-kuduOrange font-semibold text-sm hover:underline">SEE DETAILS</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 text-sm mt-8">No orders found in this category.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}