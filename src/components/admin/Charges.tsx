import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../api/apiFactory";

export default function Charges() {
  const mutation = useMutation({
    mutationFn: async () => {
      let resp = await apiClient.post("/admin/product/charges");
      return resp.data;
    },
  });
  const query = useQuery({
    queryKey: ["charges_admin"],
    queryFn: async () => {
      let resp = await apiClient.get("admin/product/charges");
      return resp.data;
    },
  });
  return (
    <div className=" h-full  flex flex-col  gap-2 rounded-lg ">
      <h2 className="text-xl font-semibold  text-gray-800">
        Set Product Charge
      </h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          const form = new FormData(e.target as any);
          let charge = form.get("charge");
        }}
      >
        <div>
          {/*<label
            htmlFor="charge"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Charge
          </label>*/}
          <input
            type="number"
            id="charge"
            name="charge"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter charge amount"
          />
        </div>
        <button
          disabled={mutation.isPending}
          type="submit"
          className="bg-kuduOrange text-white py-2 px-4 rounded-md hover:bg-kuduOrangeFade transition-colors"
        >
          Save Charge
        </button>
      </form>
    </div>
  );
}
