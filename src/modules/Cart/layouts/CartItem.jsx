import React, { useState } from "react";
import useApiMutation from "../../../api/hooks/useApiMutation";

const CartItem = ({ item, removeFromCart, refetch }) => {
    const [disabled, setDisabled] = useState(false);

    let quantity = item.quantity;

    const { mutate } = useApiMutation();

    const handleIncrease = (data) => {
        setDisabled(true)
        mutate({
            url: `/user/cart/update`,
            method: "PUT",
            headers: true,
            data: {
                cartId: item.id,
                quantity: quantity += 1
            },
            onSuccess: (response) => {
                refetch();
                setDisabled(false)
            },
            onError: (error) => {
                setDisabled(false)
            }
        });
    }


    const handleDecrease = (data) => {
        if (quantity > 1) {
            setDisabled(true)
            mutate({
                url: `/user/cart/update`,
                method: "PUT",
                headers: true,
                data: {
                    cartId: item.id,
                    quantity: quantity -= 1
                },
                onSuccess: (response) => {
                    refetch();
                    setDisabled(false)
                },
                onError: (error) => {
                    setDisabled(false)
                }
            });
        }
    }


    return (
        <>
            <div className="flex flex-col gap-4 border-b border-gray-300 py-4">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    {/* Product Image */}
                    <div className="flex md:w-[70%] items-center gap-4">
                        <img
                            src={item.product.image_url}
                            alt={item.product.name}
                            width={100}
                            height={100}
                            className="rounded-md object-cover"
                        />
                        {/* Product Details */}
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-1 w-[full]">
                                <h2 className="font-bold md:text-lg text-base">{item.product.name}</h2>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="py-1 px-2 gap-1 rounded-full flex bg-[rgba(52,168,83,1)] text-white">
                                        <span className="flex mt-[1.5px]">
                                            <svg width="14" height="12" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.8607 6.18026C15.7013 6.20694 15.559 6.29583 15.4652 6.42739C15.3713 6.55896 15.3336 6.72241 15.3602 6.88181C15.4221 7.25133 15.4532 7.62534 15.4532 8.00001C15.4546 9.6409 14.8515 11.2248 13.7591 12.4492C13.0795 11.4644 12.1238 10.7024 11.0123 10.2593C11.6094 9.78902 12.045 9.1444 12.2588 8.41507C12.4725 7.68573 12.4536 6.90793 12.2047 6.18982C11.9559 5.47171 11.4895 4.849 10.8703 4.40827C10.2511 3.96754 9.51003 3.73071 8.75003 3.73071C7.99003 3.73071 7.24892 3.96754 6.62976 4.40827C6.01059 4.849 5.54416 5.47171 5.29532 6.18982C5.04648 6.90793 5.0276 7.68573 5.2413 8.41507C5.45501 9.1444 5.89068 9.78902 6.48772 10.2593C5.37624 10.7024 4.42059 11.4644 3.74097 12.4492C2.88382 11.4833 2.32392 10.2904 2.12859 9.01389C1.93327 7.73737 2.11083 6.43161 2.63993 5.25361C3.16903 4.0756 4.02714 3.07551 5.11108 2.37358C6.19503 1.67165 7.45866 1.29776 8.75003 1.29688C9.12469 1.29682 9.49871 1.32791 9.86823 1.38981C10.0269 1.41485 10.189 1.37622 10.3194 1.28233C10.4497 1.18843 10.5377 1.04687 10.5642 0.888436C10.5907 0.730001 10.5536 0.567507 10.4609 0.436302C10.3682 0.305097 10.2275 0.215795 10.0693 0.187821C8.41445 -0.0905756 6.71391 0.164158 5.21324 0.915243C3.71257 1.66633 2.48943 2.8749 1.72042 4.36646C0.951403 5.85801 0.676307 7.55538 0.934851 9.21347C1.1934 10.8716 1.9722 12.4046 3.15882 13.5912C4.34544 14.7778 5.87847 15.5566 7.53656 15.8152C9.19466 16.0737 10.892 15.7986 12.3836 15.0296C13.8751 14.2606 15.0837 13.0375 15.8348 11.5368C16.5859 10.0361 16.8406 8.33559 16.5622 6.68071C16.5355 6.52132 16.4466 6.37905 16.3151 6.2852C16.1835 6.19135 16.0201 6.1536 15.8607 6.18026ZM6.31253 7.39063C6.31253 6.90854 6.45548 6.43728 6.72332 6.03643C6.99116 5.63559 7.37184 5.32317 7.81724 5.13868C8.26263 4.95419 8.75273 4.90592 9.22556 4.99997C9.69839 5.09402 10.1327 5.32617 10.4736 5.66706C10.8145 6.00795 11.0466 6.44227 11.1407 6.9151C11.2347 7.38793 11.1865 7.87803 11.002 8.32342C10.8175 8.76882 10.5051 9.1495 10.1042 9.41734C9.70339 9.68518 9.23212 9.82813 8.75003 9.82813C8.10356 9.82813 7.48357 9.57133 7.02645 9.11421C6.56933 8.65709 6.31253 8.0371 6.31253 7.39063ZM4.64284 13.294C5.08367 12.6045 5.69097 12.0371 6.40875 11.6441C7.12653 11.2511 7.9317 11.0451 8.75003 11.0451C9.56836 11.0451 10.3735 11.2511 11.0913 11.6441C11.8091 12.0371 12.4164 12.6045 12.8572 13.294C11.6829 14.2072 10.2377 14.7031 8.75003 14.7031C7.26237 14.7031 5.81715 14.2072 4.64284 13.294ZM17.103 1.72802L14.6655 4.16552C14.6089 4.22217 14.5417 4.26712 14.4678 4.29779C14.3938 4.32845 14.3145 4.34424 14.2344 4.34424C14.1543 4.34424 14.075 4.32845 14.001 4.29779C13.9271 4.26712 13.8599 4.22217 13.8033 4.16552L12.5845 2.94677C12.5279 2.89015 12.483 2.82294 12.4524 2.74896C12.4217 2.67499 12.4059 2.5957 12.4059 2.51563C12.4059 2.43556 12.4217 2.35628 12.4524 2.28231C12.483 2.20833 12.5279 2.14112 12.5845 2.0845C12.6989 1.97016 12.8539 1.90592 13.0157 1.90592C13.0957 1.90592 13.175 1.92169 13.249 1.95233C13.323 1.98297 13.3902 2.02788 13.4468 2.0845L14.2344 2.87288L16.2408 0.865751C16.2974 0.809134 16.3646 0.764223 16.4386 0.733582C16.5125 0.702941 16.5918 0.68717 16.6719 0.68717C16.752 0.68717 16.8313 0.702941 16.9052 0.733582C16.9792 0.764223 17.0464 0.809134 17.103 0.865751C17.1597 0.922368 17.2046 0.989582 17.2352 1.06356C17.2658 1.13753 17.2816 1.21681 17.2816 1.29688C17.2816 1.37695 17.2658 1.45624 17.2352 1.53021C17.2046 1.60419 17.1597 1.6714 17.103 1.72802Z" fill="white" />
                                            </svg>
                                        </span>
                                        <span className="text-xs">Verified </span>
                                    </span>
                                </div>
                            </div>
                            <span className="text-[rgba(52,168,83,1)] font-[500] text-sm">{item.stockStatus}</span>
                        </div>
                    </div>

                    {/* Pricing and Quantity */}
                    <div className="flex flex-col items-center gap-4 md:ml-10">
                        <div>
                            <p className="font-bold text-lg text-black">
                                {item.product.store.currency.symbol} {item.product.price.toLocaleString("en-NG", {
                                    style: "currency",
                                    currency: "NGN",
                                })}
                            </p>
                            {/*<p className="line-through text-gray-500 md:text-right">
                                {item.product.discount_price.toLocaleString("en-NG", {
                                    style: "currency",
                                    currency: "NGN",
                                })}
                            </p>*/}
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-between">
                    <div className="flex gap-2 mt-3">
                        {/* Remove Button */}
                        <svg className="mt-2" width="14" height="16" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.9375 3.77655H1.0625C0.847012 3.77655 0.640349 3.86215 0.487976 4.01453C0.335603 4.1669 0.25 4.37356 0.25 4.58905C0.25 4.80454 0.335603 5.0112 0.487976 5.16357C0.640349 5.31595 0.847012 5.40155 1.0625 5.40155H1.875V20.0266C1.875 20.4575 2.0462 20.8709 2.35095 21.1756C2.6557 21.4803 3.06902 21.6516 3.5 21.6516H16.5C16.931 21.6516 17.3443 21.4803 17.649 21.1756C17.9538 20.8709 18.125 20.4575 18.125 20.0266V5.40155H18.9375C19.153 5.40155 19.3597 5.31595 19.512 5.16357C19.6644 5.0112 19.75 4.80454 19.75 4.58905C19.75 4.37356 19.6644 4.1669 19.512 4.01453C19.3597 3.86215 19.153 3.77655 18.9375 3.77655ZM16.5 20.0266H3.5V5.40155H16.5V20.0266ZM5.125 1.33905C5.125 1.12356 5.2106 0.916899 5.36298 0.764526C5.51535 0.612153 5.72201 0.52655 5.9375 0.52655H14.0625C14.278 0.52655 14.4847 0.612153 14.637 0.764526C14.7894 0.916899 14.875 1.12356 14.875 1.33905C14.875 1.55454 14.7894 1.7612 14.637 1.91357C14.4847 2.06595 14.278 2.15155 14.0625 2.15155H5.9375C5.72201 2.15155 5.51535 2.06595 5.36298 1.91357C5.2106 1.7612 5.125 1.55454 5.125 1.33905Z" fill="#FF6F22" />
                        </svg>
                        <button
                            onClick={() => removeFromCart(item)}
                            className="text-kuduOrange mt-2 font-[500] hover:underline text-sm"
                        >
                            REMOVE
                        </button>
                    </div>

                    <div className="flex">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <button
                                disabled={disabled}
                                onClick={() => handleDecrease(item)}
                                className="bg-kuduOrange text-white px-3 py-1 rounded hover:bg-orange-600"
                            >
                                -
                            </button>
                            <span className="px-4 py-1 text-sm font-semibold rounded">
                                {item.quantity}
                            </span>
                            <button
                                disabled={disabled}
                                onClick={() => handleIncrease(item)}
                                className="bg-kuduOrange text-white px-3 py-1 rounded hover:bg-orange-600"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartItem;



