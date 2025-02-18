import { useState } from "react";

const products = Array.from({ length: 4 }, (_, i) => ({
    id: i + 1,
    name: "Macbook Pro 2021",
    price: 20000,
    image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1738603087/kuduMart/1_4_aldb9b.jpg",
    condition: i % 3 === 0 ? "Brand New" : "Used",
}));

const DummyProduct = () => {
    const [items, setItems] = useState(products);

    return (
        <div className="w-full">
            <div className="bg-[#192D4C] w-full flex justify-between p-6 rounded-md mb-10 cursor-pointer">
                <h2 className="text-lg text-white font-semibold">Trending Products</h2>
                <button className="text-white font-semibold">See All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="bg-white p-4 border rounded-lg relative">
                        <img src={item.image} alt={item.name} className="w-full object-cover rounded" />
                        <h3 className="text-base font-semibold mt-3 leading-loose">{item.name}</h3>
                        <p className="text-sm font-medium leading-loose">₦{item.price.toLocaleString()}</p>
                
                        <span
                            className={`absolute top-2 left-2 px-2 py-1 text-xs rounded font-meduim text-white ${item.condition === "Brand New" ? "bg-[#34A853]" : "bg-orange-500"
                                }`}
                        >
                            {item.condition}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DummyProduct;




