import { Button } from "@material-tailwind/react";

const CartSummary = () => {
    return (
        <>
            <div className="w-full flex flex-col gap-2 py-4 rounded-lg bg-white">
                <div className="flex flex-col px-4 gap-4">
                    <h1 className="text-lg font-semibold mb-6 mt-4 uppercase">CART Summary</h1>
                </div>
                <div className="w-full h-[1px] -mt-4 border border-[1.5px]" />
                <div className="w-full flex flex-col px-4 gap-10">
                    <div className="w-full flex justify-between items-center">
                        <div className="w-full flex">
                            <span className="text-sm text-[rgba(178,178,178,1)]">Item’s Total (7)</span>
                        </div>
                       <div className="w-full flex justify-end">
                        <span className="text-sm text-[rgba(178,178,178,1)]"> ₦75,5090,000 </span>
                        </div>
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <div className="w-full flex">
                            <span className="text-sm text-[rgba(178,178,178,1)]">VAT %</span>
                        </div>
                        <div className="w-full flex justify-end">
                            <span className="text-sm text-[rgba(178,178,178,1)]"> 10.00 </span>
                        </div>
                    </div>
                </div>

                <div className="w-full h-[1px] mt-1 border border-[1.5px]" />

                <div className="flex justify-center mt-2 w-full">
                    <Button className="w-3/4 py-3 px-4 flex justify-center gap-2 bg-kuduOrange text-white rounded-lg font-[500] transition-colors">
                        <span className="text-sm font-[500] normal-case">Checkout ₦75,5090,000</span>
                    </Button>
                </div>
            </div>
        </>
    )
};

export default CartSummary;