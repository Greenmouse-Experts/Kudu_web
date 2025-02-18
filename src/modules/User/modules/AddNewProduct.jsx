import React, { useEffect, useState } from 'react';
import { useCreateProductMutation } from "../../../reducers/storeSlice";
import { useForm } from 'react-hook-form';
import DropZone from '../../../components/DropZone';
import { toast } from "react-toastify";
import { MdCancel, MdClose } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader";
import { renderDraftContent } from '../../../helpers/renderDraftContent';
import { convertToRaw, EditorState } from 'draft-js';
import DraftEditor from '../../../components/Editor';
import { FaTimes } from 'react-icons/fa';

const AddNewProduct = ({ closeAddNewModal, stores, categories }) => {
    const [descriptionEditor, setDescriptionEditor] = useState(() =>
        EditorState.createEmpty()
    );
    const [specificationsEditor, setSpecificationsEditor] = useState(() =>
        EditorState.createEmpty()
    );

    const [currency, setCurrency] = useState(null);
    const [files, setFiles] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [createProduct] = useCreateProductMutation();

    const conditions = [
        { id: 'brand_new', name: 'Brand New' },
        { id: 'fairly_used', name: 'Fairly Used' },
        { id: 'refurbished', name: 'Refurbished' },
    ]

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            description: "",
            specifications: "",
        },
    });

    const selectedId = watch("categoryId");
    const selectedCategory = categories?.data?.find((cat) => cat.id === selectedId)?.name || "";

    const handleCategoryChange = (e) => {
        const selectedId = e.target.value;
        setValue("categoryId", selectedId);
    };

    useEffect(() => {
        if (selectedCategory) {
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
        // Ensure data is always an array
        const newFiles = Array.isArray(data) ? data : [data];

        setFiles((prevFiles) => {
            // Merge previous files and new ones, ensuring uniqueness
            const updatedFiles = Array.from(new Set([...prevFiles, ...newFiles]));
            return updatedFiles;
        });
    };

    const removeImage = (idx) => {
        setFiles((prevFile) => prevFile.filter((_, index) => index !== idx));
    };

    const transformPayload = (data) => {
        return {
            storeId: data.storeId,
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
            delete data.specifications;
            const payload = {
                ...data, description: renderDraftContent(JSON.stringify(convertToRaw(descriptionEditor.getCurrentContent()))),
                specification: renderDraftContent(JSON.stringify(convertToRaw(specificationsEditor.getCurrentContent()))),
                image_url: files[0],
                additional_images: files
            };

            console.log(payload)

            // const reformedPayload = transformPayload(payload);

            createProduct(payload)
                .then((res) => {
                    if (res.data.message !== "Product created successfully") throw res

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
                <h2 className="text-lg font-semibold text-black-700 mt-4">Add New Product</h2>
                <MdClose className='text-[orangered] text-[30px] font-bold cursor-pointer'
                    onClick={closeAddNewModal}
                />
            </div>
            <div className="w-full flex flex-grow">
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
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
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
                                    id='category'
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
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
                                    id='categoryId'
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
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
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
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
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    {...register("condition", { required: "condition is required" })}
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
                                    htmlFor="description"
                                >
                                    Description
                                </label>
                                <DraftEditor
                                    editorState={descriptionEditor}
                                    setEditorState={(newState) => {
                                        setDescriptionEditor(newState);
                                        setValue("description", JSON.stringify(convertToRaw(newState.getCurrentContent())), {
                                            shouldValidate: true, // Ensure validation runs when value changes
                                        });
                                    }}
                                />
                                {errors.description && <p className="text-red-500">Description is required</p>}
                            </div>

                            <div className='mb-3'>
                                <label
                                    className="block text-md font-semibold mb-1"
                                    htmlFor="specification"
                                >
                                    Specifications
                                </label>
                                <DraftEditor
                                    editorState={specificationsEditor}
                                    setEditorState={(newState) => {
                                        setSpecificationsEditor(newState);
                                        setValue("specifications", JSON.stringify(convertToRaw(newState.getCurrentContent())), {
                                            shouldValidate: true, // Ensure validation runs when value changes
                                        });
                                    }}
                                />
                                {errors.specifications && <p className="text-red-500">Specifications are required</p>}
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
                                        className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
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
                                        className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
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
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
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
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    {...register("return_policy", { required: "return policy price is required" })}
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
                                            <span
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 bg-white shadow-lg text-black rounded-full p-1"
                                            >
                                                <FaTimes className="w-4 h-4" />
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-kuduOrange text-white py-2 px-4 rounded-md font-bold"
                            >
                                {isLoading ? <PulseLoader color="#ffffff" size={10} /> : "Add New Product"}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewProduct;
