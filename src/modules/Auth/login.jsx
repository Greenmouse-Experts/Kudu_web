import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center" style={{
            backgroundImage: `
  url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736937255/Sign_Up_oip09b.jpg
`,
            backgroundBlendMode: "overlay",
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
        }}>
            {/* Logo Section */}
            <div className="mb-6">
                <img
                    src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/kudu1_rarauu.png"
                    alt="Kudu Logo"
                    className="h-12"
                />
            </div>

            {/* Form Card */}
            <div className="w-full max-w-lg px-6 py-6 bg-white/20 backdrop-blur-lg rounded-lg">
                <div className="w-full max-w-lg px-8 py-10 bg-white rounded-lg ">
                    <h2 className="text-2xl font-bold mb-6 text-black-800">Sign In</h2>
                    <form className="flex flex-col gap-4">
                        {/* Email Field */}
                        <div>
                            <label className="block text-md font-semibold mb-3" htmlFor="email">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email address"
                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                style={{ outline: "none", }}
                                required 
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-md font-semibold mb-3" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Enter password"
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none", }}
                                    required 
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
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

                        {/* Forgot Password */}
                        <div className="flex justify-between items-center text-sm mb-4">
                        <a className="text-orange-500 hover:underline">
                                    Forgot password?
                                </a>

                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-kuduOrange text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
                        >
                            Sign In →
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 leading-loose">
                            Don’t have an account?{' '}<br />
                            <Link to={'/sign-up'} className="text-orange-500 font-semibold hover:underline leading-loose">
                                Sign Up →
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;
