import { useState, useEffect } from "react";
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
import Loader from "../../components/Loader";

export default function LandingHomepage() {
    const { mutate } = useApiMutation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch products from API
    const fetchData = async () => {
        try {
            const productRequest = new Promise((resolve, reject) => {
                mutate({
                    url: '/products',
                    method: 'GET',
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data?.data || []),
                    onError: reject,
                });
            });

            const [productsData] = await Promise.all([productRequest]);

            if (!productsData || productsData.length === 0) {
                console.warn("No products found.");
                setProducts([]);
                setFilteredProducts([]);
                return;
            }

            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Filter brand-new products once products are updated
    useEffect(() => {
        if (products.length > 0) {
            setFilteredProducts(products.filter(product => product.condition === 'brand_new'));
        }
    }, [products]);

    // Function to filter products by condition
    const filterProducts = (condition) => {
        setFilteredProducts(products.filter((product) => product.condition === condition));
    };

    return (
        <div className="w-full flex flex-col">
            <SearchSection />

            {/* Main Product Section */}
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
                    ) : (
                        <ProductsSection data={products.slice(0, 10)} />
                    )}
                </div>
            </div>

            {/* Filtered Products Section */}
            <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-black h-full">
                <div className="w-full flex flex-col gap-5 mt-3">
                    <ProductConditions condition={filterProducts} />
                    {loading ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <ProductListing productsArr={filteredProducts} />
                    )}
                    <PhonesBanner />
                    {loading ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <ProductListing productsArr={filteredProducts.slice(5, 10)} />
                    )}
                </div>
            </div>

            {/* Shopping Experience Section */}
            <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                <div className="w-full flex mt-3">
                    <ShoppingExperience />
                </div>
            </div>

            {/* GetApp Section with Background Image */}
            <div
                className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5"
                style={{
                    backgroundImage: `url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1737405367/Frame_1618873123_fy7sgx.png)`,
                    backgroundBlendMode: "overlay",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                }}
            >
                <div className="w-full flex flex-col gap-5">
                    <GetApp />
                </div>
            </div>
        </div>
    );
}
