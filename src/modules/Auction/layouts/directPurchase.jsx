import { Button } from "@material-tailwind/react";

const DirectPurchase = () => {
    return (
        <div className="max-w-md mx-auto rounded-lg mt-3 bg-[rgba(245,249,253,1)] p-4">
            <p className="text-[13px] font-semibold">
                Do you want to buy this vehicle now for
                ₦3,100,000 USD without an auction?
            </p>
            <div className="flex my-2 gap-2 py-2">
                <Button className="bg-white rounded-md p-2 border border-[rgba(0,0,0,0.1)] text-[rgba(66,133,244,1)] w-full">
                    <span className="text-xs font-semibold normal-case">Make an Offer</span>
                </Button>
                <Button className="bg-[rgba(66,133,244,1)] rounded-md p-2 text-white w-full">
                    <span className="text-xs font-semibold normal-case">
                        Purchase Now
                    </span>
                </Button>
            </div>
        </div>
    )
};
export default DirectPurchase
