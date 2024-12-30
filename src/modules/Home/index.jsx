import ProductListing from "../../components/ProductsList";
import CategoriesSection from "./components/CategoriesSection";
import DealsSection from "./components/DealsSection";
import PhonesBanner from "./components/PhonesBanner";
import PostSection from "./components/PostSection";
import ProductConditions from "./components/ProductConditions";
import ProductsSection from "./components/ProductsSection";
import SearchSection from "./components/SearchSection";
import ShoppingExperience from "./components/ShoppingExperience";
import GetApp from "./components/GetApp";

export default function LandingHomepage() {
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
        <div className="w-full flex flex-col">
            <SearchSection />
            <div className="w-full flex flex-col xl:px-80 lg:pl-44 lg:pr-36 md:px-4 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                <div className="w-full lg:flex md:flex hidden gap-3 mt-3">
                    <DealsSection />
                    <PostSection />
                </div>
                <div className="w-full flex mt-3">
                    <CategoriesSection />
                </div>
                <div className="w-full flex mt-3">
                    <ProductsSection />
                </div>
            </div>
            <div className="w-full flex flex-col xl:px-80 lg:pl-44 lg:pr-36 md:px-4 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-black h-full">
                <div className="w-full flex flex-col gap-5 mt-3">
                    <ProductConditions />
                    <ProductListing productsArr={productsArr} />
                    <PhonesBanner />
                    <ProductListing productsArr={productsArr} />
                </div>
            </div>
            <div className="w-full flex flex-col xl:px-80 lg:pl-44 lg:pr-36 md:px-4 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                <div className="w-full flex mt-3">
                    <ShoppingExperience />
                </div>
            </div>
            <GetApp />
        </div >
    )
};