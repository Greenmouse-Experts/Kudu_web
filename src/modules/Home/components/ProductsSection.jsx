import Imgix from "react-imgix"
import ProductListing from "../../../components/ProductsList"
import './style.css';
import { Link } from "react-router-dom";

export default function ProductsSection({ data, ads }) {
    console.log(ads)
    return (
        <>
            <div className="flex flex-col gap-8 w-full Justing">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-black sm:text-lg md:text-2xl xl:text-3xl font-bold">Products</h1>
                    <Link to='/see-all' className="sm:text-lg md:text-1xl  text-kuduOrange font-semibold cursor-pointer view">
                        See All
                    </Link>
                </div>
                {/* <span className="text-black sm:text-lg md:text-2xl xl:text-3xl font-bold">Products</span> */}
                <ProductListing productsArr={data} />
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
            </div>
        </>
    )
}