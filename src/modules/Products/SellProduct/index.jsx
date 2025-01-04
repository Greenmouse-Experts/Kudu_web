import { useState } from "react";
import { City, Country, State } from "country-state-city";
import SelectInput from "../../../components/SelectInput";
import Dropzone from "../../../components/DropZone";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function PostProduct() {
    const options = [
        { label: "Vehicles", value: "vehicles" },
        { label: "Phones & Tablet", value: "2" },
        { label: "Electronics", value: "3" },
        { label: "Health & Beauty", value: "3" },
        { label: "Home and Office", value: "3" },
        { label: "Properties", value: "3" },
        { label: "Fashion", value: "3" },
        { label: "Sports", value: "3" },
        { label: "Pets", value: "3" },
        { label: "Services", value: "3" },
        { label: "Computing", value: "3" },
        { label: "Baby Products", value: "3" },
        { label: "Gaming", value: "3" },
    ];

    const handleSelect = (option) => {
        console.log("Selected option:", option);
    };

    const [files, setFiles] = useState([]);

    const handleDrop = (acceptedFiles) => {
        const newFiles = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const handleCountryChange = (country) => {
        setSelectedCountry(country);
        setSelectedState(null);
        setCities([]);
        setStates(State.getStatesOfCountry(country.value));
    };

    const handleStateChange = (state) => {
        setSelectedState(state);
        setCities(City.getCitiesOfState(selectedCountry.value, state.value));
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


                            <div className="w-full bg-white shadow rounded-md shadow-md py-4 flex justify-center">
                                <div className="md:w-[70%] w-full flex flex-col md:py-7 md:px-0 py-3 px-3 gap-7">
                                    <SelectInput options={options} onSelect={handleSelect} placeholder="Category" />
                                    <SelectInput options={countries.map((country) => ({
                                        value: country.isoCode,
                                        label: country.name,
                                    }))}
                                        onSelect={(state) => handleCountryChange(state)}
                                        placeholder="Select Country"
                                    />
                                    <SelectInput options={states.map((state) => ({
                                        value: state.isoCode,
                                        label: state.name,
                                    }))}
                                        onSelect={(state) => handleStateChange(state)}
                                        placeholder="Select State"
                                    />
                                    <SelectInput options={cities.map((city) => ({
                                        value: city.isoCode,
                                        label: city.name,
                                    }))}
                                        onSelect={(state) => setSelectedCity(state)}
                                        placeholder="Select City"
                                    />
                                    <div className="w-full flex flex-col gap-2">
                                        <p className="text-base font-semibold">
                                            Add photo
                                        </p>
                                        <p className="text-sm text-kuduRomanSilver">
                                            Upload high-quality images to showcase your product. Clear and well-lit photos help attract buyers
                                            and give a detailed view of what you’re offering. Make sure to include multiple angles to give customers a complete look!
                                        </p>
                                        <div className="w-full flex flex-col mt-3">
                                            <Dropzone onDrop={handleDrop} />
                                            <div className="grid grid-cols-3 gap-4 mt-4">
                                                {files.map((fileObj, index) => (
                                                    <div key={index} className="relative">
                                                        <img
                                                            src={fileObj.preview}
                                                            alt="preview"
                                                            className="w-full h-24 object-cover rounded"
                                                        />
                                                        <p className="text-xs mt-1 text-center text-gray-600">{fileObj.file.name}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full flex">
                                        <Button
                                            type="submit"
                                            className="w-full py-4 px-4 flex justify-center gap-2 bg-kuduOrange text-white rounded-lg transition-colors"
                                        >
                                            <Link to={'/sell-product/productdetails'} className="w-full justify-center flex">
                                                <span className='flex'>
                                                    Next
                                                </span>
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}