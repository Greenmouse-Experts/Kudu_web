import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const NotificationItem = ({isRead=false}) => {
  return (
    <div className={`flex items-start p-4 cursor-pointer rounded-lg ${ isRead ? "bg-white" : "bg-[#cf5a1c4d]"}`}>
      <div>
        <img
          src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1737497178/kuduMart/kudum_2_c8qm7a.png"
          alt="logo"
          className="w-16"
        />
      </div>
      <div className="flex-1 ml-4">
        <div>
          <p className="font-medium">Kudumart Admin</p>
          <p className="text-gray-600">
            A message has been sent to you from the admin. Hello daniel...
          </p>
        </div>
      </div>
      <div>
        <div className=" bg-gray-700 w-10 h-10 rounded-full flex items-center  justify-center">
          <RiDeleteBin5Line />
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
