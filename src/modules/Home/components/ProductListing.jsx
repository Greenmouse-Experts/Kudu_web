import { useState } from "react";

const ProductListing = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState(200000);
    const [sortBy, setSortBy] = useState("popularity");

    const categories = ['Laptops', 'Phones', 'Accessories', 'TVs', 'Home Appliances'];
    const products = [
        { id: 1, name: 'Hp STREAM 11, INTEL CELERON', price: 20000, category: 'Laptops', image: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1738602596/kuduMart/1_lqs83i.jpg' },
        { id: 2, name: 'Product 2', price: 2000, category: 'Phones', image: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1738602919/kuduMart/1_1_qkerwy.jpg' },
        { id: 3, name: 'Product 3', price: 5000, category: 'TVs', image: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1738602914/kuduMart/1_2_kqskze.jpg' },
        { id: 4, name: 'Product 4', price: 110000, category: 'Laptops', image: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1738603087/kuduMart/1_4_aldb9b.jpg' },
        { id: 5, name: 'Product 5', price: 80000, category: 'Laptops', image: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1738603081/kuduMart/1_5_dtkkx6.jpg' },
        { id: 6, name: 'Product 6', price: 75000, category: 'Accessories', image: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1738603410/kuduMart/1_12_ka9cdu.jpg' },
        { id: 7, name: 'Product 7', price: 120000, category: 'TVs', image: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1738603410/kuduMart/1_10_vtc3gg.jpg' },
        { id: 8, name: 'Product 8', price: 45000, category: 'Phones', image: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1738603410/kuduMart/1_11_rbwu2m.jpg' },
        { id: 9, name: 'Product 9', price: 90000, category: 'Home Appliances', image: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1738603409/kuduMart/1_9_gxsngx.jpg' },
        { id: 10, name: 'Product 10', price: 30000, category: 'Laptops', image: 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1738603409/kuduMart/1_8_ckcpds.jpg' },
    ];

    const filteredProducts = products.filter(product =>
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        product.price <= priceRange
    );

    return (
        <div className="flex flex-col lg:flex-row w-full max-w-screen-xl mx-auto">
            {/* Sidebar */}
            <aside className="lg:w-1/5 p-4 border rounded-lg shadow-sm bg-white mb-6 lg:mb-0">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                <div>
                    <h3 className="font-semibold mb-4">Category</h3>
                    <ul>
                        {categories.map(category => (
                            <li key={category} className="mb-4">
                                <input
                                    type="checkbox"
                                    id={category}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSelectedCategories(prev => prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]);
                                    }}
                                    value={category}
                                />
                                <label htmlFor={category} className="ml-2">{category}</label>
                            </li>
                        ))}
                    </ul>
                </div>
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
                    <h1 className="text-xl font-bold">All Products</h1>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border p-2 rounded">
                        <option value="popularity">Sort by Popularity</option>
                        <option value="priceLow">Price: Low to High</option>
                        <option value="priceHigh">Price: High to Low</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="border p-4 rounded-md bg-white hover:shadow-md transition">
                            <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-md" />
                            <h2 className="text-lg font-medium mt-3 mb-2">{product.name}</h2>
                            <p className="text-gray-600 font-medium">₦{product.price}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProductListing;
