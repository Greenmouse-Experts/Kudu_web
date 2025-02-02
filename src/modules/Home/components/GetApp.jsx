import Imgix from "react-imgix";
import './style.css';
export default function GetApp() {
    return (
        <>
            <div className="relative flex flex-col md:flex-row w-full min-w-screen-xl mx-auto h-auto md:h-[400px] bg-transparent">

                {/* Background section */}
                {/* Foreground Content */}
                <div className="relative flex flex-col md:flex-row items-center justify-between w-full h-full px-6 z-10">
                    {/* Left Section: Text & Button */}
                    <div className="flex flex-col justify-center md:w-1/2 max-w-md text-center md:text-left">
                        <h2 className="text-2xl md:text-4xl font-semibold text-white leading-snug">
                            Get the App
                        </h2>
                        <p className="text-white text-base md:text-lg mt-4 leading-loose">
                            Buy and sell with Kudu, where convenience meets quality.
                        </p>
                        <div className="flex items-center gap-4 mt-6">
                            {/* Google Play Button */}
                            <img
                                src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1737404439/Frame_23_x0rtk4.png"
                                alt="Google Play"
                                className="w-36 h-auto sm:w-20 md:w-40"
                                draggable="false"
                            />
                            {/* App Store Button */}
                            <img
                                src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1737404439/Frame_24_jfspqy.png"
                                alt="App Store"
                                draggable="false"
                                className="w-36 h-auto sm:w-20 md:w-40"
                            />
                        </div>

                    </div>

                    {/* Right Section: Image */}
                    <div className="relative flex items-center justify-center md:justify-end w-full md:w-1/1 sm:mt-14">
                        <img
                            src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1737404892/Group_1321314900_l9puj7.png"
                            alt="App Illustration"
                            className="object-contain Jusyyy md:w-full"
                        />
                    </div>

                </div>
            </div>
        </>
    )
}