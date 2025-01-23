import React, { useState } from "react";

const PostNewAdvert = ({ data }) => {
    const [activeStep, setActiveStep] = useState(1);

    const renderStepContent = () => {
        switch (activeStep) {
            case 1:
                return (
                    <div className="">
                        <h2 className="text-lg mb-5">ADVERT INFO</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-medium mb-4">Advert Title</label>
                                <input
                                    type="text"
                                    className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                    placeholder="Enter the title of the advert"
                                    style={{ outline: "none" }}
                                    value={data?.advertTitle || ''}
                                    onChange={(e) => console.log(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-4">Advert Category</label>
                                <select
                                    className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                    value={data?.category || ''}
                                    onChange={(e) => console.log(e.target.value)}
                                    style={{ outline: "none" }}
                                >
                                    <option value="">Choose the advert category</option>
                                    <option value="Cars">Cars</option>
                                    <option value="Real Estate">Real Estate</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Furniture">Furniture</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                            <div>
                                <label className="block text-sm font-medium mb-4">Region</label>
                                <input
                                    type="text"
                                    className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                    placeholder="Enter advert region"
                                    value={data?.region || ''}
                                    onChange={(e) => console.log(e.target.value)}
                                    style={{ outline: "none" }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-4">Advert Description</label>
                                <textarea
                                    rows="5"
                                    className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                    placeholder="Enter the advert description"
                                    value={data?.description || ''}
                                    style={{ outline: "none" }}
                                    onChange={(e) => console.log(e.target.value)}
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-4">CHOOSE A PROMOTION TYPE FOR YOUR ADVERT TO POST IT</label>
                                <input
                                    type="text"
                                    className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                    placeholder="No Promo"
                                    value={data?.promo || ''}
                                    onChange={(e) => console.log(e.target.value)}
                                    style={{ outline: "none" }}
                                />
                            </div>
                        </div>

                    </div>
                );
            case 2:
                return (
                    <div>
                        <h2 className="text-lg mb-5">PRODUCT DETAILS</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-5">Product Name</label>
                                <input
                                    type="text"
                                    className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                    placeholder="Enter the title of the advert"
                                    value={data?.productName || ''}
                                    onChange={(e) => console.log(e.target.value)}
                                    style={{ outline: "none" }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-5">Product Description</label>

                                <input
                                    type="number"
                                    className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                    placeholder="Enter features and details "
                                    value={data?.productDescription || ''}
                                    onChange={(e) => console.log(e.target.value)}
                                    style={{ outline: "none" }}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-5">Product Category </label>
                                <select
                                    className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                    value={data?.productCategory || ''}
                                    onChange={(e) => console.log(e.target.value)}
                                    style={{ outline: "none" }}
                                >
                                    <option value="">Choose the product category</option>
                                    <option value="Cars">Cars</option>
                                    <option value="Real Estate">Real Estate</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Furniture">Furniture</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-5">Product Condition</label>
                                <select
                                    className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                    value={data?.productCondition || ''}
                                    onChange={(e) => console.log(e.target.value)}
                                    style={{ outline: "none" }}
                                >
                                    <option value="">Choose the product condition</option>
                                    <option value="Brand New">Brand New</option>
                                    <option value="Used">Used</option>

                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-5">Product Location</label>
                                <input
                                    type="number"
                                    className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                    placeholder="Enter the location of the product  "
                                    value={data?.productLocation || ''}
                                    onChange={(e) => console.log(e.target.value)}
                                    style={{ outline: "none" }}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-5">Product Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                onChange={(e) => console.log(e.target.files[0])}
                                style={{ outline: "none" }}
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div>
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Pricing & Bidding</h2>
                        <div>
                            <label className="block text-sm font-medium mb-4">Bidding Options</label>
                            <select
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                value={data?.biddingOption || ''}
                                onChange={(e) => console.log(e.target.value)}
                            >
                                <option value="">Choose bidding option</option>
                                <option value="fixed">Fixed Price</option>
                                <option value="negotiable">Negotiable</option>
                                <option value="auction">Auction</option>
                            </select>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen">
            <div className="bg-white w-full max-w-4xl rounded-lg shadow-none p-8">
                <h1 className="text-lg font-semibold text-black-700 mb-4">Post New Advert</h1>
                {/* Render the steps */}
                <div className="flex justify-between items-center mb-8">
                    {["Advert Details", "Product Details", "Pricing & Bidding"].map((step, index) => (
                        <div
                            key={index}
                            className={`flex items-center cursor-pointer ${activeStep === index + 1 ? "text-gray-800" : "text-gray-400"
                                }`}
                            onClick={() => setActiveStep(index + 1)}
                        >
                            <div
                                className={`w-10 h-10 flex items-center justify-center rounded-full ${activeStep === index + 1 ? "bg-black text-white" : "border border-gray-300"
                                    }`}
                            >
                                <span className="font-bold">{index + 1}</span>
                            </div>
                            <span className="ml-2 font-medium">{step}</span>
                        </div>
                    ))}
                </div>
                {/* Step Content */}
                <div>{renderStepContent()}</div>
                {/* Actions */}
                <div className="flex justify-between items-center mt-8">
                    <button
                        className="text-black hover:text-gray-700"
                        onClick={() => setActiveStep((prev) => Math.max(prev - 1, 1))}
                    >
                        Cancel
                    </button>
                    {activeStep === 1 ? (
                        <button
                            className="bg-[#FF6F22] text-white font-medium px-6 py-3 rounded-md"
                            onClick={() => setActiveStep((prev) => Math.min(prev + 1, 3))}
                        >
                            Proceed to Product Details
                        </button>
                    ) : activeStep === 2 ? (
                        <button
                            className="bg-[#FF6F22] text-white font-medium px-6 py-3 rounded-md"
                            onClick={() => setActiveStep((prev) => Math.min(prev + 1, 3))}
                        >
                            Proceed to Pricing
                        </button>
                    ) : (
                        <button className="bg-green-500 text-white font-medium px-6 py-2 rounded-md">
                            Submit
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

export default PostNewAdvert;
