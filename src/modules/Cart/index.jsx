import React, { useState, useEffect } from "react";
import CartBlock from "./layouts/cartsBlock";
import CartSummary from "./layouts/cartSummary";
import { useSelector, useDispatch } from 'react-redux';
import { getCart, removeFromCart } from '../../reducers/cartSlice';

export default function Cart() {
    const dispatch = useDispatch();
    const { cart } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(getCart());
    }, [dispatch]);

    return (
        <>
            <div className="w-full flex flex-col h-full bg-kuduLightBlue">
                <div className="w-full flex flex-col xl:px-80 lg:pl-44 lg:pr-36 md:px-4 px-3 md:py-0 lg:gap-10 md:gap-8 gap-5 bg-kuduLightBlue h-full">
                    <div className="w-full flex md:flex-row flex-col gap-10 items-start md:my-24 my-20">
                        <div className="md:w-[68%] w-full flex">
                            <CartBlock
                                cart={cart}
                                removeFromCart={removeFromCart}
                            />
                        </div>
                        <div className="md:w-[32%] w-full flex"><CartSummary cart={cart} /></div>
                    </div>
                    {/* <div className="w-full flex flex-col gap-6 items-start my-10">
                        <p className="md:text-xl text-base font-semibold">Your Recently Viewed Products</p>
                    <ProductListing productsArr={productsArr} />
                    </div> */}
                </div>
            </div>
        </>
    )
}