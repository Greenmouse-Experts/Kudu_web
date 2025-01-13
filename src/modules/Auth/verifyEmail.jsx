import Imgix from "react-imgix";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { Button } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import useApiMutation from "../../api/hooks/useApiMutation";

export default function VerifyEmail() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { mutate } = useApiMutation();

    const emailData = localStorage.getItem("email");

    const verifyEmail = (data) => {
        const payload = { ...data, email: JSON.parse(emailData) };
        setIsLoading(true)
        mutate({
            url: "/auth/verify/email",
            method: "POST",
            data: payload,
            onSuccess: (response) => {
                navigate("/login")
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };


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
                    <form onSubmit={handleSubmit(verifyEmail)} className="flex flex-col gap-4">
                        <p className="text-3xl font-bold mb-6 text-gray-800">Verify Email</p>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2" htmlFor="email">
                                OTP
                            </label>
                            <Input name="otpCode" register={register}
                                rules={{ required: 'OTP is required' }} errors={errors} placeholder="Enter otp sent to your registered email "
                                background="bg-kuduDarkFade border-transparent" />
                        </div>
                        <Button
                            type="submit"
                            className="w-full py-3 px-4 mt-2 mb-8 flex gap-2 justify-center bg-kuduOrange text-white rounded-lg font-[500] transition-colors"
                        >
                            <span className='flex text-sm'>
                                Verify Email
                            </span>
                        </Button>
                    </form>
                </div>

                {/*<div className='flex justify-center my-4'>
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
                </div>*/}
            </div>
        </div>
    );
}
