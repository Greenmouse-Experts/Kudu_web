import CategoriesSection from "./components/CategoriesSection";
import DealsSection from "./components/DealsSection";
import PostSection from "./components/PostSection";
import SearchSection from "./components/SearchSection";

export default function LandingHomepage() {
    return (
        <div className="w-full flex flex-col">
            <SearchSection />
            <div className="w-full flex flex-col xl:px-80 lg:pl-44 lg:pr-36 md:px-4 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-kuduLightBlue h-full">
                <div className="w-full lg:flex md:flex hidden gap-3 mt-3">
                    <DealsSection />
                    <PostSection />
                </div>
                <div className="w-full flex mt-3">
                    <CategoriesSection />
                </div>
            </div>
        </div>
    )
};