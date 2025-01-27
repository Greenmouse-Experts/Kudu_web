import { useState } from "react";
import "../Home/components/style.css";
import ShoppingExperience from "./components/ShoppingExperience";
import GetApp from "./components/GetApp";

const FAQs = () => {
    const [activeCategory, setActiveCategory] = useState("General");
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const categories = ["General", "Selling On KUDU", "Buying on KUDU", "Auction", "Safety & Policy", "Support"];
    const questions = {
        General: [
            { id: 1, question: "Q1: What is Kudu?", answer: "Kudu is a platform where you can buy, sell, or auction items." },
            { id: 2, question: "Q2: Who can use Kudu?", answer: "Anyone above 18 years old can use Kudu for trading." },
            { id: 3, question: "Q3: What sort of items can I buy or sell on Kudu?", answer: "You can buy or sell items such as electronics, cars, furniture, and more." },
            { id: 4, question: "Q4: Are my transactions safe on Kudu?", answer: "Yes, Kudu ensures secure transactions through verified processes." },
            { id: 5, question: "Q5: How can I create an account on Kudu?", answer: "You can create an account by signing up with your email on our website." },
        ],
        "Selling On KUDU": [
            { id: 1, question: "Q1:  How can I sell on Kudu?", answer: "Log in, list your item, and provide details such as price and condition." },
            { id: 2, question: "Q2:  Can I sell services on Kudu?", answer: "Yes, Kudu allows selling refurbished items." },
            { id: 3, question: "Q3:  Do I need a subscription package to sell on Kudu?", answer: "Yes, Kudu ensures secure transactions through verified processes." },
            { id: 4, question: "Q4:  How do I get paid after selling on Kudu?", answer: "You can create an account by signing up with your email on our website." },
            { id: 5, question: "Q5:  Can I edit or delete my listings?", answer: "You can create an account by signing up with your email on our website." },
            { id: 6, question: "Q6:  How can I manage inquiries from buyers?", answer: "You can create an account by signing up with your email on our website." },
            { id: 7, question: "Q7:  Can I sell physical products through an auction?", answer: "You can create an account by signing up with your email on our website." },
            { id: 8, question: "Q8:  How can I manage inquiries from buyers?", answer: "You can create an account by signing up with your email on our website." },
        ],
        "Buying on KUDU": [
            { id: 1, question: "Q1: How do I purchase an item?", answer: "Search for the item, contact the seller, and agree on the payment and delivery method." },
            { id: 2, question: "Q2: Are there buyer protection measures?", answer: "Yes, Kudu ensures secure payments and offers support for disputes." },
            { id: 4, question: "Q3: Are my transactions safe on Kudu?", answer: "Yes, Kudu ensures secure transactions through verified processes." },
            { id: 5, question: "Q4: How can I create an account on Kudu?", answer: "You can create an account by signing up with your email on our website." },
        ],
        "Auction": [
            { id: 1, question: "Q1: How do I purchase an item?", answer: "Search for the item, contact the seller, and agree on the payment and delivery method." },
            { id: 2, question: "Q2: Are there buyer protection measures?", answer: "Yes, Kudu ensures secure payments and offers support for disputes." },
        ],
        "Safety & Policy": [
            { id: 1, question: "Q1: How do I purchase an item?", answer: "Search for the item, contact the seller, and agree on the payment and delivery method." },
            { id: 2, question: "Q2: Are there buyer protection measures?", answer: "Yes, Kudu ensures secure payments and offers support for disputes." },
        ],
        "Support": [
            { id: 1, question: "Q1: How do I purchase an item?", answer: "Search for the item, contact the seller, and agree on the payment and delivery method." },
            { id: 2, question: "Q2: Are there buyer protection measures?", answer: "Yes, Kudu ensures secure payments and offers support for disputes." },
        ],
    };

    // Filter questions by search query
    const filteredQuestions = questions[activeCategory].filter((q) =>
        q.question.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="w-full flex flex-col">
                <section className="breadcrumb" style={{
                    backgroundImage: `url(https://res.cloudinary.com/greenmouse-tech/image/upload/v1738005374/image_1_zkrcpb.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <div className="flex flex-col py-12">
                        <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
                            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
                        </div>
                    </div>
                </section>
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full bg-white">
                    <div className="w-full flex flex-col md:flex-row gap-8 p-6 Justtttt">
                        {/* Categories Sidebar */}
                        <div className="w-full md:w-1/4 bg-white shadow rounded-lg p-4">
                            <h2 className="font-semibold text-xl py-4 px-5 mb-4">Categories</h2>
                            <ul className="space-y-2">
                                {categories.map((category) => (
                                    <li
                                        key={category}
                                        className={`cursor-pointer py-4 px-5 rounded-lg ${activeCategory === category
                                            ? "bg-[#FF6F22] text-white"
                                            : "text-black hover:bg-[#FF6F22] hover:text-white"
                                            }`}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Questions Section */}
                        <div className="w-full md:w-3/4">
                            {/* Search Bar */}
                            <div className="mb-6">
                                <input
                                    type="text"
                                    placeholder="Search in frequently asked questions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border rounded-lg p-5 w-full bg-gray-50"
                                    style={{ outline: "none" }}
                                />
                            </div>

                            {/* Questions */}
                            <div className="bg-white shadow rounded-lg p-6">
                                <h2 className="font-semibold text-xl mb-4">Got Questions?</h2>
                                <div className="space-y-4">
                                    {filteredQuestions.map((q) => (
                                        <div key={q.id} className="border-b pb-4">
                                            <div
                                                className="flex justify-between items-center cursor-pointer py-4"
                                                onClick={() =>
                                                    setExpandedQuestion(expandedQuestion === q.id ? null : q.id)
                                                }
                                            >
                                                <p className="text-black font-medium">{q.question}</p>
                                                <button className="py-3">
                                                    {expandedQuestion === q.id ? "-" : "+"}
                                                </button>
                                            </div>
                                            {expandedQuestion === q.id && (
                                                <p className="mt-4 text-black font-medium mb-3">{q.answer}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                    <div className="w-full flex mt-3 Justing">
                        <ShoppingExperience />
                    </div>
                </div>
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 Amenn" style={{
                    backgroundImage: `
                    url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1737405367/Frame_1618873123_fy7sgx.png)
                    `,
                    backgroundBlendMode: "overlay",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    className: "sm-[70vh]",
                }}>
                    <div className="w-full flex flex-col gap-5 ">
                        <GetApp />
                    </div>
                </div>
            </div>
        </>

    );
};

export default FAQs;
