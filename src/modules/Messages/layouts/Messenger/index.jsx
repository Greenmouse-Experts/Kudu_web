import { Button } from "@material-tailwind/react";
import ChatSideBar from "./sideBar";
import ChatInterface from "./chatBody";
import { useState } from "react";

export default function Messenger() {
    const [selectedInterface, setSelectedInterface] = useState(null);

    const openInterface = (data) => {
        setSelectedInterface(data)
    }
    return (
        <>
            <div className="w-full flex justify-between md:shadow-lg md:py-5 py-3 bg-white px-6 gap-10 rounded-t-md">
                <div className="md:w-[32%] w-full h-full flex justify-between items-center">
                    <span className="md:text-lg text-base font-semibold flex flex-grow">MESSAGES</span>
                    <span className="md:flex hidden">
                        <svg width="25" height="15" viewBox="0 0 29 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.625 18.75V15.6667H28.375V18.75H0.625ZM0.625 11.0417V7.95833H28.375V11.0417H0.625ZM0.625 3.33333V0.25H28.375V3.33333H0.625Z" fill="black" />
                        </svg>
                    </span>
                </div>

                <div className="md:w-[68%] h-full md:flex hidden justify-between items-center">
                    <span className="text-xs font-semibold flex flex-grow">JPH Footwears</span>
                    <span className="flex">
                        <Button className="px-4 rounded-md py-2 bg-[rgba(72,133,237,1)] text-white text-xs font-semibold">Show Contact</Button>
                    </span>
                </div>
            </div>

            <div className="w-full md:flex hidden md:gap-0 gap-4 rounded-md md:max-h-[72vh] h-full">
                <ChatSideBar setOpenedMessage={openInterface} />
                {selectedInterface ?
                    <ChatInterface interfaceData={selectedInterface} />
                    :
                    <></>
                }
            </div>

            {/** MOBILE DEVICES */}
            <div className="w-full flex md:hidden md:gap-0 gap-4 rounded-md md:max-h-[72vh] h-full">
                {selectedInterface ?
                    <ChatInterface interfaceData={selectedInterface} closeInterface={() => setSelectedInterface(null)} />
                    :
                    <ChatSideBar setOpenedMessage={openInterface} />
                }
            </div>
        </>
    )
}