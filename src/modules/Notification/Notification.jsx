import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import NotificationList from "./components/NotificationList";
import NotificationItem from "./components/NotificationItem";

const Notification = () => {
  return (
    <section className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full bg-white pt-40">
      {/* <div className="flex gap-5 border-b border-black overflow-hidden">
        <div className="border px-4 rounded-md py-3 border-black border-b-white border-b rounded-br-none rounded-bl-none">
          <p>All Notifications</p>
        </div>
        <div className="">
          <p>Unread</p>
        </div>
      </div> */}
      <Tabs>
        <TabList>
          <Tab>All Notifications</Tab>
          <Tab>Unread</Tab>
        </TabList>

        <TabPanel>
          <NotificationList />
        </TabPanel>
        <TabPanel>
          <div className="gap-4 flex flex-col mt-5">
            <NotificationItem isRead={false} />
            <NotificationItem isRead={false} />
          </div>
        </TabPanel>
      </Tabs>
    </section>
  );
};

export default Notification;
