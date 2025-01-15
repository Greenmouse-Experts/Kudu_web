import React, { useState } from 'react';

function Forget() {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center" style={{
            backgroundImage: `
  url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736943190/Reset_Password_xqqki7.jpg
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
                    <h2 className="text-2xl font-bold mb-3 text-black-800">Reset Password </h2>
                    <p className='leading-loose text-sm mb-3'>
                        Enter the email address associated with your account and we’ll send a link to reset your password
                    </p>
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-kuduOrange text-white text-sm font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
                        >
                            Get Reset Password Link  →
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 leading-loose">
                            Back to Login{' '}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Forget;
