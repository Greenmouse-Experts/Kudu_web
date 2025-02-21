import { Link } from "react-router-dom";

const ProductListing = ({ productsArr }) => {

    const capitalizeEachWord = (str) => {
        return str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {productsArr.map((item) => (
                    <div key={item.id} className="bg-white p-4 border rounded-lg relative">
                        <Link to={`/product/${item.id}`}>
                            <div className="flex justify-center relative md:h-[300px] h-[200px]">
                                <img src={item.image_url} alt={item.name} className="w-full md:h-[300px] object-cover rounded-md" />
                            </div>
                            <h3 className="text-base font-semibold mt-3 leading-loose">{item.name}</h3>
                            <p className="text-sm font-medium leading-loose">{item.store.currency.symbol} {item.price}</p>
                            <button
                                className={`absolute top-2 right-2 px-2 py-1 text-xs rounded font-meduim text-white ${item?.vendor?.isVerified ? "bg-green-500" : "bg-red-500"
                                    }`}
                            >
                                {item?.vendor?.isVerified ? "Verified" : "Not Verified"}
                            </button>
                            <span
                                className={`absolute top-2 left-2 px-2 py-1 text-xs rounded font-meduim text-white ${item.condition === "brand_new" ? "bg-[#34A853]" : "bg-orange-500"
                                    }`}
                            >
                                {capitalizeEachWord(item.condition.replace(/_/g, ' '))}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListing;




