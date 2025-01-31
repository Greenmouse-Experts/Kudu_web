import { useState } from "react";
import Imgix from "react-imgix";
import './style.css';

export default function ProductConditions({condition}) {
    const conditionsArr = [
     /*   {
            name: 'All Products',
            id: 'allProducts',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735508905/kudu_mart/shopping-bag-bg_ed7ioe.png'
        }, */
        {
            name: 'Brand New Products',
            id: 'brand_new',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735509253/kudu_mart/new-bg_fvayyd.png'
        },
        {
            name: 'Refurbished Products',
            id: 'refurbished',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735509253/kudu_mart/refurbished-bg_ll51hn.png'
        },
        {
            name: 'Used Products',
            id: 'fairly_used',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735509252/kudu_mart/delivery-box_v5fdbq.png'
        },
    ]

    const [activeCondition, setActiveCondition] = useState('brand_new');

    const handleActiveCondition = (id) => {
        setActiveCondition(id);
        condition(id);
    }

    return (
        <>
            <div className="flex w-full flex-col lg:gap-5 md:gap-5 gap-2 Justi">
                <div className="flex w-full">
                    <p className="text-white sm:text-lg md:text-2xl xl:text-3xl font-bold">
                        Explore by Product Condition
                    </p>
                </div>
                <div className="grid w-full lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
                    {conditionsArr.map((condition, index) => (
                        <div onClick={() => handleActiveCondition(condition.id)}
                            className={`flex flex-col gap-4 py-4 justify-center items-center cursor-pointer rounded-lg shadow-sm
                            ${activeCondition === condition.id ? 'bg-kuduOrange text-white' : 'bg-white text-black'}`}
                            key={index}
                        >
                            <Imgix
                                className="max-w-[30px] kuduImage max-h-[30px] md:max-w-[40px] md:max-h-[40px] object-contain"
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