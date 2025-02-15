import { useEffect, useState } from "react";
import Badge from "../../../components/Badge";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { Link } from "react-router-dom";
import { Range } from 'react-range';

const ProductListing = ({ data, categories, hideCategory }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [subCategories, setSubCategories] = useState(hideCategory ? categories : []);
    const [subCategoriesId, setSubCategoriesId] = useState([]);
    const [values, setValues] = useState([0, 200000]);
    const [sortBy, setSortBy] = useState("popularity");
    const [filteredProducts, setFilteredProducts] = useState(data);

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
        const filtered = data.filter(product => {
            const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.sub_category.categoryId);
            const matchSubcategory = subCategoriesId.length === 0 || subCategoriesId.includes(product.sub_category.id);
            const matchPrice = product.price >= values[0] && product.price <= values[1];
            return matchCategory && matchSubcategory && matchPrice;
        });

        setFilteredProducts(filtered);
    }, [selectedCategories, subCategoriesId, values, data]);

    return (
        <div className="flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto">
            <aside className="lg:w-1/5 p-4 border rounded-lg shadow-sm bg-white mb-6 lg:mb-0 lg:sticky lg:top-1 lg:h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <Link to={`/product/${product.id}`} key={product.id} className="border rounded-md bg-white hover:shadow-sm">
                            <div className="flex justify-center relative md:h-[200px] h-[200px]">
                                <img src={product.image_url} alt={product.name} className="w-full md:h-[200px] object-cover rounded-md" />
                            </div>
                            <h2 className="text-base p-4 font-medium mt-3">{product.name}</h2>
                            <p className="text-black text-sm p-4 font-medium">{product.store.currency.symbol} {product.price}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProductListing;
