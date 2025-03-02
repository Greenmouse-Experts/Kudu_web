import React from "react";
import ReactStars from "react-rating-stars-component";

const OrderDetails = () => {
  return (
    <div className=" w-full flex justify-between gap-6">
      <div className="  p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <span>&larr;</span> Order Details
        </h2>

        <div className="mt-4 border-b pb-4">
          <p className="text-gray-700">
            <strong>Order n° 1187245272</strong>
          </p>
          <p className="text-gray-600">1 Item</p>
          <p className="text-gray-600">Placed on 28-10-2024</p>
          <p className="text-gray-900 font-semibold">Total: ₦19,406</p>
        </div>

        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">ITEMS IN YOUR ORDER</h3>
          <div className="flex items-center space-x-2 mt-2">
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
              DELIVERED
            </span>
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              NON-RETURNABLE
            </span>
          </div>
          <p className="text-gray-700 mt-2 font-semibold">On 07-11</p>

          <div className="flex">
            <div className="flex items-center mt-4">
              <img
                src="/path/to/boot-image.png"
                alt="Boots"
                className="w-16 h-16 object-cover"
              />
              <div className="ml-4">
                <p className="text-gray-800 font-semibold">
                  Steel Toe Waterproof Rubber Safety Rain Boots
                </p>
                <p className="text-gray-600">Size: EU 46</p>
                <p className="text-gray-600">QTY: 1</p>
                <p className="text-black font-semibold text-lg">₦18,506</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-600 flex items-center mt-2">
            <span className="mr-2">&#128197;</span> The return period ended on
            (14-11-2024)
            <a href="#" className="text-blue-600 ml-1">
              Access our Return Policy.
            </a>
          </p>
        </div>

        <div className="mt-4 flex justify-between">
          <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold">
            Buy Again
          </button>
          <a href="#" className="text-orange-600 font-semibold">
            See Status History
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4">
          <div>
            <h3 className="text-lg font-semibold">PAYMENT INFORMATION</h3>
            <p className="text-gray-700">Payment Method</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">DELIVERY INFORMATION</h3>
            <p className="text-gray-700">Delivery Method</p>
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 h-fit flex-1">

        <form
          className="flex flex-col gap-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            id="review"
            name="comment"
            {...register("comment")}
            required
            placeholder="Leave a review"
            className="w-full px-4 py-4 bg-gray-100 border border-gray-100 h-32 resize-none rounded-lg focus:outline-none placeholder-gray-400 text-sm mb-3"
            style={{ outline: "none" }}
          />

          <p>Leave a rating</p>
          <ReactStars count={5} size={25} activeColor={"rgba(255, 111, 34, 1)"} onChange={ratingChanged} value={rating} />
          <Button className="bg-kuduOrange text-white px-6 py-2 w-full mt-4 rounded-lg font-semibold">
            Submit
          </Button>

        </form>

      </div>

    </div>
  );
};

export default OrderDetails;
