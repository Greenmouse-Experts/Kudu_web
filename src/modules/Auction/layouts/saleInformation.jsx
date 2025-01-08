const SalesInformation = () => {
    return (
        <div className="max-w-md mx-auto rounded-lg bg-white p-4 mt-3">
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                <h2 className="text-sm font-semibold">Sales Information</h2>
            </div>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-medium">Sale Name:</span>
                    <span>Minimum Bid</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-medium">Sale Date:</span>
                    <span className="text-sm font-semibold">
                        <p>Thu. Nov 07, 2024</p>
                        <p className="text-xs font-[400]">04:00 PM WAT</p>
                    </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-medium">Last Updated:</span>
                    <span>10/31/2024 3:00 am</span>
                </div>
            </div>
        </div>
    )
};
export default SalesInformation;
