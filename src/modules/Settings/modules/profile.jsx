import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { City, Country, State } from "country-state-city";
import useAppState from "../../../hooks/appState";
import useFileUpload from "../../../api/hooks/useFileUpload";
import { setKuduUser } from "../../../reducers/userSlice";
import { useDispatch } from "react-redux";
import useApiMutation from "../../../api/hooks/useApiMutation";

export default function ProfileSettings() {
    const [isLoading, setIsLoading] = useState(false);
    const { mutate } = useApiMutation();
    const { user } = useAppState();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const [profilePicture, setProfilePicture] = useState(
        user.photo ? `${user.photo}` : "https://res.cloudinary.com/do2kojulq/image/upload/v1735426614/kudu_mart/victor-diallo_p03kd2.png"
    );
    const { uploadFiles, isLoadingUpload } = useFileUpload();


    const handlePictureChange = async (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            await uploadFiles(files, (uploadedUrl) => {
                setProfilePicture(uploadedUrl);
                mutate({
                    url: "/user/profile/photo/update",
                    method: "PATCH",
                    data: {photo: uploadedUrl},
                    headers: true,
                    onSuccess: (response) => {
                    },
                    onError: (error) => {
                    },
                });        
            });
        }
    };

    // Extract location details from user object
    const parsedLocation = user.location ? JSON.parse(user.location) : {};

    const [countries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState(
        countries.find((c) => c.name === parsedLocation.country) || null
    );
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    // Load states and cities on component mount
    useEffect(() => {
        if (selectedCountry) {
            const statesData = State.getStatesOfCountry(selectedCountry.isoCode);
            setStates(statesData);
            setSelectedState(statesData.find((s) => s.name === parsedLocation.state) || null);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            const citiesData = City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode);
            setCities(citiesData);
            setSelectedCity(citiesData.find((c) => c.name === parsedLocation.city) || null);
        }
    }, [selectedState]);

    // Handle country change
    const handleCountryChange = (isoCode) => {
        const country = countries.find((c) => c.isoCode === isoCode);
        setSelectedCountry(country);
        setSelectedState(null);
        setSelectedCity(null);
        setStates(State.getStatesOfCountry(isoCode));
        setCities([]);
        setValue("country", country.name);
    };

    // Handle state change
    const handleStateChange = (isoCode) => {
        const state = states.find((s) => s.isoCode === isoCode);
        setSelectedState(state);
        setSelectedCity(null);
        setCities(City.getCitiesOfState(selectedCountry.isoCode, isoCode));
        setValue("state", state.name);
    };

    // Handle city change
    const handleCityChange = (cityName) => {
        const city = cities.find((c) => c.name === cityName);
        setSelectedCity(city);
        setValue("city", city.name);
    };



    const onSubmit = (data) => {
        const payload = { ...data, photo: profilePicture };
        setIsLoading(true);
        mutate({
            url: "/user/profile/update",
            method: "PUT",
            data: payload,
            headers: true,
            onSuccess: (response) => {
                setIsLoading(false);
                dispatch(setKuduUser(response.data.data));
            },
            onError: (error) => {
                setIsLoading(false);
            },
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-1 w-full gap-6">
            <div className="w-full bg-white rounded-lg p-6">
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
                        {isLoadingUpload ? 'Changing Picture' : 'Change Picture'}
                        <input
                            type="file"
                            id="profilePicture"
                            accept="image/*"
                            className="hidden"
                            disabled={isLoadingUpload}
                            onChange={handlePictureChange}
                        />
                    </label>
                </div>

                {/* Form */}
                <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium mb-4 mt-4">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className="border rounded-lg p-4 w-full bg-gray-50"
                            placeholder="Enter first name"
                            value={user.firstName}
                            style={{ outline: "none" }}
                            {...register("firstName")}
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
                            value={user.lastName}
                            style={{ outline: "none" }}
                            {...register("lastName")}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-4 mt-4">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register("email")}
                            value={user.email}
                            className="border rounded-lg p-4 w-full bg-gray-50"
                            placeholder="Enter email address"
                            style={{ outline: "none" }}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-4 mt-4">
                            Gender
                        </label>
                        <select
                            id="country"
                            className="border rounded-lg p-4 w-full bg-gray-50"
                            style={{ outline: "none", }}
                            {...register("gender", { required: "Gender is required" })}
                            value={user.gender}
                            required
                        >
                            <option value="" disabled selected hidden>Tap to Select</option>
                            <option value={'Male'}>
                                Male
                            </option>
                            <option value={'Female'}>
                                Female
                            </option>
                        </select>
                        {errors.gender && (
                            <p className="text-red-500 text-sm">{errors.gender.message}</p>
                        )}
                    </div>            {/* Country Dropdown */}
                    <div>
                        <label className="block text-sm font-medium">Country</label>
                        <select
                            className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg"
                            onChange={(e) => handleCountryChange(e.target.value)}
                            {...register("country")}
                            value={selectedCountry?.isoCode || ""}
                        >
                            <option value="" disabled>Tap to Select</option>
                            {countries.map((country) => (
                                <option key={country.isoCode} value={country.isoCode}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* State Dropdown */}
                    <div>
                        <label className="block text-sm font-medium">State</label>
                        <select
                            className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg"
                            onChange={(e) => handleStateChange(e.target.value)}
                            disabled={!selectedCountry}
                            value={selectedState?.isoCode || ""}
                        >
                            <option value="" disabled>Tap to Select</option>
                            {states.map((state) => (
                                <option key={state.isoCode} value={state.isoCode}>
                                    {state.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* City Dropdown */}
                    <div>
                        <label className="block text-sm font-medium">City</label>
                        <select
                            className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg"
                            onChange={(e) => handleCityChange(e.target.value)}
                            disabled={!selectedState}
                            value={selectedCity?.name || ""}
                        >
                            <option value="" disabled>Tap to Select</option>
                            {cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-span-2 flex justify-start">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="bg-orange-500 text-white text-xs font-medium py-4 px-4 rounded-md hover:bg-orange-600"
                        >
                            Update Info
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
