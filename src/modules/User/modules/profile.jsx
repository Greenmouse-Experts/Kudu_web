import React, { useEffect, useState } from "react";
import useAppState from "../../../hooks/appState";
import { useModal } from "../../../hooks/modal";
import { City, Country, State } from "country-state-city";
import { useForm } from "react-hook-form";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { useDispatch } from "react-redux";
import { setKuduUser } from "../../../reducers/userSlice";
import { useGetSubcriptionsPlanQuery } from "../../../reducers/storeSlice";

const AccountProfile = () => {
    const { user } = useAppState();
    const dispatch = useDispatch();
    const { openModal, closeModal } = useModal();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();

    const [subscriptionPlan, setSubscriptionPlan] = useState([]);

    const { data: subscriptions, refetch } = useGetSubcriptionsPlanQuery({ refetchOnMountOrArgChange: true });


    useEffect(() => {
        if (subscriptions) {
            const activePlan = subscriptions.data.filter(plan => plan.isActiveForVendor);
            setSubscriptionPlan(activePlan);
        }
    }, [subscriptions]);


    const countries = Country.getAllCountries();

    const { mutate } = useApiMutation();

    const handleModal = () => {
        reset();
        let selectedCountry = null;
        let selectedState = null;
        let selectedCity = null;
        let states = [];
        let cities = [];

        const handleCountryChange = (isoCode) => {
            if (!isoCode) return;
            selectedCountry = countries.find((c) => c.isoCode === isoCode);
            selectedState = null;
            selectedCity = null;
            states = State.getStatesOfCountry(selectedCountry.isoCode);
            cities = [];

            // Store the country name
            setValue("country", selectedCountry.name);
            renderModal();
        };

        const handleStateChange = (isoCode) => {
            if (!isoCode || !selectedCountry) return;
            selectedState = states.find((s) => s.isoCode === isoCode);
            selectedCity = null;
            cities = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);

            // Store the state name
            setValue("state", selectedState.name);
            renderModal();
        };

        const handleCityChange = (cityName) => {
            if (!cityName || !selectedState) return;
            selectedCity = cities.find((c) => c.name === cityName);

            // Store the city name
            setValue("city", selectedCity.name);
            renderModal();
        };



        const onSubmit = (formData) => {
            const payload = { firstName: user.firstName, lastName: user.lastName, dateOfBirth: null, gender: null, location: { ...formData } };

            mutate({
                url: "/user/profile/update",
                method: "PUT",
                data: payload,
                headers: true,
                onSuccess: (response) => {
                    dispatch(setKuduUser(response.data.data));
                    closeModal();
                },
                onError: (error) => {
                },
            });

        };



        const renderModal = () => {
            openModal({
                size: "sm",
                content: (
                    <form className="grid grid-cols-2 gap-1" onSubmit={handleSubmit(onSubmit)}>
                        {/* Country Selection */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mt-4">Country</label>
                            <select
                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none text-sm mb-3"
                                onChange={(e) => handleCountryChange(e.target.value)}
                            >
                                <option value="" disabled selected>Tap to Select</option>
                                {countries.map((country) => (
                                    <option key={country.isoCode} value={country.isoCode}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                        </div>

                        {/* State Selection */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mt-4">State</label>
                            <select
                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none text-sm mb-3"
                                onChange={(e) => handleStateChange(e.target.value)}
                                disabled={!selectedCountry}
                            >
                                <option value="" disabled selected>Tap to Select</option>
                                {states.map((state) => (
                                    <option key={state.isoCode} value={state.isoCode}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                        </div>

                        {/* City Selection */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mt-4">City</label>
                            <select
                                className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none text-sm mb-3"
                                onChange={(e) => handleCityChange(e.target.value)}
                                disabled={!selectedState}
                            >
                                <option value="" disabled selected>Tap to Select</option>
                                {cities.map((city) => (
                                    <option key={city.name} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="col-span-2 flex justify-start">
                            <button
                                type="submit"
                                className="bg-kuduOrange text-white text-sm font-medium py-4 px-4 rounded-md hover:bg-orange-600"
                            >
                                Create Shipping Address
                            </button>
                        </div>
                    </form>
                ),
            });
        };

        renderModal();
    };






    const handleViewModal = (plan) => {
        openModal({
            size: "md",
            content: (
                <>
                    <div className="grid grid-cols-2 gap-1 px-4">
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Plan Name</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.name}
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Plan Amount</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.price}
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Plan Validity</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.duration} month(s)
                            </div>
                        </div>
                        <div className="">
                            <label className="block text-sm font-medium mt-4">Product Limit</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.productLimit}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mt-4">Allows Auction</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.allowsAuction ? 'Yes' : 'No'}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mt-4">Auction Product Limit</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.auctionProductLimit}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mt-4">Maximum Number of Ads</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.maxAds}
                            </div>
                        </div>

                        <div className="">
                            <label className="block text-sm font-medium mt-4">Ads duration days</label>
                            <div
                                className="w-full p-2 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-1"
                            >
                                {plan.adsDurationDays}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end w-full mt-5 gap-4">
                        <button
                            onClick={closeModal}
                            className="bg-gray-300 text-black px-4 py-2 font-[500] rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </>
            )
        })
    }









    return (
        <div className="bg-white w-full rounded-lg">
            <h2 className="text-lg font-bold p-6">Profile</h2>
            <div className="w-full h-[1px] border" />

            <div className="grid grid-cols-1 md:grid-cols-2 p-6 gap-4">
                <div className="border rounded-lg">
                    <div className="flex justify-between p-4">
                        <h3 className="text-lg font-semibold mb-2">Account Details</h3>
                    </div>
                    <div className="w-full h-[1px] -mt-3 border" />
                    <div className="flex flex-col gap-2 p-4">
                        <p className="text-base font-semibold">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-gray-500 font-[500]">{user.email}</p>
                    </div>
                </div>

                <div className="border rounded-lg">
                    <div className="flex justify-between p-4">
                        <h3 className="text-lg font-semibold mb-2">Address Book</h3>
                    </div>
                    <div className="w-full h-[1px] -mt-3 border" />
                    <div className="flex flex-col gap-2 p-4">
                        <p className="text-base font-semibold">Your default shipping address:</p>
                        <p className="text-gray-500 font-[500]">{user.location ?
                            typeof user.location === "string" ? `${JSON.parse(user.location).city} ${JSON.parse(user.location).state}, ${JSON.parse(user.location).country}`
                                :
                                `${user.location.city} ${user.location.state}, ${user.location.country}`
                            :
                            'No default shipping address available.'}</p>
                    </div>
                    <div className="p-4">
                        <button className="text-sm text-kuduOrange font-semibold underline" onClick={handleModal}>
                            {user.location ? 'CHANGE DEFAULT ADDRESS' : 'ADD DEFAULT ADDRESS'}
                        </button>
                    </div>
                </div>

                {user.accountType !== "Customer" && (
                    <div className="border rounded-lg">
                        <div className="flex justify-between p-4">
                            <h3 className="text-lg font-semibold mb-2">Subscription Plan</h3>
                        </div>
                        <div className="w-full h-[1px] -mt-3 border" />
                        <div className="flex justify-between gap-2 p-4">
                            <p className="text-gray-500 font-[500]">
                                {subscriptionPlan.length > 0 ? subscriptionPlan[0].name :
                                    'You are currently not subscribed to any of our plans.'
                                }
                            </p>
                            {subscriptionPlan.length > 0 ?
                                <p className="flex">
                                    <span onClick={() => handleViewModal(subscriptionPlan[0])} className="text-underline cursor-pointer text-sm font-semibold text-kuduOrange">View Details</span>
                                </p>
                                :
                                <></>
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AccountProfile;
