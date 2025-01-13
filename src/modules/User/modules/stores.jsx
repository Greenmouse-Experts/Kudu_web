import React, { useState } from 'react';

function Stores() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="bg-white rounded-lg w-full p-6">
            <h2 className="text-lg font-bold mb-2">My Store</h2>
            <div className="w-full h-[5px] mb-4 border" />

            <div className="text-center">
                <img
                    src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                    alt="Empty Store Illustration"
                    className="w-80 h-80 mx-auto"
                />
            </div>
            <h1 className="text-center text-lg font-bold mb-4">Empty Store!</h1>
            <div className="text-center text-black-100 mb-6 leading-loose text-sm">
                Want to reach more customers? <br></br>Kudu lets you create and manage your own store.
            </div>
            <button
                className="bg-kuduOrange hover:bg-kuduDarkGrey text-white py-2 px-4 text-sm rounded block mx-auto"
                onClick={handleOpenModal}
            >
                Add New
            </button>

            {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg w-1/2  max-w-screen-md">
                        <h2 className="text-lg font-bold mb-4">Create your Store</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="storeName" className="block text-sm font-medium mb-4">
                                    Store Name
                                </label>
                                <input
                                    type="text"
                                    id="storeName"
                                    className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                                    placeholder="Enter your store name"
                                    style={{ outline: "none", }}
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm font-medium mb-4">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                                    placeholder="Enter your address"
                                    style={{ outline: "none", }}
                                />
                            </div>
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium mb-4">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                                    placeholder="Enter your city"
                                    style={{ outline: "none", }}
                                />
                            </div>

                            <div>
                                <label htmlFor="country" className="block text-sm font-medium mb-4">
                                    Country
                                </label>
                                <select
                                    id="country"
                                    className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                                    style={{ outline: "none", }}
                                >
                                    <option value="">Tap to Select</option>
                                    {/* Add country options here */}
                                </select>
                            </div>

                            <div>
                                <label htmlFor="state" className="block text-sm font-medium mb-4">
                                    State
                                </label>
                                <select
                                    id="state"
                                    style={{ outline: "none", }}
                                    className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                                >
                                    <option value="">Tap to Select</option>
                                    {/* Add state options here */}
                                </select>
                            </div>

                            <div>
                            <label htmlFor="businessHours" className="block text-sm font-medium mb-4">
                                Business Hours
                            </label>
                                <input
                                    type="text"
                                    id="businessHours"
                                    className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                                    placeholder="e.g., 9am - 6pm"
                                    style={{ outline: "none", }}
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="currency" className="block text-sm font-medium mb-4">
                                    Store Currency
                                </label>
                                <select
                                    id="currency"
                                    className="border rounded p-2 w-full placeholder-gray-400 text-sm placeholder-gray-400 text-sm"
                                    style={{ outline: "none", }}
                                >
                                    <option value="">Tap to select currency</option>
                                    
                                </select>
                            </div>

                            <div>
                            <label htmlFor="deliveryOptions" className="block text-sm font-medium mb-4">
                                Delivery Options
                            </label>
                            <button className="bg-kuduOrange hover:bg-blue-700 text-white text-sm  py-2 px-4 rounded">
                                + Add Delivery Option
                            </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-5">
                                <label htmlFor="tips" className="block text-sm font-medium">
                                    Tips on Finding Store
                                </label>
                                <textarea
                                    id="tips"
                                    rows="4"
                                    className="border p-2 text-sm placeholder-gray-400 text-sm"
                                    placeholder="Enter tips to help customers find your store"
                                    style={{ outline: "none", }}
                                />
                            </div>

                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-kuduDarkGrey hover:bg-gray-400 text-white text-sm py-2 px-4 rounded mr-2"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button className="bg-kuduOrange hover:bg-kuduDarkGrey text-white text-sm py-2 px-4 rounded">
                                Create Store
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Stores;