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
import Imgix from "react-imgix";

export default function LandingHomepage() {
    const colorMap = [
        "bg-kuduStrayBlue",
        "bg-kuduPink",
        "bg-kuduOrangeLight",
        "bg-kuduLightGreen",
        "bg-kuduPurple",
        "bg-kuduStrayBlue",
        "bg-kuduPink",
        "bg-kuduOrangeLight",
        "bg-kuduLightGreen",
        "bg-kuduPurple",
        "bg-kuduStrayBlue",
    ];

    const [categoriesArr, setCategoriesArr] = useState([]);
    const { mutate } = useApiMutation();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [ads, setAds] = useState([]);
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

            const categoriesRequest = new Promise((resolve, reject) => {
                mutate({
                    url: `/categories`,
                    method: "GET",
                    headers: true,
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data?.data || []),
                    onError: reject,
                });
            });


            const [productsData] = await Promise.all([productRequest]);
            const [categoriesData] = await Promise.all([categoriesRequest]);

            if (!productsData || productsData.length === 0) {
                console.warn("No products found.");
                setProducts([]);
                setFilteredProducts([]);
                return;
            }

            setProducts(productsData);


            if (!categoriesData || categoriesData.length === 0) {
                console.warn("No categries found.");
                setCategoriesArr([]);
                return;
            }

            const formattedCategories = categoriesData.map((category, index) => ({
                id: category.id,
                name: category.name,
                color: colorMap[index] || "bg-gray-200", // Default color
                img: category.image,
                active: index === 0, // First item is active, others are false
            }));

            setCategoriesArr(formattedCategories)

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };



    const fetchAds = () => {
        mutate({
            url: '/adverts?showOnHomePage=true',
            method: 'GET',
            hideToast: true,
            onSuccess: (response) => {
                setAds(response.data.data);
            },
            onError: () => {
            }
        });
    }


    // Fetch data on component mount
    useEffect(() => {
        fetchData();
        fetchAds();
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
                    {loading ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <CategoriesSection data={categoriesArr} />
                    )
                    }
                </div>
                <div className="w-full flex mt-3">
                    {loading ? (
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                    ) : (
                        <ProductsSection data={products.slice(0, 10)} ads={ads.slice(0, 2)} />
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
                    {/* <PhonesBanner /> */}
                    <div className="flex w-full flex-col md:flex-row gap-4">
                        {ads.slice(0, 4).map((ad, index) => (
                            <div className="md:w-1/1 flex md:flex-row flex-col relative w-full pt-64 px-4 lg:rounded-lg md:rounded-lg" key={index}>
                                <div className="absolute inset-0 w-full h-full">
                                    <Imgix src={`${ad.media_url}`} sizes="100vw"
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
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
