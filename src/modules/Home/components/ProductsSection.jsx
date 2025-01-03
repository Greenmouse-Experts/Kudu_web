import Imgix from "react-imgix"
import ProductListing from "../../../components/ProductsList"

export default function ProductsSection() {
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
            photo: "https://res.cloudinary.com/do2kojulq/image/upload/v1735426608/kudu_mart/sneakers_kfsmix.png",
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
            photo: "https://res.cloudinary.com/do2kojulq/image/upload/v1735426614/kudu_mart/television_u0t8wb.png",
            title: "85 inch Oled Television",
            price: "₦ 63,500",
            status: "Brand New"
        },
    ]
    return (
        <>
            <div className="flex flex-col gap-5 w-full">
                <span className="text-xs font-semibold">Trending</span>
                <ProductListing productsArr={productsArr} />
                <div className="flex w-full flex-col md:flex-row gap-4">
                    <div className="bg-kuduDarkBlue md:w-1/2 flex md:flex-row flex-col w-full py-2 px-4 lg:rounded-lg md:rounded-lg">
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

                    <div className="md:w-1/2 relative lg:flex md:flex flex w-full lg:rounded-lg md:rounded-lg">
                        <div className="absolute w-full h-full z-0">
                            <Imgix src="https://res.cloudinary.com/do2kojulq/image/upload/v1735507193/kudu_mart/Group_48097070_f7dizd.jpg" sizes="100vw"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-grow flex-col relative gap-2 px-4 py-5">
                            <h2 className="md:text-2xl text-base font-semibold text-white">Hisense Smart
                                60” LED Television</h2>
                            <button className="bg-white shadow-sm flex gap-2 mt-5 text-kuduDarkBlue font-semibold text-xs rounded-full px-3 md:w-1/2 py-1">
                                Starting
                                <br />
                                From
                                <b className="mt-2">₦285,000</b>
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