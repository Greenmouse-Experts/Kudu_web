import { useEffect, useState } from "react";
import Badge from "../../../components/Badge";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { Link } from "react-router-dom";

const ProductListing = ({ data, categories }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subCategoriesId, selectedSubCategoryIds] = useState([]);
    const [priceRange, setPriceRange] = useState(200000);
    const [sortBy, setSortBy] = useState("popularity");
    const [filteredProducts, setFilteredProducts] = useState(data);

    useEffect(() => {
        setFilteredProducts(data);
    }, [data]);


    const { mutate } = useApiMutation();

    const capitalizeEachWord = (str) => {
        return str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }


    const handleSelectedId = (category) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);

        mutate({
            url: `/category/sub-categories?categoryId=${category}`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => setSubCategories(response.data?.data || []),
        });
    }


    const handleSelectedSubId = (category) => {
        selectedSubCategoryIds(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    }


    useEffect(() => {
        const filteredProducts = data.filter(product =>
            selectedCategories.includes(product.categoryId) &&
            subCategoriesId.includes(product.sub_category.id) &&
            priceRange === product.price
        );

        if (filteredProducts.length > 0)
            setFilteredProducts(filteredProducts);

    }, [selectedCategories, subCategoriesId]);


    return (
        <div className="flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto">
            {/* Sidebar */}
            <aside className="lg:w-1/5 p-4 border rounded-lg shadow-sm bg-white mb-6 lg:mb-0 lg:sticky lg:top-1 lg:h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>

                {/* Category Dropdown on mobile */}
                <div className="block sm:hidden">
                    <h3 className="font-semibold mb-4">Category</h3>
                    <select
                        onChange={(e) => handleSelectedId(e.target.value)}
                        className="w-full p-2 border rounded-lg bg-white"
                    >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Category checkboxes on larger screens */}
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

                <div className="mt-4">
                    <h3 className="font-semibold mb-4">Price Range</h3>
                    <input
                        type="range"
                        min="1000"
                        max="200000"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-full"
                    />
                    <p>₦{priceRange}</p>
                </div>

                <div className="mt-4">
                    <h3 className="font-semibold mb-4">Product Rating</h3>
                    <ul>
                        {[4, 3, 2, 1].map(stars => (
                            <li key={stars} className="mb-4 flex items-center">
                                <input type="radio" name="rating" id={`rating-${stars}`} className="mr-2" />
                                <label htmlFor={`rating-${stars}`}>{'⭐'.repeat(stars)} & above</label>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>



            {/* Main Content */}
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
                    {filteredProducts.map(product => {
                        // Split product name into words
                        const nameParts = product.name.split(" ");

                        // Set a word limit that fits in two lines (adjust if needed)
                        const wordLimit = 5;

                        // Trim the name to fit two lines
                        const truncatedName = nameParts.length > wordLimit
                            ? `${nameParts.slice(0, wordLimit).join(" ")}...`
                            : product.name;

                        return (
                            <Link to={`/product/${product.id}`} key={product.id} className="border rounded-md bg-white hover:shadow-sm shadow-sm transition">
                                <div className="flex justify-center relative md:h-[200px] h-[200px]">
                                    <img src={product.image_url} alt={product.name} className="w-full md:h-[200px] h-[200px] object-cover rounded-md" />
                                    <span className="absolute top-1 right-1">
                                        <Badge
                                            bgColor={capitalizeEachWord(product.condition.replace(/_/g, ' ')) === 'Brand New' ? 'bg-kuduGreen' : 'bg-kuduRed'}
                                            text={capitalizeEachWord(product.condition.replace(/_/g, ' '))}
                                            textColor={'text-white'}
                                        />
                                    </span>
                                </div>
                                <h2 className="text-base p-4 font-medium mt-3">{truncatedName}</h2>
                                <p className="text-black text-sm p-4 font-medium">{product.store.currency.symbol} {product.price}</p>
                            </Link>
                        );
                    })}
                </div>
            </main>

        </div>
    );
};

export default ProductListing;
