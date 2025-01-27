import { useState } from "react";
import "../Home/components/style.css";

export default function About() {
    return (
        <>
            <div className="w-full flex flex-col">
                <section className="breadcrumb" style={{
                    backgroundImage: `url(https://res.cloudinary.com/greenmouse-tech/image/upload/v1738015034/image_5_vbukr9.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <div className="flex flex-col py-12">
                        <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
                            <h1 className="text-4xl font-bold">About KUDU</h1>
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full flex flex-col bg-white items-center">
                {/* Hero Section */}
                {/* <section className="w-full Ju mt-16">
                    <div className="container mx-auto flex flex-col md:flex-row px-6 lg:px-20 gap-8">
                        
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-black leading-snug mb-4">
                                Welcome to Kudu Mart, your ultimate destination for secure and seamless online shopping
                            </h1>
                            <p className="text-black text-sm mb-6 leading-loose">
                                We are an innovative online marketplace connecting individuals and businesses worldwide.
                                Whether you're looking to buy quality products, sell stuff online, or participate in live online auctions,
                                Kudu Mart provides a reliable platform built on trust and reliability.
                            </p>
                            <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600">
                                Visit Store
                            </button>
                        </div>
                      
                        <div className="flex-1 h-64 bg-gray-200 rounded-lg"></div>
                    </div>
                </section> */}

                {/* Core Principles Section */}
                {/* <section className="w-full bg-gray-50 py-12">
                    <div className="container mx-auto px-6 lg:px-20 text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            At KUDU, we prioritize trust, safety, and customer satisfaction. Here are Our Core Principles
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {[
                                {
                                    title: "Transparency",
                                    description:
                                        "We ensure equal opportunities for sellers and fair pricing for buyers, promoting a level playing field.",
                                },
                                {
                                    title: "Quality Assurance",
                                    description:
                                        "We verify seller authenticity, product legitimacy, and ensure compliance with industry standards.",
                                },
                                {
                                    title: "Transparency",
                                    description:
                                        "We provide clear policies, accurate product descriptions, and timely communication.",
                                },
                                {
                                    title: "Customer Protection",
                                    description:
                                        "We prioritize safeguarding user information, ensuring secure transactions, and protecting customers.",
                                },
                                {
                                    title: "Accountability",
                                    description:
                                        "We take responsibility for resolving disputes and continually improving our platform.",
                                },
                            ].map((principle, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="text-orange-500 text-3xl mb-4">
                                        <i className="fas fa-shield-alt"></i>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        {principle.title}
                                    </h3>
                                    <p className="text-gray-600">{principle.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}
            </div>
        </>

    );
}
