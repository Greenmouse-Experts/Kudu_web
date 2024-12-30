import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { Button, Checkbox } from "@material-tailwind/react";

export default function SignUp() {
    return (
        <div className="w-full h-full flex bg-kuduLightBlue">
            <div className="w-1/2 lg:flex md:flex hidden flex-col h-full justify-center fixed">
                <div className="w-full h-full absolute top-0 left-0">
                    <Imgix src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426608/kudu_mart/signUpBg_ekx4hq.png"
                        sizes="100vw" className="w-full h-full" alt="sign-in-bg" />
                </div>
                <div className='w-full flex relative justify-center'>
                    <div className="w-3/4 h-[500px] p-10 rounded-md border flex flex-col gap-8" style={{ backdropFilter: 'blur(15px)', borderColor: 'rgba(255, 255, 255, 0.35)' }}>
                        <p className='text-sm font-[500] text-white'>Welcome to</p>
                        <Link to={'/'}>
                            <Imgix sizes="20vw" src={'https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/kudu1_rarauu.png'} width={80} height={20} alt='kudu-logo' />
                        </Link>
                        <p className='text-sm font-[500] text-white'>Join us today and enjoy exclusive deals, personalized shopping, and faster checkout.</p>
                        <div className='w-full flex justify-center'>
                            <Imgix sizes="20vw" src={'https://res.cloudinary.com/do2kojulq/image/upload/v1735594203/kudu_mart/click_cart_vldfvu.gif'} width={200} height={20} alt='sign-in' />
                        </div>
                        <p className='text-sm font-[500] text-white'>
                            Sign up now and start discovering amazing products tailored just for you! 🎉
                        </p>
                    </div>
                </div>
            </div>
            <div className='lg:w-1/2 md:w-1/2 w-full md:ml-[50%] flex h-full px-10 flex-col bg-kuduLightBlue justify-center'>
                <div className='pt-5 lg:px-20 md:px-20 flex flex-col gap-3'>
                    <p className="text-3xl font-bold mb-6 text-gray-800">Sign Up</p>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            First Name
                        </label>
                        <Input placeholder="Enter first name" background="bg-kuduDarkFade border-transparent" class="px-3 py-3 placeholder-black" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Last Name
                        </label>
                        <Input placeholder="Enter last name" background="bg-kuduDarkFade border-transparent" class="px-3 py-3 placeholder-black" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email address
                        </label>
                        <Input placeholder="Your email address" background="bg-kuduDarkFade border-transparent" class="px-3 py-3 placeholder-black" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <Input appendIcon="https://res.cloudinary.com/do2kojulq/image/upload/v1735426587/kudu_mart/eye-password_yjivzt.png"
                            type="password" background="bg-kuduDarkFade border-transparent" class="px-3 py-3 placeholder-black" placeholder="Password" />
                    </div>
                    <div className="flex justify-start my-2">
                        <div className="flex gap-2">
                            <span className="flex">
                                <Checkbox />
                            </span>
                            <span className="flex flex-col text-sm justify-center">I agree to terms and policies from Kudu</span>
                        </div>
                    </div>
                    <Button
                        className="w-full py-4 px-4 my-2 flex gap-2 justify-center bg-kuduOrange text-white rounded-lg font-[500] transition-colors"
                    >
                        <span className='flex text-sm'>
                            Sign Up
                        </span>
                        <span className='flex mt-1'>
                            <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 6L12 0.226497V11.7735L22 6ZM0 7H13V5H0V7Z" fill="white" />
                            </svg>
                        </span>
                    </Button>

                    <div className='flex gap-4 w-full'>
                        <hr className="w-full flex mt-3" style={{ backgroundColor: 'rgba(141, 141, 141, 1)' }} />
                        <div className="flex text-gray-500">or</div>
                        <hr className="w-full flex mt-3" style={{ backgroundColor: 'rgba(141, 141, 141, 1)' }} />
                    </div>

                    <div className='flex gap-4 w-full'>
                        <Button
                            type="submit"
                            className="w-full bg-transparent border border-black text-black py-3 px-4 my-2 flex justify-center gap-2 rounded-lg font-[500] transition-colors"
                        >
                            <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.3136 13.7623C25.3136 12.7911 25.2332 12.0823 25.0592 11.3474H13.7422V15.7311H20.385C20.2511 16.8205 19.5279 18.4611 17.9207 19.5635L17.8982 19.7103L21.4764 22.4269L21.7243 22.4511C24.0011 20.3905 25.3136 17.3586 25.3136 13.7623Z" fill="#4285F4" />
                                <path d="M13.7415 25.3125C16.9959 25.3125 19.728 24.2625 21.7236 22.4513L17.92 19.5636C16.9022 20.2593 15.536 20.7449 13.7415 20.7449C10.554 20.7449 7.84869 18.6843 6.88431 15.8362L6.74296 15.8479L3.02229 18.6698L2.97363 18.8024C4.95575 22.6612 9.02719 25.3125 13.7415 25.3125Z" fill="#34A853" />
                                <path d="M6.8851 15.8363C6.63064 15.1013 6.48337 14.3138 6.48337 13.5C6.48337 12.6862 6.63064 11.8988 6.87171 11.1638L6.86497 11.0072L3.09766 8.14001L2.97441 8.19747C2.15748 9.79877 1.68872 11.5969 1.68872 13.5C1.68872 15.4031 2.15748 17.2012 2.97441 18.8025L6.8851 15.8363Z" fill="#FBBC05" />
                                <path d="M13.7416 6.25497C16.0049 6.25497 17.5317 7.21309 18.4023 8.01377L21.804 4.75875C19.7148 2.85563 16.996 1.6875 13.7416 1.6875C9.02719 1.6875 4.95576 4.33873 2.97363 8.19745L6.87095 11.1637C7.84872 8.31562 10.554 6.25497 13.7416 6.25497Z" fill="#EB4335" />
                            </svg>
                            <span className='text-base text-dark flex flex-col justify-center mt-[1.5px]'>Continue with Google</span>
                        </Button>
                    </div>
                </div>

                <div className='flex justify-center my-4'>
                    <div className='flex flex-col gap-2'>
                        <p className="text-center">
                            <Link to={'/login'} className="text-kuduOrange flex justify-center gap-2">
                                <span className='flex font-[500] text-sm'>
                                    Sign In
                                </span>
                                <span className='flex flex-col justify-center h-full mt-1'>
                                <svg width="22" height="12" viewBox="0 0 22 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 6L12 0.226497V11.7735L22 6ZM0 7H13V5H0V7Z" fill="rgba(255, 111, 34, 1)" />
                                    </svg>
                                </span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
