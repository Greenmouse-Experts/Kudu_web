import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox } from "@material-tailwind/react";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            className="w-full h-screen flex flex-col justify-center items-center"
            style={{
                backgroundImage: `
  url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736942330/Sign_Up_1_og6gq5.jpg
`,
                backgroundBlendMode: "overlay",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
            }}
        >
            {/* Logo Section */}
            <div className="mb-6">
                <img
                    src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/kudu1_rarauu.png"
                    alt="Kudu Logo"
                    className="h-12"
                />
            </div>

            {/* Form Card */}
            <div className="w-full max-w-screen-md mx-auto px-6 py-6 bg-white/20 backdrop-blur-lg rounded-lg">
                <div className="w-full px-8 py-10 bg-white rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-black-800">Sign Up</h2>
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/*  First Name Field */}
                        <div>
                            <label
                                className="block text-md font-semibold mb-3"
                                htmlFor="firstname"
                            >
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstname"
                                placeholder="Enter First Name"
                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                style={{ outline: "none" }}
                                required 
                            />
                        </div>
                        {/*  Last Name Field */}
                        <div>
                            <label
                                className="block text-md font-semibold mb-3"
                                htmlFor="lastname"
                            >
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastname"
                                placeholder="Enter Last Name"
                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                style={{ outline: "none" }}
                                required 
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                className="block text-md font-semibold mb-3"
                                htmlFor="email"
                            >
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                style={{ outline: "none" }}
                                required 
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                className="block text-md font-semibold mb-3"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter password"
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                                    required 
                                >
                                    {showPassword ? (
                                        <img
                                            src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/eye-password_yjivzt.png"
                                            alt="Hide Password"
                                            className="w-5"
                                        />
                                    ) : (
                                        <img
                                            src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/eye-password_yjivzt.png"
                                            alt="Show Password"
                                            className="w-5"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Checked */}
                        <div className="flex items-center text-sm mb-4">
                            <span className="flex">
                                <Checkbox />
                                
                            </span>
                            <span className="flex flex-col text-sm justify-center">I agree to terms and policies from Kudu</span>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <Link to={'/login'}>
                                <button
                                    type="submit"
                                    className="w-full mb-4 py-3 bg-kuduOrange text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
                                >
                                    Sign Up →
                                </button>
                            </Link>
                        </div>
                    </form>

                    <div className='flex gap-4 w-full mb-4'>
                        <hr className="w-full flex mt-3" style={{ backgroundColor: 'rgba(141, 141, 141, 1)' }} />
                        <div className="flex text-gray-500">or</div>
                        <hr className="w-full flex mt-3" style={{ backgroundColor: 'rgba(141, 141, 141, 1)' }} />
                    </div>

                    <div className='flex gap-4 w-full'>
                        <Button
                            type="submit"
                            className="w-full bg-white border border-grey text-black px-4 my-2 flex justify-center gap-2 rounded-lg"
                            style={{ outline: "none", boxShadow: '0px 0px 0px 0px', }}
                        >
                            <svg width="20" height="20" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.3136 13.7623C25.3136 12.7911 25.2332 12.0823 25.0592 11.3474H13.7422V15.7311H20.385C20.2511 16.8205 19.5279 18.4611 17.9207 19.5635L17.8982 19.7103L21.4764 22.4269L21.7243 22.4511C24.0011 20.3905 25.3136 17.3586 25.3136 13.7623Z" fill="#4285F4" />
                                <path d="M13.7415 25.3125C16.9959 25.3125 19.728 24.2625 21.7236 22.4513L17.92 19.5636C16.9022 20.2593 15.536 20.7449 13.7415 20.7449C10.554 20.7449 7.84869 18.6843 6.88431 15.8362L6.74296 15.8479L3.02229 18.6698L2.97363 18.8024C4.95575 22.6612 9.02719 25.3125 13.7415 25.3125Z" fill="#34A853" />
                                <path d="M6.8851 15.8363C6.63064 15.1013 6.48337 14.3138 6.48337 13.5C6.48337 12.6862 6.63064 11.8988 6.87171 11.1638L6.86497 11.0072L3.09766 8.14001L2.97441 8.19747C2.15748 9.79877 1.68872 11.5969 1.68872 13.5C1.68872 15.4031 2.15748 17.2012 2.97441 18.8025L6.8851 15.8363Z" fill="#FBBC05" />
                                <path d="M13.7416 6.25497C16.0049 6.25497 17.5317 7.21309 18.4023 8.01377L21.804 4.75875C19.7148 2.85563 16.996 1.6875 13.7416 1.6875C9.02719 1.6875 4.95576 4.33873 2.97363 8.19745L6.87095 11.1637C7.84872 8.31562 10.554 6.25497 13.7416 6.25497Z" fill="#EB4335" />
                            </svg>
                            <span className='text-base text-dark flex text-sm font-semibold flex-col justify-center mt-[1.5px]'>Continue with Google</span>
                        </Button>
                    </div>
                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 leading-loose">

                            <Link to={'/'}  className="text-orange-500 font-semibold hover:underline leading-loose">
                            Sign In →
                                </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
