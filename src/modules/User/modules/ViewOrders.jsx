import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import useApiMutation from "../../../api/hooks/useApiMutation";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import Loader from "../../../components/Loader";
import { dateFormat } from "../../../helpers/dateHelper";

const OrderDetails = () => {
      const {
          register,
          handleSubmit,
          setValue,
          getValues,
          watch,
          formState: { errors },
      } = useForm();

      const {id} = useParams();

      const [rating, setRating] = useState(0);
      const [orderDetails, setOrderDetails] = useState({});
      const [disabled, setDisabled] = useState(false);
      const [isLoading, setIsLoading] = useState(true);

      const {mutate} = useApiMutation();



      useEffect(() => {
        getOrderDetails();
      }, []);



      const getOrderDetails = () => {
          mutate({
              url: `/user/order/items?orderId=${id}`,
              method: "GET", 
              headers: true,
              hideToast: true,
              onSuccess: (response) => {
                  setOrderDetails(response.data.data);
                  setIsLoading(false);
              },
              onError: (error) => {
                  setIsLoading(false);
              },
          });
      };



      const ratingChanged = (newRating) => {
          setRating(newRating);
      };


      const onSubmit = (data) => {
        setDisabled(true);
          mutate({
              url: "/user/add/review",
              method: "POST",
              headers: true,
              data: {
                  orderId: id,
                  productId: productDetails.id,
                  rating: rating,
                  comment: data.comment
              },
              onSuccess: (response) => {
                setDisabled(false);
              },
              onError: () => {
                setDisabled(false);
              },
          });
      }

  



  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }



  const productDetails = JSON.parse(orderDetails[0].product);


  return (
    <div className=" w-full flex justify-between gap-6">
      <div className="flex-1 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          Order Details
        </h2>

        <div className="mt-4 border-b flex flex-col gap-2 pb-4">
          <p className="text-gray-600">{orderDetails[0].quantity} Item</p>
          <p className="text-gray-600"><span className="mr-1">&#128197;</span> Placed on {dateFormat(orderDetails[0].createdAt, 'dd-MM-yyy')}</p>
          <p className="text-gray-900 font-semibold">Total: {productDetails.store.currency.symbol} {orderDetails[0].price}</p>
        </div>

        <div className="mt-4 p-4 border rounded-lg">
          <h3 className="text-lg font-semibold">ITEMS IN YOUR ORDER</h3>

          <div className="flex">
            <div className="flex items-center mt-4">
              <img
                src={productDetails.image_url}
                alt="Boots"
                className="w-16 h-16 object-cover"
              />
              <div className="ml-4 flex flex-col gap-1">
                <p className="text-gray-800 font-semibold">
                 {productDetails.name}
                </p>
                <p className="text-gray-600">QTY: {orderDetails[0].quantity}</p>
                <p className="text-black font-semibold text-lg">{productDetails.store.currency.symbol} {productDetails.price}</p>
              </div>
            </div>
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
          <Button type="submit" className="bg-kuduOrange text-white px-6 py-2 w-full mt-4 rounded-lg font-semibold">
            Submit
          </Button>

        </form>

      </div>

    </div>
  );
};

export default OrderDetails;
