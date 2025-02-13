import { useState } from "react";

const products = [
    {
        id: 1,
        name: "Classy Unisex Crocs Footwear",
        image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739443715/kuduMart/1_7_sk0qol.png",
        status: "Active",
        publishedDate: "12-02-25",
    },
    {
        id: 2,
        name: "Classy Unisex Crocs Footwear",
        image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739443715/kuduMart/1_7_sk0qol.png",
        status: "Active",
        publishedDate: "12-02-25",
    },
    {
        id: 3,
        name: "Classy Unisex Crocs Footwear",
        image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739443715/kuduMart/1_7_sk0qol.png",
        status: "Active",
        publishedDate: "12-02-25",
    },
    {
        id: 4,
        name: "Classy Unisex Crocs Footwear",
        image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739443715/kuduMart/1_7_sk0qol.png",
        status: "Active",
        publishedDate: "12-02-25",
    },
    {
        id: 5,
        name: "Classy Unisex Crocs Footwear",
        image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739443715/kuduMart/1_7_sk0qol.png",
        status: "Active",
        publishedDate: "12-02-25",
    },
];

export default function ProductList() {
    const [activeTab, setActiveTab] = useState("published");

    return (
        <div className="w-full p-6 bg-white shadow rounded-lg">
            <h2 className="text-lg font-bold mb-4">Adverts</h2>
            <div className="flex border-b text-xs sm:text-sm">
                <button
                    className={`p-2 sm:p-3 font-semibold ${activeTab === "published"
                            ? "text-[#FE6A3A] border-b-2 border-[#FE6A3A]"
                            : "text-black"
                        }`}
                    onClick={() => setActiveTab("published")}
                >
                    PUBLISHED (5)
                </button>
                <button
                    className={`p-2 sm:p-3 font-semibold ml-2 sm:ml-4 ${activeTab === "pending"
                            ? "text-[#FE6A3A] border-b-2 border-[#FE6A3A]"
                            : "text-black"
                        }`}
                    onClick={() => setActiveTab("pending")}
                >
                    PENDING / UNPUBLISHED (12)
                </button>
            </div>


            <div className="mt-4">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col sm:flex-row items-center p-4 border rounded-lg shadow-sm mb-4"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-md object-cover mb-4 sm:mb-0"
                        />
                        <div className="sm:ml-4 flex-1 text-center sm:text-left">
                            <p className="font-semibold text-black leading-loose">{product.name}</p>
                            <p className="text-sm text-gray-500 leading-loose mb-4">
                                • Published on {product.publishedDate}
                            </p>
                            <span className="text-xs text-white bg-green-500 px-3 py-2 rounded-sm leading-loose">
                                {product.status}
                            </span>
                        </div>
                        <button className="text-orange-500 font-semibold mt-4 sm:mt-0">SEE DETAILS</button>
                    </div>
                ))}
            </div>

        </div>
    );
}
