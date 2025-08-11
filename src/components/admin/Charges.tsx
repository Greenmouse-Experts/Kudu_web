export default function Charges() {
  return (
    <div className=" h-full  flex flex-col  gap-2 rounded-lg ">
      <h2 className="text-xl font-semibold  text-gray-800">Set Item Charge</h2>
      <form className="flex flex-col gap-4">
        <div>
          <label
            htmlFor="charge"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Charge
          </label>
          <input
            type="number"
            id="charge"
            name="charge"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter charge amount"
          />
        </div>
        <button
          type="submit"
          className="bg-kuduOrange text-white py-2 px-4 rounded-md hover:bg-kuduOrangeFade transition-colors"
        >
          Save Charge
        </button>
      </form>
    </div>
  );
}
