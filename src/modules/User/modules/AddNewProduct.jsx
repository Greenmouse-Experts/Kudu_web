import React, { useEffect, useState } from 'react';
import { useCreateProductMutation } from "../../../reducers/storeSlice";
import { useForm } from 'react-hook-form';
import DropZone from '../../../components/DropZone';
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader";

const AddNewProduct = ({ closeAddNewModal, stores, categories }) => {
    const [currency, setCurrency] = useState(null);
    const [files, setFiles] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [createProduct] = useCreateProductMutation();
    
    const conditions = [
        { id: 'brand_new', name: 'brand_new' },
        { id: 'fairly_used', name: 'fairly_used' },
        { id: 'fairly_foreign', name: 'fairly_foreign'},
        { id: 'refurbished', name: 'refurbished' },
    ]

    const {
        register,
        handleSubmit,
        setValue,
        watch
    } = useForm();

    const selectedId = watch("categoryId");
    const selectedCategory = categories?.data?.find((cat) => cat.id === selectedId)?.name || "";

    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;
        setValue("categoryId", selectedId); 
    };
    
    useEffect(() => {
        if(selectedCategory){
            const filteredCategories = categories?.data?.filter((categoryData) => (
                categoryData.name === selectedCategory
            ))

            if (filteredCategories.length > 0 && filteredCategories[0]?.subCategories) {
                setSubCategories(filteredCategories[0].subCategories);
            } else {
                setSubCategories([]); 
            }
        }
    }, [selectedCategory])

    const handleDrop = (data) => {
        setFiles((prevFiles) => [...prevFiles, data]);
    }

    const handleRemoveImage = (idx) => {
        setFiles((prevFile) => prevFile.filter((_, index) => index !== idx));
    };

    const transformPayload = (data) => {
        return{
            storeId: data.storeId ,
            categoryId: data.subcategoryId,
            name: data.name,
            condition: data.condition, 
            description: data.description,
            specification: data.specification,
            price: data.price,
            image_url: data.image,
            discount_price: data.discount_price,
            additional_images: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
            warranty: data.warranty,
            return_policy: data.return_policy,
            seo_title: "",
            meta_description: "",
            keywords: ""
        }
    }

    const onSubmit = (data) => {
        setIsLoading(true)
        if (files.length > 0) {
            const payload = { ...data, image: files[0]};

            const reformedPayload = transformPayload(payload);

            createProduct(reformedPayload)
            .then((res) => {
                if(res.data.message !== "Product created successfully") throw res

                toast.success(res.data.message);
                setIsLoading(false)
                closeAddNewModal();
            }).catch((error) => {
                toast.error(error.error.data.message);
                setIsLoading(false)
                closeAddNewModal();
            })
        }
    };
    
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
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="w-full p-6">
                            <div className="mb-3">
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="store"
                                >
                                    Store
                                </label>
                                <select
                                    id='storeId'
                                    className="w-full p-1 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    {...register("storeId", { required: "Store is required" })}
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
                                    htmlFor="category"
                                >
                                    Category
                                </label>
                                <select
                                    id='categoryId'
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    {...register("categoryId", { required: "Category is required" })}
                                    onChange={handleCategoryChange}
                                    required
                                >
                                    <option value="" disabled selected>Select Category</option>
                                    {categories.data.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="sub-category"
                                >
                                    Sub Category
                                </label>
                                <select
                                    id='subcategoryId'
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    {...register("subcategoryId", { required: "subcategory is required" })}
                                    required
                                >
                                    <option value={null} disabled selected>Sub Category</option>
                                    {subCategories.map((subCategory) => (
                                        <option 
                                            key={subCategory.id}
                                            value={subCategory.id}
                                        >
                                            {subCategory.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="product-Name"
                                >
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter name of product"
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    {...register("name", { required: "name is required" })}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="condition"
                                >
                                    Condition
                                </label>
                                <select
                                    id='condition'
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    {...register("condition", { required: "condition is required" })}
                                    required
                                >
                                    <option value={null} disabled selected>Select Condition</option>
                                    {conditions.map((condition) => (
                                        <option value={condition.value} key={condition.id}>{condition.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <textarea
                                    type="text"
                                    id="description"
                                    placeholder="Describe your product"
                                    className="w-full p-1 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    {...register("description", { required: "description is required" })}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="specification"
                                >
                                    Specifications
                                </label>
                                <textarea
                                    type="text"
                                    id="specification"
                                    placeholder="Enter specification for your product"
                                    className="w-full p-1 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    {...register("specification", { required: "specification is required" })}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="price"
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
                                        {...register("price", { required: "price is required" })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="discount_price"
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
                                        {...register("discount_price", { required: "discount price is required" })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="warranty"
                                >
                                    Warranty
                                </label>
                                <input
                                    type="text"
                                    id="warranty"
                                    placeholder="Enter Product Warranty"
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    {...register("warranty", { required: "warranty price is required" })}
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="return_policy"
                                >
                                    Return policy
                                </label>
                                <input
                                    type="text"
                                    id="return_policy"
                                    placeholder="Return Policy"
                                    className="w-full p-2 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                                    style={{ outline: "none" }}
                                    {...register("return_policy", { required:"return policy price is required"})}
                                    required
                                />
                            </div>

                            <div className="w-full flex flex-col gap-2">
                                <div className="flex flex-col w-[16%] h-[25vh] gap-6">
                                    <p className="-mb-3 text-mobiFormGray">
                                        Product Images
                                    </p>
                                    <DropZone onUpload={handleDrop} text={'Upload Images of Product'} />
                                </div>
                                <div className="flex my-4 flex-wrap">
                                    {files.map((fileObj, index) => (
                                        <div key={index} className="relative w-[18%] mr-3 mt-4">
                                            <img
                                                src={fileObj}
                                                alt="preview"
                                                className="w-full h-24 object-cover rounded"
                                            />
                                            <button type="button" className='absolute top-1 right-1 text-[red] text-[20px]' onClick={() => handleRemoveImage(index)}><MdCancel /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-kuduOrange text-white py-2 px-4 rounded-md font-bold"
                            >
                                {isLoading ? <PulseLoader color="#ffffff"  size={10}/> : "Add New Product"} 
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewProduct;
