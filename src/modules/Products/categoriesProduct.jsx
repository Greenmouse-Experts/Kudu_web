import { useEffect, useState } from "react";
import "../Home/components/style.css";
import useApiMutation from "../../api/hooks/useApiMutation";
import { useParams } from "react-router-dom";
import ShoppingExperience from "../Home/components/ShoppingExperience";
import ProductListing from "../Home/components/ProductListing";
import Loader from "../../components/Loader";

const CategoriesProduct = () => {
    const [products, setProducts] = useState([]);
    const [categoriesArr, setCategoriesArr] = useState([]);
    const [loading, setLoading] = useState(true);

    const { id, name } = useParams();

    const { mutate } = useApiMutation();

    // Fetch products from API
    const fetchData = async () => {
        try {
            const productRequest = new Promise((resolve, reject) => {
                mutate({
                    url: `/products?categoryId=${id}`,
                    method: 'GET',
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data?.data || []),
                    onError: reject,
                });
            });

            const categoriesRequest = new Promise((resolve, reject) => {
                mutate({
                    url: `/category/sub-categories?categoryId=${id}`,
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
                return;
            }

            setProducts(productsData);

            if (!categoriesData || categoriesData.length === 0) {
                console.warn("No categries found.");
                setCategoriesArr([]);
                return;
            }

            setCategoriesArr(categoriesData)

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
                            <h1 className="text-4xl font-bold">{name}</h1>
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full flex flex-col bg-white items-center">
                {/* Hero Section */}
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-20 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                    {loading ?
                        <div className="w-full h-screen flex items-center justify-center">
                            <Loader />
                        </div>
                        :
                        <div className="w-full flex mt-20">
                            <ProductListing data={products} categories={categoriesArr} hideCategory={true} />
                        </div>
                    }
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

export default CategoriesProduct;
