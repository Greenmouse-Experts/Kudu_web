import React from 'react';

const AddNewStore = () => {
    return (
        <div className='All'>
            <div className="rounded-md pb-2 w-full gap-5">
                <h2 className="text-lg font-semibold text-black-700 mb-4">Add New Store</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-2 bg-white rounded-lg p-6">
                    <div className="grid grid-cols-1 gap-6 mb-4">
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Store Name
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                placeholder="Enter store name"
                                style={{ outline: "none" }}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Store Address
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                placeholder="Enter your store address"
                                style={{ outline: "none" }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                State
                            </label>
                            <select
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                style={{ outline: "none" }}
                            >
                                <option value="">Choose the state </option>
                                <option value="Lagos">Lagos</option>
                                <option value="Ibadan">Ibadan</option>
                                <option value="Ogun">Ogun</option>
                            </select>
                            
                        </div>
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Country
                            </label>
                            <select
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                style={{ outline: "none" }}
                            >
                                <option value="">Choose the Country </option>
                                <option value="Lagos">Lagos</option>
                                <option value="Ibadan">Ibadan</option>
                                <option value="Ogun">Ogun</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mb-4">
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Tips for finding store 
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                placeholder="Enter tips to find your store "
                                style={{ outline: "none" }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Store Currency
                            </label>
                            <select
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                style={{ outline: "none" }}
                            >
                                <option value="">Select store currency </option>
                                <option value="Lagos">Lagos</option>
                                <option value="Ibadan">Ibadan</option>
                                <option value="Ogun">Ogun</option>
                            </select>
                            
                        </div>
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                placeholder="Enter your business hours"
                                style={{ outline: "none" }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mb-4">
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Delivery Option
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                placeholder="Add delivery options"
                                style={{ outline: "none" }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                            <button
                                className="bg-kuduDarkGrey hover:bg-gray-400 text-white text-sm py-2 px-4 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button className="bg-kuduOrange hover:bg-kuduDarkGrey text-white text-sm py-2 px-4 rounded">
                            Create New Store
                            </button>
                        </div>
                </div>
            </div>
        </div>

    );
};

export default AddNewStore;
