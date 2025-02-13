import React from "react";
import NotificationItem from "./NotificationItem";

const NotificationList = () => {
  return (
    <div className="gap-4 flex flex-col mt-5">
      <NotificationItem />
      <NotificationItem isRead={true} />
    </div>
  );
};

export default NotificationList;
