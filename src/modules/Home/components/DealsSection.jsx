import { Carousel } from "@material-tailwind/react";
import Imgix from "react-imgix";

export default function DealsSection() {

    return (
        <>
            <div className="relative w-full md:h-[465px] xl:h-[577px] overflow-hidden">
                <Carousel
                    autoplay
                    loop
                    className="rounded-xl"
                    navigation={({ setActiveIndex, activeIndex, length }) => (
                        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                            {new Array(length).fill("").map((_, i) => (
                                <span
                                    key={i}
                                    className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                        }`}
                                    onClick={() => setActiveIndex(i)}
                                />
                            ))}
                        </div>
                    )}
                >
                    <Imgix
                        src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426595/kudu_mart/phone-section_qxrwuq.png"
                        alt="image 1"
                        sizes="100vw"
                        className="h-full w-full object-cover"
                    />
                    <Imgix
                        src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426601/kudu_mart/shoes-banner_yjqhhg.jpg"
                        alt="image 2"
                        sizes="100vw"
                        className="h-full w-full object-cover"
                    />
                    <Imgix
                        src="https://res.cloudinary.com/do2kojulq/image/upload/v1735469251/kudu_mart/Black-Friday_web_banner_03_yjibsm.jpg"
                        alt="image 3"
                        sizes="100vw"
                        className="h-full w-full object-cover"
                    />
                </Carousel>
            </div>
        </>
    )
}