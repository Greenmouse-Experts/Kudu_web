import { useState } from "react";
import "../Home/components/style.css";


const Conditions = () => {
    const principles = [
        {
            title: "Basic provisions ",
            description:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ame Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud am.et",
        },
        {
            title: "The users account",
            description:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ame Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud am.et",
        },
        {
            title: "Limitation of damage ",
            description:
            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ame Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud am.et",
        },
        {
            title: "Intellectual policy",
            description:
            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ame Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud am.et",
        },
        {
            title: "User obligations",
            description:
            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ame Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud am.et",
        },

        {
            title: "Company obligation",
            description:
            "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud ame Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud am.et",
        },
    ];

    return (
        <>
            <div className="w-full flex flex-col">
                <section className="breadcrumb" style={{
                    backgroundImage: `url(https://res.cloudinary.com/greenmouse-tech/image/upload/v1738012617/image_3_ij6lwh.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <div className="flex flex-col py-12">
                        <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
                            <h1 className="text-4xl font-bold">Terms and Conditions</h1>
                        </div>
                    </div>
                </section>
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full bg-white">
                    <div className="">
                        {/* Intro Section */}
                        <div className="mt-14 mb-8">
                            <p className="text-black text-lg mb-16">
                            The present document “Terms of Service for the KUDU Service” (hereinafter referred to as “Terms”) consists of terms governing the relationship between KUDU. (hereinafter referred to as “KUDU service”, “KUDU”, “The Service”) and the customer of the service (hereinafter “customer”, “user”, “you”, “member”). 
                            </p>
                        </div>

                        {/* Principles Section */}
                        <div className="bg-white rounded-lg py-10">
                            {principles.map((principle, index) => (
                                <div
                                    key={index}
                                    className={`border-b pb-6 mb-6 ${index === principles.length - 1 ? "border-b-0 mb-0 pb-0" : ""
                                        }`}
                                >
                                    <h3 className="text-lg font-semibold text-black mb-4">
                                        {index + 1}. {principle.title}
                                    </h3>
                                    <p className="text-black">{principle.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Conditions;
