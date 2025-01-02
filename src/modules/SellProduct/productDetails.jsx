import { Button } from "@material-tailwind/react";
import Input from "../../components/Input";
import SelectInput from "../../components/SelectInput";

export default function ProductDetails() {
    const options = [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
    ];

    const handleSelect = (option) => {
        console.log("Selected option:", option);
    };

    return (
        <>
            <div className="w-full flex flex-col h-full bg-kuduLightBlue">
                <div className="w-full flex flex-col h-full xl:px-80 lg:pl-40 lg:pr-36 md:px-4 py-3 lg:gap-10 md:gap-8 gap-5 bg-kuduLightBlue h-full">
                    <div className="w-full flex flex-col gap-4">
                        <div className="w-full py-3 md:px-28 flex flex-col md:mt-20 mt-14 gap-8">

                            <div className="w-full bg-white shadow rounded-md shadow-md py-4 px-8">
                                <div className="w-full flex justify-between">
                                    <span className="text-base font-semibold">Post an AD on Kudu</span>
                                    <span className="flex mt-[2px]">
                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.7806 8.53063L11.0306 15.2806C10.8899 15.4214 10.699 15.5004 10.5 15.5004C10.301 15.5004 10.1101 15.4214 9.96937 15.2806C9.82864 15.1399 9.74958 14.949 9.74958 14.75C9.74958 14.551 9.82864 14.3601 9.96937 14.2194L15.4397 8.75H0.75C0.551088 8.75 0.360322 8.67098 0.21967 8.53033C0.0790178 8.38968 0 8.19891 0 8C0 7.80109 0.0790178 7.61032 0.21967 7.46967C0.360322 7.32902 0.551088 7.25 0.75 7.25H15.4397L9.96937 1.78063C9.82864 1.6399 9.74958 1.44902 9.74958 1.25C9.74958 1.05098 9.82864 0.860107 9.96937 0.719376C10.1101 0.578646 10.301 0.499584 10.5 0.499584C10.699 0.499584 10.8899 0.578646 11.0306 0.719376L17.7806 7.46938C17.8504 7.53903 17.9057 7.62175 17.9434 7.7128C17.9812 7.80384 18.0006 7.90144 18.0006 8C18.0006 8.09856 17.9812 8.19616 17.9434 8.28721C17.9057 8.37825 17.8504 8.46097 17.7806 8.53063Z" fill="black" />
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="w-full bg-white shadow rounded-md shadow-md py-4 gap-7 flex justify-center">
                                <div className="md:w-[70%] w-full flex flex-col md:py-7 md:px-0 py-3 px-3 gap-7">
                                    <p className="font-semibold text-lg uppercase mt-3">Product Details</p>
                                    <div className="w-full flex-col flex gap-7">
                                        <div className="w-full flex md:flex-row flex-col gap-7">
                                            <SelectInput options={options} onSelect={handleSelect} placeholder="Type" />
                                            <SelectInput options={options} onSelect={handleSelect} placeholder="Brand" />
                                        </div>
                                        <div className="w-full flex md:flex-row flex-col gap-7">
                                            <SelectInput options={options} onSelect={handleSelect} placeholder="Model" />
                                            <SelectInput options={options} onSelect={handleSelect} placeholder="Subtype" />
                                        </div>
                                        <div className="w-full flex md:flex-row flex-col gap-7">
                                            <SelectInput options={options} onSelect={handleSelect} placeholder="Condition" />
                                            <SelectInput options={options} onSelect={handleSelect} placeholder="Color" />
                                        </div>
                                        <div className="w-full">
                                            <Input placeholder="Price" background="bg-white shadow shadow-sm" style={{ borderColor: 'rgba(201, 201, 201, 1)' }} class="px-3 py-3 placeholder-black placeholder:text-base placeholder:font-[500]" />
                                        </div>
                                        <div className="w-full flex md:flex-row flex-col gap-7">
                                            <Input placeholder="Your Phone Number" background="bg-white w-full shadow shadow-sm" style={{ borderColor: 'rgba(201, 201, 201, 1)' }} class="px-3 py-3 placeholder-black placeholder:text-base placeholder:font-[500]" />
                                            <Input placeholder="Name" background="bg-white w-full shadow shadow-sm" style={{ borderColor: 'rgba(201, 201, 201, 1)' }} class="px-3 py-3 placeholder-black placeholder:text-base placeholder:font-[500]" />
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="w-full bg-white shadow rounded-md shadow-md py-4 gap-7 flex justify-center">
                                <div className="md:w-[70%] w-full flex flex-col md:py-7 md:px-0 py-3 px-3 gap-7">
                                    <p className="font-semibold text-lg uppercase mt-3">Delivery</p>
                                    <div className="w-full flex-col flex gap-7">
                                        <div className="w-full">
                                            <Input placeholder="Delivery Name" background="bg-white shadow shadow-sm" style={{ borderColor: 'rgba(201, 201, 201, 1)' }} class="px-3 py-3 placeholder-black placeholder:text-base placeholder:font-[500]" />
                                        </div>
                                        <div className="w-full flex md:flex-row flex-col gap-7">
                                            <SelectInput options={options} onSelect={handleSelect} placeholder="Region" />
                                        </div>
                                        <div className="w-full flex flex-col gap-1">
                                            <p className="text-xs text-kuduRomanSilver">How many days till delivery</p>
                                            <div className="w-full flex md:flex-row flex-col gap-7">
                                                <Input placeholder="From" background="bg-white w-full shadow shadow-sm" style={{ borderColor: 'rgba(201, 201, 201, 1)' }} class="px-3 py-3 placeholder-black placeholder:text-base placeholder:font-[500]" />
                                                <Input placeholder="To" background="bg-white w-full shadow shadow-sm" style={{ borderColor: 'rgba(201, 201, 201, 1)' }} class="px-3 py-3 placeholder-black placeholder:text-base placeholder:font-[500]" />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <SelectInput options={options} onSelect={handleSelect} placeholder="Do you charge fee for delivery" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="w-full bg-white shadow rounded-md shadow-md py-4 gap-7 flex justify-center">
                                <div className="md:w-[70%] w-full flex flex-col md:py-7 md:px-0 py-3 px-3 gap-7">
                                    <Button
                                        type="submit"
                                        className="w-full py-4 px-4 flex justify-center gap-2 bg-kuduOrange text-white rounded-lg transition-colors"
                                    >
                                            <span className='flex'>
                                                Post Product
                                            </span>
                                    </Button>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}