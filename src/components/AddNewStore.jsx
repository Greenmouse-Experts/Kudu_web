import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { City, Country, State } from "country-state-city";
import useApiMutation from '../api/hooks/useApiMutation';
import { useNavigate } from 'react-router-dom';

const AddNewStore = () => {
    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [currencies, setCurrencies] = useState([]);
    const [deliveryOptions, setDeliveryOptions] = useState([]);

    const { mutate } = useApiMutation();
    const navigate = useNavigate();

    const handleCountryChange = (country) => {
        const parsedCountry = JSON.parse(country);
        setSelectedCountry(parsedCountry);
        setSelectedState(null);
        setCities([]);
        setStates(State.getStatesOfCountry(parsedCountry.isoCode));
    };

    const handleStateChange = (state) => {
        const parsedState = JSON.parse(state);
        setSelectedState(parsedState);
        setCities(City.getCitiesOfState(selectedCountry.isoCode, parsedState.isoCode));
    };

    const handleCityChange = (state) => {
        const parsedCity = JSON.parse(state);
        setSelectedCity(parsedCity)
    }


    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm();


    const transformPayload = (input) => {
        return {
            currencyId: input.currencyId,
            name: input.name,
            location: {
                address: input.location.address,
                city: input.location.city,
                state: input.location.state,
                country: input.location.country,
            },
            businessHours: {
                monday_friday: input.business_hours.monday_friday,
                saturday: input.business_hours.saturday,
                sunday: input.business_hours.sunday,
            },
            deliveryOptions: Object.keys(input)
                .filter((key) => key.startsWith("city"))
                .map((key) => {
                    const index = key.match(/\d+/)[0]; // Extract the number from the key
                    return {
                        city: input[`city${index}`],
                        price: Number(input[`price${index}`]),
                        arrival_day: input[`arrival_day${index}`],
                    };
                }),
            tipsOnFinding: input.tipsOnFinding,
            logo: "",
        };
    }


    const onSubmit = (data) => {
        const { address, monday_friday, city, country, state, saturday, sunday, ...rest } = data;

        const payload = {
            ...rest,
            location: {
                address,
                country: selectedCountry?.name,
                state: selectedState?.name,
                city: selectedCity?.name
            },
            business_hours: {
                monday_friday,
                saturday,
                sunday
            }
        };

        const reformedPayload = transformPayload(payload)

        mutate({
            url: '/admin/store',
            method: 'POST',
            data: reformedPayload,
            headers: true,
            onSuccess: (response) => {
                navigate(-1)
            },
            onError: () => {
                closeModal();
            }
        });
    }


    const getCurrency = () => {
        mutate({
            url: `/admin/currencies`,
            method: "GET",
            headers: true,
            hideToast: true,
            onSuccess: (response) => {
                setCurrencies(response.data.data);
            },
            onError: () => {
            }
        });
    }


    useEffect(() => {
        getCurrency()
    }, []);



    const populateDeliveryOption = () => {
        setDeliveryOptions((prevOptions) => [
            ...prevOptions,
            {
                city: null,
                price: null,
                arrival_day: null
            }
        ]);
    };

    return (
        <div className='All'>
            <div className="rounded-md pb-2 w-full gap-5">
                <h2 className="text-lg font-semibold text-black-700 mt-4 mb-4">Add New Store</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-2 bg-white rounded-lg p-6">
                    <div className="grid grid-cols-1 gap-6 mb-4">
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Store Name
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                placeholder="Enter store name"
                                style={{ outline: "none" }}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Store Address
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                placeholder="Enter your store address"
                                style={{ outline: "none" }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                State
                            </label>
                            <select
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                style={{ outline: "none" }}
                            >
                                <option value="">Choose the state </option>
                                <option value="Lagos">Lagos</option>
                                <option value="Ibadan">Ibadan</option>
                                <option value="Ogun">Ogun</option>
                            </select>

                        </div>
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Country
                            </label>
                            <select
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                style={{ outline: "none" }}
                            >
                                <option value="">Choose the Country </option>
                                <option value="Lagos">Lagos</option>
                                <option value="Ibadan">Ibadan</option>
                                <option value="Ogun">Ogun</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mb-4">
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Tips for finding store
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                placeholder="Enter tips to find your store "
                                style={{ outline: "none" }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Store Currency
                            </label>
                            <select
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-5"
                                style={{ outline: "none" }}
                            >
                                <option value="">Select store currency </option>
                                <option value="Lagos">Lagos</option>
                                <option value="Ibadan">Ibadan</option>
                                <option value="Ogun">Ogun</option>
                            </select>

                        </div>
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Country
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                placeholder="Enter your business hours"
                                style={{ outline: "none" }}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6 mb-4">
                        <div>
                            <label
                                htmlFor="storeName"
                                className="block text-sm font-medium text-gray-700 mb-4"
                            >
                                Delivery Option
                            </label>
                            <input
                                type="text"
                                className="border rounded-lg p-4 w-full bg-gray-50 mb-4"
                                placeholder="Add delivery options"
                                style={{ outline: "none" }}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-kuduDarkGrey hover:bg-gray-400 text-white text-sm py-2 px-4 rounded mr-2"
                        >
                            Cancel
                        </button>
                        <button className="bg-kuduOrange hover:bg-kuduDarkGrey text-white text-sm py-2 px-4 rounded">
                            Create New Store
                        </button>
                    </div>
                </div>

            </div>

        </div>

    );
};

export default AddNewStore;
