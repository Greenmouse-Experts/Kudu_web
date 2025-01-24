import React from 'react';

const AddNewStore = () => {
    return (
        <div className='All'>
            <div className="rounded-md pb-2 w-full gap-5">
                <h2 className="text-lg font-semibold text-black-700 mb-4">Add New Store</h2>
            </div>
            <div className="bg-white rounded-md p-6 w-full gap-5">
                <div>
                    <label
                        htmlFor="storeName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Store Name
                    </label>
                    <input
                        type="text"
                        className="border rounded-lg p-3 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter store name"
                        style={{ outline: "none" }}
                    />
                </div>
                <div>
                    <label
                        htmlFor="storeName"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Store Name
                    </label>
                    <input
                        type="text"
                        className="border rounded-lg p-3 w-full bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter store name"
                        style={{ outline: "none" }}
                    />
                </div>
            </div>
        </div>

    );
};

export default AddNewStore;
