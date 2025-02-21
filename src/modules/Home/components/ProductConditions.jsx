import './style.css';
import { useState } from "react";
import { ShoppingBag, Package, RefreshCcw } from "lucide-react";

export default function ProductConditions({ condition }) {
    const conditionsArr = [
        {
            name: "Brand New Products",
            id: "brand_new",
            icon: ShoppingBag,
            color: "#FF5733", // Example color for the icon
        },
        {
            name: "Refurbished Products",
            id: "refurbished",
            icon: RefreshCcw,
            color: "#FF5733",
        },
        {
            name: "Used Products",
            id: "fairly_used",
            icon: Package,
            color: "#FF5733",
        },
    ];

    const [activeCondition, setActiveCondition] = useState("brand_new");

    const handleActiveCondition = (id) => {
        setActiveCondition(id);
        condition(id);
    };

    return (
        <div className="flex w-full flex-col lg:gap-5 md:gap-5 gap-2 mb-10">
            <div className="grid w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
                {conditionsArr.length > 0 ? conditionsArr.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = activeCondition === item.id;

                    return (
                        <div
                            key={index}
                            onClick={() => handleActiveCondition(item.id)}
                            className={`group flex flex-col gap-4 py-5 justify-center items-center cursor-pointer rounded-lg shadow-sm transition-all 
                                ${isActive ? "bg-kuduOrange text-white" : "bg-white text-black hover:bg-kuduOrange hover:text-white"}
                            `}
                        >
                            <IconComponent
                                size={40}
                                className="transition-all"
                                style={{ color: isActive ? "white" : item.color }}
                            />
                            <p className="lg:text-sm md:text-sm text-[12px] font-[500]">
                                {item.name}
                            </p>
                        </div>
                    );
                })
                    :
                    <div className='w-full flex justify-center'>
                        <span className='text-2xl font-semibold'>NO DATA IS AVAILABLE</span>
                    </div>
                }
            </div>
        </div>
    );
}
