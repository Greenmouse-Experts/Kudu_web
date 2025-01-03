import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import Badge from "./Badge";

export default function ProductListing({ productsArr }) {
    return (
        <div className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-x-2 lg:gap-y-14 gap-y-8 bg-white p-3 shadow-sm">
            {productsArr.map((product, index) => (
                <Link to={'/product/id'} key={`${index}0`}>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-center relative md:h-[200px] h-[150px]">
                            <Imgix src={product.photo} width={650} height={650} sizes="20vw" className="object-cover" alt={product.title} />
                            <span className="absolute top-1 right-1">
                                <Badge bgColor={product.status === 'Brand New' ? 'bg-kuduGreen' : 'bg-kuduRed'} text={product.status}
                                    textColor={'text-white'}
                                />
                            </span>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-xs font-semibold">
                                {product.title}
                            </p>
                            <p className="text-sm font-semibold">
                                {product.price}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}