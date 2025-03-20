import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Checkbox } from "@material-tailwind/react";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useForm } from "react-hook-form";
import useApiMutation from "../../api/hooks/useApiMutation"
import { auth, provider, signInWithPopup, signOut } from "../../config/firebaseConfig";
import { useDispatch } from "react-redux";
import useAppState from "../../hooks/appState";

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const {ipInfo} = useAppState();

    console.log(ipInfo)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm();

    const { mutate } = useApiMutation();

    const onSubmit = (data) => {
        setIsLoading(true);
        mutate({
            url: "/auth/register/customer",
            method: "POST",
            data: data,
            onSuccess: (response) => {
                localStorage.setItem("kuduEmail", JSON.stringify(data.email));
                navigate('/verify-account');
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };


    const handleSignUpGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const payload = {
                firstName: result.user.providerData[0].displayName.split(" ")[0],
                lastName: result.user.providerData[0].displayName.split(" ")[1],
                email: result.user.providerData[0].email,
                providerId: result.user.providerData[0].providerId,
                accountType: 'Customer'
            }
            setIsLoading(true);
            mutate({
                url: "/auth/google",
                method: "POST",
                data: payload,
                onSuccess: (response) => {
                    localStorage.setItem("kuduUserToken", response.data.data.token);
                    dispatch(setKuduUser(response.data.data));
                    navigate("/profile");
                    setIsLoading(false);
                },
                onError: () => {
                    setIsLoading(false);
                }
            });
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };


    return (
        <div
            className="w-full h-full flex flex-col justify-center items-center okayb"
            style={{
                backgroundImage: `
  url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736942330/Sign_Up_1_og6gq5.jpg
`,
                backgroundBlendMode: "overlay",
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100vh",
            }}
        >

            {/* Form Card */}
            <div className="w-full max-w-screen-md mx-auto px-6 py-6 bg-white/20 backdrop-blur-lg rounded-lg">
                <div className="w-full px-4 py-4 bg-white rounded-lg">
                    {/* Logo Section */}
                    <div className="mb-6 flex justify-center">
                        <Link to={'/'}>
                            <img
                                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1737211689/kuduMart/kudum_1_urk9wm.png"
                                alt="Kudu Logo"
                                sizes="20vw"
                                width={250}
                                height={33}
                            />
                        </Link>
                    </div>
                    <h2 className="text-2xl font-bold mb-6 text-black-800">Sign Up</h2>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        {/* First Name Field */}
                        <div>
                            <label className="block text-md font-semibold mb-3" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                placeholder="Enter First Name"
                                {...register("firstName", { required: "First name is required" })}
                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                            )}
                        </div>

                        {/* Last Name Field */}
                        <div>
                            <label className="block text-md font-semibold mb-3" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Enter Last Name"
                                {...register("lastName", { required: "Last name is required" })}
                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                            )}
                        </div>

                        {/* Phone Number Field */}
                        <div>
                            <label className="block text-md font-semibold mb-3" htmlFor="phone">
                                Phone Number
                            </label>
                            <PhoneInput
                                country={ipInfo.country?.toLowerCase()}
                                inputProps={{
                                    name: "phoneNumber",
                                    required: true,
                                }}
                                onChange={(value) => {
                                    // Ensure `+` is included and validate
                                    if (!value.startsWith("+")) {
                                        value = "+" + value;
                                    }
                                    setValue("phoneNumber", value, { shouldValidate: true });
                                }}
                                containerClass="w-full"
                                dropdownClass="flex flex-col gap-2 text-black font-sans"
                                buttonClass="!bg-gray-100 !border !border-gray-100 hover:!bg-gray-100"
                                inputClass="!w-full px-4 font-sans !h-[54px] !py-4 !bg-gray-100 !border !border-gray-100 !rounded-lg focus:outline-none placeholder-gray-400 !text-sm mb-3"
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm">Phone number is required</p>
                            )}
                        </div>
                        {/* Add hidden input for validation */}
                        <input
                            type="hidden"
                            {...register("phoneNumber", {
                                required: "Phone number is required",
                            })}
                        />
                        {/* Email Field */}
                        <div>
                            <label className="block text-md font-semibold mb-3" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Your email address"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Enter a valid email address",
                                    },
                                })}
                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
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
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters",
                                        },
                                    })}
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
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
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Terms and Conditions Checkbox */}
                        <div className="flex flex-col text-sm md:mt-8">
                            <Checkbox
                                id="terms"
                                {...register("terms", { required: "You must agree to the terms" })}
                                color="orange"
                                label={
                                    <>
                                        <span className="cursor-default">I agree to </span>
                                        <NavLink to={'/terms-condition'} className='underline'>terms and policies</NavLink>
                                        <span className="cursor-default"> from Kudu</span>
                                    </>}
                            />
                            {errors.terms && (
                                <p className="text-red-500 text-sm ml-2">{errors.terms.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 bg-kuduOrange disabled:bg-orange-300 text-white font-semibold rounded-lg hover:bg-orange-600 transition duration-300"
                            >
                                Sign Up →
                            </button>
                        </div>
                    </form>

                    <div className='flex gap-4 w-full mb-4'>
                        <hr className="w-full flex mt-3" style={{ backgroundColor: 'rgba(141, 141, 141, 1)' }} />
                        <div className="flex text-gray-500">or</div>
                        <hr className="w-full flex mt-3" style={{ backgroundColor: 'rgba(141, 141, 141, 1)' }} />
                    </div>

                    <div className="flex flex-row justify-center gap-4 w-full">
                        {/* Google Button */}
                        <Button
                            type="submit"
                            onClick={() => handleSignUpGoogle()}
                            className="md:w-1/2 bg-white border border-gray-300 text-black px-4 flex items-center justify-center gap-2 rounded-lg"
                            style={{ outline: "none", boxShadow: "none" }}
                        >
                            <svg width="20" height="20" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.3136 13.7623C25.3136 12.7911 25.2332 12.0823 25.0592 11.3474H13.7422V15.7311H20.385C20.2511 16.8205 19.5279 18.4611 17.9207 19.5635L17.8982 19.7103L21.4764 22.4269L21.7243 22.4511C24.0011 20.3905 25.3136 17.3586 25.3136 13.7623Z" fill="#4285F4" />
                                <path d="M13.7415 25.3125C16.9959 25.3125 19.728 24.2625 21.7236 22.4513L17.92 19.5636C16.9022 20.2593 15.536 20.7449 13.7415 20.7449C10.554 20.7449 7.84869 18.6843 6.88431 15.8362L6.74296 15.8479L3.02229 18.6698L2.97363 18.8024C4.95575 22.6612 9.02719 25.3125 13.7415 25.3125Z" fill="#34A853" />
                                <path d="M6.8851 15.8363C6.63064 15.1013 6.48337 14.3138 6.48337 13.5C6.48337 12.6862 6.63064 11.8988 6.87171 11.1638L6.86497 11.0072L3.09766 8.14001L2.97441 8.19747C2.15748 9.79877 1.68872 11.5969 1.68872 13.5C1.68872 15.4031 2.15748 17.2012 2.97441 18.8025L6.8851 15.8363Z" fill="#FBBC05" />
                                <path d="M13.7416 6.25497C16.0049 6.25497 17.5317 7.21309 18.4023 8.01377L21.804 4.75875C19.7148 2.85563 16.996 1.6875 13.7416 1.6875C9.02719 1.6875 4.95576 4.33873 2.97363 8.19745L6.87095 11.1637C7.84872 8.31562 10.554 6.25497 13.7416 6.25497Z" fill="#EB4335" />
                            </svg>
                            <span className="text-dark text-sm font-semibold">Continue with Google</span>
                        </Button>
                    </div>


                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600 leading-loose">

                            <Link to={'/login'} className="text-orange-500 font-semibold hover:underline leading-loose">
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
