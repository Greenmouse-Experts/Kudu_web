import ProductListing from "../../components/ProductsList";
import CategoriesSection from "./components/CategoriesSection";
import PhonesBanner from "./components/PhonesBanner";
import ProductConditions from "./components/ProductConditions";
import ProductsSection from "./components/ProductsSection";
import SearchSection from "./components/SearchSection";
import ShoppingExperience from "./components/ShoppingExperience";
import GetApp from "./components/GetApp";
import PreviewSection from "./components/PreviewSection";
import '../Home/components/style.css';
import useApiMutation from "../../api/hooks/useApiMutation";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../../components/Loader";

export default function LandingHomepage() {

    const { mutate } = useApiMutation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch both products and categories and merge them
    const fetchData = async () => {
        try {
            const productRequest = new Promise((resolve, reject) => {
                mutate({
                    url: '/products',
                    method: 'GET',
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data.data),
                    onError: reject,
                });
            });

            const [productsData] = await Promise.all([
                productRequest,
            ]);

            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Only run once on mount

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
            <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                <div className="w-full lg:flex md:flex gap-3 md:mt-3">
                    <PreviewSection />
                </div>
                <div className="w-full flex mt-3">
                    <CategoriesSection />
                </div>
                <div className="w-full flex mt-3">
                    {loading ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                    )
                        : (
                            <ProductsSection data={products} />
                        )}
                </div>
            </div>
            <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-black h-full">
                <div className="w-full flex flex-col gap-5 mt-3 Justig">
                    <ProductConditions />
                    {loading ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                    )
                        : (
                            <ProductListing productsArr={products} />
                        )}
                    <PhonesBanner />
                    {loading ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                    )
                        : (
                            <ProductListing productsArr={products} />
                        )
                    }
                </div>
            </div>
            <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                <div className="w-full flex mt-3 Justing">
                    <ShoppingExperience />
                </div>
            </div>
            <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 Amenn" style={{
                backgroundImage: `
                    url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1737405367/Frame_1618873123_fy7sgx.png)
                    `,
                backgroundBlendMode: "overlay",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                className: "sm-[70vh]",
            }}>
                <div className="w-full flex flex-col gap-5 ">
                    <GetApp />
                </div>
            </div>

        </div >
    )
};