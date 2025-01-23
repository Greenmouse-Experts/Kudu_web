import React, { useState } from 'react';

const Setting = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [profilePicture, setProfilePicture] = useState(
        "https://res.cloudinary.com/greenmouse-tech/image/upload/v1737659699/kuduMart/Ellipse_1004_ouet7u.png"
    );

    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePicture(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="All">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-5">Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="md:col-span-1 bg-white rounded-lg p-6">
                        <div className="flex md:flex-col space-x-4 md:space-x-0 md:m-5 md:space-y-4">
                            <button
                                className={`px-4 py-4 rounded-md ${activeTab === "profile" ? "bg-[#FFF1E9] text-black font-semibold" : "bg-gray-100"}`}
                                onClick={() => setActiveTab("profile")}
                            >
                                Profile
                            </button>
                            <button
                                className={`px-4 py-4 rounded-md ${activeTab === "security" ? "bg-[#FFF1E9] text-black font-semibold" : "bg-gray-100"}`}
                                onClick={() => setActiveTab("security")}
                            >
                                Security
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="col-span-3 bg-white rounded-lg p-6">
                        {activeTab === "profile" && (
                            <>
                                {/* Profile Picture */}
                                <div className="flex items-center space-x-6 mb-6">
                                    <div className="w-20 h-20 rounded-full overflow-hidden">
                                        <img
                                            src={profilePicture}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <label
                                        htmlFor="profilePicture"
                                        className="border rounded-lg px-4 py-2 text-sm text-gray-600 cursor-pointer"
                                    >
                                        Change Picture
                                        <input
                                            type="file"
                                            id="profilePicture"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handlePictureChange}
                                        />
                                    </label>
                                </div>

                                {/* Form */}
                                <form className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium mb-4 mt-4">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className="border rounded-lg p-4 w-full bg-gray-50"
                                            placeholder="Enter first name"
                                            style={{ outline: "none" }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium mb-4 mt-4">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            className="border rounded-lg p-4 w-full bg-gray-50"
                                            placeholder="Enter last name"
                                            style={{ outline: "none" }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium mb-4 mt-4">
                                            Phone Number
                                        </label>
                                        <div className="flex">
                                            <span className="inline-flex items-center px-4 rounded-l-lg border bg-gray-100 text-gray-600">
                                                🇳🇬
                                            </span>
                                            <input
                                                type="text"
                                                id="phoneNumber"
                                                className="border rounded-r-lg p-4 w-full bg-gray-50"
                                                placeholder="Enter phone number"
                                                style={{ outline: "none" }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-4 mt-4">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            className="border rounded-lg p-4 w-full bg-gray-50"
                                            placeholder="Enter email address"
                                            style={{ outline: "none" }}
                                        />
                                    </div>

                                    <div className="col-span-2 flex justify-start">
                                        <button
                                            type="submit"
                                            className="bg-orange-500 text-white text-xs font-medium py-4 px-4 rounded-md hover:bg-orange-600"
                                        >
                                            Update Info
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        {activeTab === "security" && (
                            <>
                                <h3 className="text-lg font-medium mb-4">Security Settings</h3>
                                <form className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="currentPassword" className="block text-sm font-medium mb-4 mt-4">
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            className="border rounded-lg p-4 w-full bg-gray-50"
                                            placeholder="Enter current password"
                                            style={{ outline: "none" }}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="newPassword" className="block text-sm font-medium mb-4 mt-4">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            className="border rounded-lg p-4 w-full bg-gray-50"
                                            placeholder="Enter new password"
                                            style={{ outline: "none" }}
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-4 mt-4">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            className="border rounded-lg p-4 w-full bg-gray-50"
                                            placeholder="Confirm new password"
                                            style={{ outline: "none" }}
                                        />
                                    </div>

                                    <div className="col-span-2 flex justify-start">
                                        <button
                                            type="submit"
                                            className="bg-orange-500 text-white text-xs font-medium py-4 px-4 rounded-md hover:bg-orange-600"
                                        >
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setting;
