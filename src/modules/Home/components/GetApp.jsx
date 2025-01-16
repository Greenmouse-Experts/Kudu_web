import Imgix from "react-imgix";

export default function GetApp() {
    return (
        <>
            <div className="w-full md:py-60 py-1 relative h-full Abi">
                <div className="absolute top-0 left-0 w-full h-full">
                    <Imgix src="https://res.cloudinary.com/do2kojulq/image/upload/v1735564796/kudu_mart/Frame_1618873123_exzpdq.png" sizes="100vw" className="w-full h-full" />
                </div>
                <div className="relative z-10 w-full h-full">
                    <a
                        href="https://play.google.com/store/apps"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute left-[10.4%] top-[100%] mt-[3.5%] w-[8%] h-[40px] bg-transparent hover:bg-black/10 rounded-md"
                        aria-label="Download on Google Play"
                    ></a>
                    <a
                        href="https://www.apple.com/app-store/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute left-[19%] top-[100%] mt-[3.5%] w-[8%] h-[40px] bg-transparent hover:bg-black/10 rounded-md"
                        aria-label="Download on the App Store"
                    ></a>
                </div>
            </div>
        </>
    )
}