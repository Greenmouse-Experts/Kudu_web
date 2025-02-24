import { Link } from "react-router-dom";
import ProductListing from "../../../components/ProductsList";
import Imgix from "react-imgix";

const ProductsSection = ({ productsArr, ads }) => {
    return (
        <div className="w-full">
            <div className="bg-[#C1FFA5] flex justify-between p-6 rounded-md mb-10 cursor-pointer">
                <h2 className="text-lg font-semibold">All Products</h2>
                <Link to={'/see-all'} className="text-black font-semibold">See All</Link>
            </div>

            <ProductListing productsArr={productsArr.slice(0, 8)} displayError />

            <div className="flex w-full flex-col md:flex-row gap-4">
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

            <ProductListing productsArr={productsArr.slice(8, 12)} />

        </div>
    );
};

export default ProductsSection;




