import { Link } from "react-router-dom";
import ProductListing from "../../../components/ProductsList";
import Imgix from "react-imgix";
import { useGeoLocatorProduct } from "../../../hooks/geoLocatorProduct";

const TrendingProducts = ({ productsArr, ads }) => {

    const filteredProducts = useGeoLocatorProduct(productsArr);
    return (
        <div className="w-full">
            <div className="bg-[#192D4C] w-full flex justify-between p-6 rounded-md mb-10 cursor-pointer">
                <h2 className="text-lg text-white font-semibold">Trending Products</h2>
                <Link to={'/see-all'} className="text-white font-semibold">See All</Link>
            </div>

            <ProductListing productsArr={filteredProducts.slice(0, 12)} displayError />

            <div className="flex w-full flex-col md:flex-row gap-4 my-2">
                {ads.map((ad, index) => (
                    <div className="md:w-1/1 flex md:flex-row flex-col relative w-full pt-64 px-4 lg:rounded-lg md:rounded-lg" key={index}>
                        <div className="absolute inset-0 w-full h-full">
                            <Imgix src={`${ad.media_url}`} sizes="100vw"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <ProductListing productsArr={filteredProducts.slice(12, 24)} />

        </div>
    );
};

export default TrendingProducts;




