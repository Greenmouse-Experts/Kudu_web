import ProductListing from "../../components/ProductsList";
import CartBlock from "./layouts/cartsBlock";
import CartSummary from "./layouts/cartSummary";

export default function Cart() {
    const productsArr = [
        {
            photo: "https://res.cloudinary.com/do2kojulq/image/upload/v1735426624/kudu_mart/clothProduct_foyfxb.png",
            title: "85 inch Oled Television",
            price: "₦ 63,500",
            status: "Used",
        },
        {
            photo: "https://res.cloudinary.com/do2kojulq/image/upload/v1735426614/kudu_mart/television_u0t8wb.png",
            title: "85 inch Oled Television",
            price: "₦ 63,500",
            status: "Brand New"
        },
        {
            photo: "https://res.cloudinary.com/do2kojulq/image/upload/v1735426608/kudu_mart/sneakers_kfsmix.png",
            title: "85 inch Oled Television",
            price: "₦ 63,500",
            status: "Brand New"
        },
        {
            photo: "https://res.cloudinary.com/do2kojulq/image/upload/v1735426614/kudu_mart/toyota_uoonig.png",
            title: "85 inch Oled Television",
            price: "₦ 63,500",
            status: "Brand New"
        },
        {
            photo: "https://res.cloudinary.com/do2kojulq/image/upload/v1735426624/kudu_mart/clothProduct_foyfxb.png",
            title: "85 inch Oled Television",
            price: "₦ 63,500",
            status: "Used",
        },
    ];

    return (
        <>
            <div className="w-full flex flex-col h-full bg-kuduLightBlue">
                <div className="w-full flex flex-col xl:px-80 lg:pl-44 lg:pr-36 md:px-4 px-3 md:py-0 lg:gap-10 md:gap-8 gap-5 bg-kuduLightBlue h-full">
                    <div className="w-full flex md:flex-row flex-col gap-10 items-start md:mt-24 mt-20">
                        <div className="md:w-[68%] w-full flex"><CartBlock /></div>
                        <div className="md:w-[32%] w-full flex"><CartSummary /></div>
                    </div>
                    <div className="w-full flex flex-col gap-6 items-start my-10">
                        <p className="md:text-xl text-base font-semibold">Your Recently Viewed Products</p>
                       {/* <ProductListing productsArr={productsArr} />*/}
                    </div>
                </div>
            </div>
        </>
    )
}