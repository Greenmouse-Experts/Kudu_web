import { Outlet } from "react-router-dom";
import ProductListing from "../../components/ProductsList";
import ProfileSideBar from "./components/sideBar";
import { useEffect } from "react";
import useApiMutation from "../../api/hooks/useApiMutation";
import { setCurrencyData } from "../../reducers/userSlice";

export default function UserProfile() {
    const { mutate } = useApiMutation();

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
    ];

    const getCurrency = () => {
        mutate({
            url: `/vendor/currencies`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setCurrencyData(response.data.data)
            },
            onError: () => {
            }
        });
    }

    useEffect(() => {
        getCurrency();
    }, []);


    return (
        <>
            <div className="w-full flex flex-col h-full bg-kuduLightBlue">
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 mt-24 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
                    <div className="w-full flex md:flex-row flex-col h-full relative gap-8 items-start">
                        <div className="w-[35%] md:flex hidden flex-col">
                            <ProfileSideBar />
                        </div>
                        <div className="flex w-full md:w-[65%]">
                            <Outlet />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-6 items-start my-10">
                    </div>
                </div>
            </div>
        </>
    )
}