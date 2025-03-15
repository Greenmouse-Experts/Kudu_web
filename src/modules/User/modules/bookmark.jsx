import { useEffect, useState } from "react"
import Loader from "../../../components/Loader";
import useApiMutation from "../../../api/hooks/useApiMutation";
import ProductListing from "../../../components/ProductsList";

export default function BookMarkedProducts() {
    const [bookmarkedProducts, setBookmarkedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { mutate } = useApiMutation();


    const getSavedProducts = async () => {
        try {
            const savedProducts = new Promise((resolve, reject) => {
                mutate({
                    url: `/user/saved/products`,
                    method: "GET",
                    headers: true,
                    hideToast: true,
                    onSuccess: (response) => resolve(response.data.data),
                    onError: reject,
                });
            });
            const [products] = await Promise.all([savedProducts]);
            const productObjects = Array.isArray(products) ? products.map(item => item.product) : [];
            setBookmarkedProducts(productObjects);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    };



    useEffect(() => {
        getSavedProducts();
    }, []);



    return (
        <>
            <div className="w-full p-6 bg-white shadow rounded-lg">
                <div className="flex w-full justify-between">
                    <h2 className="text-lg font-bold mb-4">Bookmarked Products</h2>
                </div>

                {isLoading ? (
                    <div className="w-full h-96 flex items-center justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="mt-4">
                        <ProductListing rowNo={4} productsArr={bookmarkedProducts} displayError />
                    </div>
                )}
            </div>

        </>
    )
}