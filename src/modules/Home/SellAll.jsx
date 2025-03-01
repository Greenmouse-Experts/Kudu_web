import { useEffect, useState } from "react";
import "../Home/components/style.css";
import ProductListing from "./components/ProductListing";
import ShoppingExperience from "./components/ShoppingExperience";
import useApiMutation from "../../api/hooks/useApiMutation";
import Loader from "../../components/Loader";

const About = () => {
    const [products, setProducts] = useState([]);
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [loading, setLoading] = useState(true);

    const { mutate } = useApiMutation();

    // Fetch products from API
    const fetchData = async () => {
        setLoading(true); // Ensure loading starts before fetching

        try {
            const [productsData, categoriesData] = await Promise.all([
                new Promise((resolve, reject) => {
                    mutate({
                        url: '/products',
                        method: 'GET',
                        hideToast: true,
                        onSuccess: (response) => resolve(response.data?.data || []),
                        onError: reject,
                    });
                }),
                new Promise((resolve, reject) => {
                    mutate({
                        url: `/categories`,
                        method: "GET",
                        headers: true,
                        hideToast: true,
                        onSuccess: (response) => resolve(response.data?.data || []),
                        onError: reject,
                    });
                }),
            ]);

            setProducts(productsData.length ? productsData : []);
            setCategoriesArr(categoriesData.length ? categoriesData : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Ensure loading is stopped after everything is done
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className="w-full flex flex-col">
                <section className="breadcrumb" style={{
                    backgroundImage: `url(https://res.cloudinary.com/greenmouse-tech/image/upload/v1738015034/image_5_vbukr9.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <div className="flex flex-col py-12">
                        <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
                            <h1 className="text-4xl font-bold">Products</h1>
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full flex flex-col bg-white items-center">
                {/* Hero Section */}
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-20 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                    <div className="w-full flex mt-20">
                        {loading ? (
                            <div className="w-full flex my-20">
                                <Loader />
                            </div>
                        )
                            :
                            <ProductListing data={products} categories={categoriesArr} />
                        }
                    </div>
                </div>

                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                    <div className="w-full flex mt-3">
                        <ShoppingExperience />
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
