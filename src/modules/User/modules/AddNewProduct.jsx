import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DropZone from '../../../components/DropZone';
import { MdClose } from "react-icons/md";

const AddNewProduct = ({ closeAddNewModal, stores, categories }) => {
    const [currency, setCurrency] = useState(null);
    const [files, setFiles] = useState([]);
    

    const conditions = [
        { id: 'brand_new', name: 'Brand New' },
        { id: 'fairly_used', name: 'Fairly Used' },
        { id: 'refurbished', name: 'Refurbished' },
    ]

    const navigate = useNavigate();

    const handleDrop = () => {

    }
        console.log(categories)
    return (
        <div className='All'>
            <div className="rounded-md pb-2 px-9 gap-5 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-black-700 mt-4 mb-4">Add New Product</h2>
                <MdClose className='text-[orangered] text-[30px] font-bold cursor-pointer'
                    onClick={closeAddNewModal}
                />
            </div>
            <div className="w-full flex flex-grow mt-3 ">
                <div className="shadow-xl w-full flex rounded-xl flex-col gap-10">

                    <form
                        className="w-full flex flex-col items-center justify-center p-4"
                    >
                        <div className="w-full p-6">
                            <div className="mb-3">
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Store
                                </label>
                                <select
                                    id='storeId'
                                    className="w-full p-1 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    required
                                >
                                    <option value={null} disabled selected>Select Store</option>
                                    {stores.data.map((store) => (
                                        <option key={store.id} value={store.id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Category
                                </label>
                                <select
                                    id='categoryId'
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    required
                                >
                                    <option value={null} disabled selected>Select Category</option>
                                    {categories.data.map((category) => (
                                        <option 
                                            value={category.id} 
                                            key={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Sub Category
                                </label>
                                <select
                                    id='categoryId'
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    required
                                >
                                    <option value={null} disabled selected>Sub Category</option>
                                    {/* {categories.data.map((category) => (
                                        <option 
                                            value={category.id} 
                                            key={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))} */}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter name of product"
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Condition
                                </label>
                                <select
                                    id='condition'
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    required
                                >
                                    <option value={null} disabled selected>Select Condition</option>
                                    {conditions.map((condition) => (
                                        <option value={condition.id} key={condition.id}>{condition.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Description
                                </label>
                                <textarea
                                    type="text"
                                    id="description"
                                    placeholder="Describe your product"
                                    className="w-full p-1 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Specifications
                                </label>
                                <textarea
                                    type="text"
                                    id="specification"
                                    placeholder="Enter specification for your product"
                                    className="w-full p-1 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Price
                                </label>
                                <div className='flex'>
                                    <span className='flex flex-col justify-center'>{currency}</span>
                                    <input
                                        type="text"
                                        id="price"
                                        placeholder="Enter Price"
                                        className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                        style={{ outline: "none" }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Discount Price
                                </label>
                                <div className='flex'>
                                    <span className='flex flex-col justify-center'>{currency}</span>
                                    <input
                                        type="text"
                                        id="discount_price"
                                        placeholder="Enter Discount Price"
                                        className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                        style={{ outline: "none" }}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Warranty
                                </label>
                                <input
                                    type="text"
                                    id="warranty"
                                    placeholder="Enter Product Warranty"
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="email"
                                >
                                    Return policy
                                </label>
                                <input
                                    type="text"
                                    id="return_policy"
                                    placeholder="Return Policy"
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    required
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <div className="flex flex-col md:w-1/2 w-full gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Product Images
                                    </p>
                                    <DropZone onUpload={handleDrop} text={'Upload Images of Product'} />
                                </div>
                                <div className="grid grid-cols-3 gap-4 my-4">
                                    {files.map((fileObj, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={fileObj}
                                                alt="preview"
                                                className="w-full h-24 object-cover rounded"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-kuduOrange text-white py-2 px-4 rounded-md font-bold"
                            >
                                Add New Product
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewProduct;
