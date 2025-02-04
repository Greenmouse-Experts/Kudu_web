import Imgix from "react-imgix"
import ProductListing from "../../../components/ProductsList"
import './style.css';
import { Link } from "react-router-dom";

export default function ProductsSection({ data }) {
    return (
        <>
            <div className="flex flex-col gap-8 w-full Justing">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-black sm:text-lg md:text-2xl xl:text-3xl font-bold">Products</h1>
                    <p className="sm:text-lg md:text-1xl  text-kuduOrange font-semibold cursor-pointer view">
                        <Link to="/see-all">See All</Link>
                    </p>
                </div>
                {/* <span className="text-black sm:text-lg md:text-2xl xl:text-3xl font-bold">Products</span> */}
                <ProductListing productsArr={data} />
                <div className="flex w-full flex-col md:flex-row gap-4">
                    <div className="bg-kuduDarkBlue md:w-1/1 flex md:flex-row flex-col w-full py-2 px-4 lg:rounded-lg md:rounded-lg">
                        <div className="flex flex-col flex-grow gap-2 py-3">
                            <h2 className="md:text-2xl text-base font-semibold text-white">Boost Leads for Your Business</h2>
                            <p className="text-white text-sm mb-4">Place an advert on Kudu</p>
                            <div className="flex md:hidden -mt-3">
                                <Imgix sizes="(max-width: 768px) 50px, 80px"
                                    className="max-w-[250px] max-h-[200px] md:max-w-[80px] md:max-h-[80px] object-contain"
                                    src={'https://res.cloudinary.com/do2kojulq/image/upload/v1735426614/kudu_mart/user_phone_vwx3xd.png'} width={250} height={0} alt="user phone" />
                            </div>
                            <button className="bg-white shadow-sm flex gap-2 text-kuduDarkBlue justify-center md:text-sm text-xs uppercase font-semibold w-full px-4 py-3">Shop Tech
                                <span className="flex flex-col justify-center mt-[7px]">
                                    <svg width="26" height="13" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M26 6.5L16 0.726497V12.2735L26 6.5ZM0 7.5H17V5.5H0V7.5Z" fill="#192D4C" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                        <div className="md:flex lg:flex xl:flex flex-grow justify-end hidden">
                            <Imgix sizes="20vw" src={'https://res.cloudinary.com/do2kojulq/image/upload/v1735426614/kudu_mart/user_phone_vwx3xd.png'} width={250} height={50} alt="user phone" />
                        </div>
                    </div>

                    <div className="md:w-1/1 relative lg:flex md:flex flex w-full lg:rounded-lg md:rounded-lg">
                        <div className="absolute w-full h-full z-0">
                            <Imgix src="https://res.cloudinary.com/do2kojulq/image/upload/v1735507193/kudu_mart/Group_48097070_f7dizd.jpg" sizes="100vw"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-grow flex-col relative gap-2 px-4 py-5">
                            <h2 className="md:text-2xl text-base font-semibold text-white">Hisense Smart
                                60” LED Television</h2>
                            <button className="bg-white shadow-sm flex gap-2 mt-5 text-kuduDarkBlue font-semibold text-xs py-4 rounded-full sm:rounded-sm px-3 sm:px-11 md:w-1/1 ">
                                Startin From
                                <b className="">₦285,000</b>
                            </button>
                        </div>
                        <div className="md:flex flex relative px-4">
                            <Imgix sizes="20vw" src={'https://res.cloudinary.com/do2kojulq/image/upload/v1735426614/kudu_mart/televison_frame_ad5oa0.png'} width={210} height={30} alt="user phone" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}