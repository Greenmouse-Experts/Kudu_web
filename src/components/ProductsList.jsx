import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import Badge from "./Badge";

export default function ProductListing({ productsArr }) {
    const capitalizeEachWord = (str) => {
        return str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    return (
        <div className="grid w-full grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-4 lg:gap-y-14 gap-y-8 bg-white p-3 shadow-sm">
            {productsArr.map((product, index) => (
                <Link to={`/product/${product.id}`} key={`${index}0`} className="bg-white border shadow-sm rounded-lg">
                    <div className="flex flex-col relative">
                        {/* Product Image & Badge */}
                        <div className="flex justify-center relative md:h-[250px] h-[250px]">
                            <Imgix
                                src={product.image_url}
                                width={650}
                                height={650}
                                sizes="20vw"
                                className="object-cover w-full h-full rounded-lg"
                                alt={product.meta_description}
                            />
                            {/* Condition Badge (Top-Right) */}
                            <span className="absolute top-1 right-1">
                                <Badge
                                    bgColor={capitalizeEachWord(product.condition.replace(/_/g, ' ')) === 'Brand New' ? 'bg-kuduGreen' : 'bg-kuduRed'}
                                    text={capitalizeEachWord(product.condition.replace(/_/g, ' '))}
                                    textColor={'text-white'}
                                />
                            </span>
                            {/* Verified Badge (Bottom-Right) */}
                            <span className="absolute bottom-2 right-2">
                                <button
                                    className={`text-white text-xs px-3 py-1 rounded-md font-light transition-all
                                        ${product.verified ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
                                    `}
                                >
                                    {product.verified ? "Verified ✅" : "Not Verified ❌"}
                                </button>
                            </span>
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col gap-4 p-4 border-t-2">
                            <p className="text-xs font-semibold capitalize leading-loose">
                                {product.name}
                            </p>
                            <p className="text-xs font-semibold">
                                {product.store.currency.symbol} {product.price}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
