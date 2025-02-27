import React, { useState, useEffect  } from "react";
import { useForm } from 'react-hook-form';
import { useCreateStoreMutation, useEditStoreMutation } from "../../../reducers/storeSlice";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";


const CreateNewStore = ({deliveryOptions, setDeliveryOptions, handleCloseModal, currencies, countries, selectedCountry, setSelectedCountry, xtates, editOrAddstore, stores, storeId}) => {
   
    const [store, setStore] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const [createStore] = useCreateStoreMutation();
    const [editStore] = useEditStoreMutation();

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();

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

    useEffect(() => {
        if(editOrAddstore === "edit"){
            if(stores){
                setStore(stores.data.find((store) => store.id === storeId))
            }
            if(store){
                const locationData = JSON.parse(store.location);
                const BusinessHourData = JSON.parse(store.businessHours);

                setValue("name", store.name);  
                setValue("address", locationData.address);  
                setValue("country", locationData.country);  
                setSelectedCountry(locationData.country);
                setValue("state", locationData.state); 
                setValue("currencyId", store.currencyId); 
                setValue("city", locationData.city);  
                setValue("monday_friday", BusinessHourData.monday_friday);  
                setValue("saturday", BusinessHourData.saturday);  
                setValue("sunday", BusinessHourData.sunday);   
                setValue("tipsOnFinding", store.tipsOnFinding); 
            } 

            if(store){
                const deliveryOptionData = JSON.parse(store.deliveryOptions);
                deliveryOptionData !== null && populateDeliveryOption();

                deliveryOptionData.map((deliveryOption, index) => {
                    setValue(`city${index}`, deliveryOption.city)
                    setValue(`price${index}`, deliveryOption.price)
                    setValue(`arrival_day${index}`, deliveryOption.arrival_day)
            })

                
            }
        }
    }, [editOrAddstore, setValue, store])

    const transformPayload = (input) => {
        var id = editOrAddstore === "edit" ? storeId : ""
        return {
            storeId: id,
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
        setIsLoading(true)
        const { address, monday_friday, city, country, state, saturday, sunday, ...rest } = data;

        const payload = {
            ...rest,
            location: {
                address,
                country,
                state,
                city
            },
            business_hours: {
                monday_friday,
                saturday,
                sunday
            }
        };

        const reformedPayload = transformPayload(payload)

        var submitStore;

        editOrAddstore === "edit" ? submitStore = editStore : submitStore = createStore;
        
        submitStore(reformedPayload)
        .then((res) => {
            // if(res.data.message !== "Store created successfully") throw res
            
            console.log("RESPONSE: ", res)
            toast.success(res.data.message)
            setIsLoading(false)
            handleCloseModal()
        }).catch((error) => {
            console.log("ERROR: ", error)
            // toast.error(error.error.data.message)
            setIsLoading(false)
            handleCloseModal()
        })
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
        <div className="bg-white p-8 rounded-lg w-11/12 h-[95%] max-w-screen-md mx-auto overflow-y-auto scrollbar-none">
            <h2 className="text-lg font-bold mb-4">{editOrAddstore === "edit" ? "Edit Store" : "Create your Store"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-4">
                        Store Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                        placeholder="Enter your store name"
                        style={{ outline: "none", }}
                        {...register("name", { required: "Store name is required" })}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-4">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                        placeholder="Enter your address"
                        style={{ outline: "none", }}
                        {...register("address", { required: "Store address is required" })}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-4">
                        Country
                    </label>
                    <select
                        id="country"
                        className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                        style={{ outline: "none", }}
                        {...register("country", { required: "Country is required" })}
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        required
                    >
                        <option value="" disabled selected hidden>Tap to Select</option>
                        {countries.data.map((count, index) => (
                            <option key={index}>
                                {count.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="state" className="block text-sm font-medium mb-4">
                        State
                    </label>
                    <select
                        id="state"
                        style={{ outline: "none", }}
                        className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                        {...register("state", { required: "State is required" })}
                        required
                    >
                        <option value="" disabled selected hidden>Tap to Select</option>
                        {xtates?.map((xtate, index) => (
                            <option key={index}>
                                {xtate.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="city" className="block text-sm font-medium mb-4">
                        City
                    </label>
                    <input
                        type="text"
                        id="city"
                        className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                        placeholder="Enter your city"
                        style={{ outline: "none", }}
                        {...register("city", { required: "City is required" })}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="businessHours" className="block text-sm font-medium mb-4">
                        Business Hours
                    </label>

                    <div className="flex gap-2">
                        <div className="mb-4">
                            <label htmlFor="monday_friday" className="block text-sm font-medium mb-1">
                                Monday - Friday
                            </label>
                            <input
                                type="text"
                                id="monday_friday"
                                className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                                placeholder="e.g., 9am - 6pm"
                                style={{ outline: "none", }}
                                {...register("monday_friday", { required: "Business Hours are required" })}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="saturday" className="block text-sm font-medium mb-1">
                                Saturday
                            </label>
                            <input
                                type="text"
                                id="saturday"
                                className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                                placeholder="e.g., 9am - 6pm"
                                style={{ outline: "none", }}
                                {...register("saturday", { required: "Business Hours are required" })}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="sunday" className="block text-sm font-medium mb-1">
                                Sunday
                            </label>
                            <input
                                type="text"
                                id="sunday"
                                className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                                placeholder="e.g., 9am - 6pm"
                                style={{ outline: "none", }}
                                {...register("sunday", { required: "Business Hours are required" })}
                                required
                            />
                        </div>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="currency" className="block text-sm font-medium mb-4">
                        Store Currency
                    </label>
                    <select
                        id="currency"
                        className="border rounded p-2 w-full placeholder-gray-400 text-sm"
                        style={{ outline: "none", }}
                        {...register("currencyId", { required: "Currency is required" })}
                        required
                    >
                        <option value="" disabled selected hidden>Tap to Select a currency</option>
                        {currencies?.map((curr) => (
                            <option key={curr.id} value={curr.id}>
                                {curr.name} ({curr.symbol})
                            </option>
                         ))}
                    </select>
                </div>

                <div className='mb-4'>
                    <p className='text-sm font-semibold mb-4 uppercase'>Delivery Options</p>
                    {deliveryOptions.map((deliveryOption, index) => (
                        <div className='grid grid-cols-12 gap-3' key={index}>
                            <div className='col-span-6 gap-1'>
                                <label
                                    className="block text-md font-semibold mb-3"
                                    htmlFor="city"
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    placeholder="Enter delivery city"
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    {...register(`city${index}`, { required: "Delivery City is required" })}
                                    required
                                />
                            </div>

                            <div className='col-span-6 gap-1'>
                                <label
                                    className="block text-md font-semibold mb-3"
                                    htmlFor="price"
                                >
                                    Price
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    placeholder="Enter price"
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    {...register(`price${index}`, { required: "Price is required" })}
                                    required
                                />
                            </div>

                            <div className='col-span-6 gap-1'>
                                <label
                                    className="block text-md font-semibold mb-3"
                                    htmlFor="arrival_day"
                                >
                                    Arrival Day
                                </label>
                                <input
                                    type="text"
                                    id="arrival_day"
                                    placeholder="Enter arrival day"
                                    className="w-full px-4 py-4 bg-gray-100 border border-gray-100 rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
                                    style={{ outline: "none" }}
                                    {...register(`arrival_day${index}`, { required: "Arrival day is required" })}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <span className="bg-kuduOrange mt-2 hover:bg-blue-700 cursor-pointer text-white text-sm  py-2 px-4 rounded"
                        onClick={() => populateDeliveryOption()}>
                        + Add Delivery Option
                    </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-5">
                    <label htmlFor="tipsOnFinding" className="block text-sm font-medium">
                        Tips on Finding Store
                    </label>
                    <textarea
                        id="tipsOnFinding"
                        rows="4"
                        className="border p-2 placeholder-gray-400 text-sm"
                        placeholder="Enter tips to help customers find your store"
                        style={{ outline: "none", }}
                        {...register("tipsOnFinding", { required: "Tips on finding store is required" })}
                        required
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button
                        className="bg-kuduDarkGrey hover:bg-gray-400 text-white text-sm py-2 px-4 rounded mr-2"
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </button>
                    <button className="bg-kuduOrange hover:bg-kuduDarkGrey text-white text-sm py-2 px-4 w-[15%] rounded"
                    >
                        {isLoading ? <PulseLoader color="#ffffff"  size={5}/> : <p>{editOrAddstore === "edit" ? "Update Store" : "Create Store"}</p>}
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default CreateNewStore;