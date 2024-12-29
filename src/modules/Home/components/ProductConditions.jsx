import { useState } from "react";
import Imgix from "react-imgix";

export default function ProductConditions() {
    const conditionsArr = [
        {
            name: 'All Products',
            id: 'allProducts',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735508905/kudu_mart/shopping-bag-bg_ed7ioe.png'
        },
        {
            name: 'Brand New Products',
            id: 'brandProducts',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735509253/kudu_mart/new-bg_fvayyd.png'
        },
        {
            name: 'Refurbished Products',
            id: 'refurbishedProducts',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735509253/kudu_mart/refurbished-bg_ll51hn.png'
        },
        {
            name: 'Used Products',
            id: 'usedProducts',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735509252/kudu_mart/delivery-box_v5fdbq.png'
        },
    ]

    const [activeCondition, setActiveCondition] = useState('allProducts');

    return (
        <>
            <div className="flex w-full flex-col lg:gap-5 md:gap-5 gap-2">
                <div className="flex w-full">
                    <p className="lg:text-lg md:text-lg text-xs lg:text-left md:text-left text-center text-black font-semibold flex flex-grow">
                        SORT BY PRODUCT CONDITION
                    </p>
                    <p className="md:text-sm text-xs cursor-pointer font-semibold underline text-kuduOrange flex">
                        View all Categories
                    </p>
                </div>
                <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
                    {conditionsArr.map((condition, index) => (
                        <div onClick={() => setActiveCondition(condition.id)}
                            className={`flex flex-col gap-4 py-4 justify-center items-center cursor-pointer rounded-lg shadow-sm
                            ${activeCondition === condition.id ? 'bg-kuduOrange text-white' : 'bg-white text-black'}`}
                            key={index}
                        >
                            <Imgix
                                className="max-w-[30px] max-h-[30px] md:max-w-[30px] md:max-h-[30px] object-contain"
                                src={condition.img} />
                            <p className="lg:text-sm md:text-sm text-[12px] font-[500]">
                                {condition.name}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}