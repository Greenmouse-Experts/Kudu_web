import { useEffect, useState } from "react";
import Badge from "../../../components/Badge";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { Link } from "react-router-dom";
import { Range } from 'react-range';
import { geoLocatorProduct } from "../../../helpers/geoLocatorProduct";

const ProductListing = ({ data, categories, hideCategory }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [subCategories, setSubCategories] = useState(hideCategory ? categories : []);
    const [subCategoriesId, setSubCategoriesId] = useState([]);
    const [values, setValues] = useState([0, 200000]);
    const [sortBy, setSortBy] = useState("popularity");
    const [filteredProducts, setFilteredProducts] = useState(data);

    const products = geoLocatorProduct(data);


    useEffect(() => {
        if (products.length) {
            setFilteredProducts(products);
        }
    }, [products]);

    const { mutate } = useApiMutation();

    const capitalizeEachWord = (str) => {
        return str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    };

    const handleSelectedId = (category) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);

        mutate({
            url: `/category/sub-categories?categoryId=${category}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => setSubCategories(response.data?.data || []),
        });
    };

    const handleSelectedSubId = (category) => {
        setSubCategoriesId(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };

    useEffect(() => {
        const filtered = products.filter(product => {
            const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.sub_category.categoryId);
            const matchSubcategory = subCategoriesId.length === 0 || subCategoriesId.includes(product.sub_category.id);
            const matchPrice = product.price >= values[0] && product.price <= values[1];
            return matchCategory && matchSubcategory && matchPrice;
        });

        setFilteredProducts(filtered);
    }, [selectedCategories, subCategoriesId, values]);

    return (
        <div className="flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto">
            <aside className="lg:w-1/5 p-4 border rounded-lg shadow-sm bg-white mb-6 -mt-8 md:mt-0 lg:mb-0 lg:sticky lg:top-1 lg:h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>

                {!hideCategory &&
                    <div className="block sm:hidden">
                        <h3 className="font-semibold mb-4">Category</h3>
                        <select
                            onChange={(e) => handleSelectedId(Number(e.target.value))}
                            className="w-full p-2 border rounded-lg bg-white"
                        >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                }

                {!hideCategory &&
                    <div className="hidden sm:block">
                        <h3 className="font-semibold mb-4">Category</h3>
                        <ul>
                            {categories.map(category => (
                                <li key={category.id} className="mb-4">
                                    <input
                                        type="checkbox"
                                        id={category.id}
                                        onChange={(e) => handleSelectedId(e.target.value)}
                                        value={category.id}
                                    />
                                    <label htmlFor={category.id} className="ml-2">{category.name}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                }

                {subCategories.length > 0 && (
                    <div>
                        <h3 className="font-semibold mb-4">Sub Category</h3>
                        <ul>
                            {subCategories.map(category => (
                                <li key={category.id} className="mb-4">
                                    <input
                                        type="checkbox"
                                        id={category.id}
                                        onChange={(e) => handleSelectedSubId(e.target.value)}
                                        value={category.id}
                                    />
                                    <label htmlFor={category.id} className="ml-2">{category.name}</label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="font-semibold mb-4">Price Range</h3>
                    <Range
                        step={1}
                        min={0}
                        max={200000}
                        values={values}
                        onChange={(values) => setValues(values)}
                        renderTrack={({ props, children }) => (
                            <div {...props} className="h-1.5 bg-gray-200 rounded-full">
                                {children}
                            </div>
                        )}
                        renderThumb={({ props }) => (
                            <div {...props} className="h-5 w-5 bg-kuduOrange rounded-full" />
                        )}
                    />
                    <div className="flex justify-between mt-2">
                        <span>{values[0]}</span>
                        <span>{values[1]}</span>
                    </div>
                </div>
            </aside>

            <main className="lg:w-4/5 lg:pl-6 sm:pl-0">
                <div className="flex justify-between border items-center mb-6 bg-white p-5 rounded-md">
                    <h1 className="text-xl font-bold">Products</h1>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded">
                        <option value="popularity">Sort by Popularity</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                    </select>
                </div>

                {filteredProducts.length > 0 ?
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <div key={product.id} className="bg-white p-4 shadow-lg border rounded-lg relative">
                                <Link to={`/product/${product.id}`}>
                                    <div className="flex justify-center relative md:h-[200px] h-[200px]">
                                        <img src={product.image_url} alt={product.name} className="w-full md:h-[200px] object-cover rounded-md" />
                                    </div>
                                    <h3 className="text-base font-medium mt-3 leading-loose">{product.name}</h3>
                                    <p className="text-sm font-semibold leading-loose">{product.store.currency.symbol} {product.price}</p>
                                    <button
                                        className={`absolute top-2 right-0 px-2 py-1 text-xs rounded font-medium text-white ${product.vendor?.isVerified || product.admin ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    >
                                        {product.vendor?.isVerified || product.admin ? "Verified" : "Not Verified"}
                                    </button>
                                    <span
                                        className={`absolute top-2 left-0 px-2 py-1 text-xs rounded font-meduim text-white ${product.condition === "brand_new" ? "bg-[#34A853]" : "bg-orange-500"
                                            }`}
                                    >
                                        {capitalizeEachWord(product.condition.replace(/_/g, ' '))}
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                    :
                    <div className="w-full">
                        <div className="empty-store">
                            <div className="text-center">
                                <img
                                    src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                                    alt="Empty Store Illustration"
                                    className="w-80 h-80 mx-auto"
                                />
                            </div>
                            <h1 className="text-center text-lg font-bold mb-4">No Product Found</h1>
                            <div className="text-center text-black-100 mb-6 leading-loose text-sm">
                                Oops! It looks like we don’t have products available in your region at the moment.  <br></br>Please check back later or try browsing other categories.
                            </div>
                        </div>
                    </div>
                }
            </main >
        </div >
    );
};

export default ProductListing;
