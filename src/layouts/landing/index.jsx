import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Drawer } from "@material-tailwind/react";
import { useState } from "react";
import SideBar from "./SideBar";

const LandingLayout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <Header openMenu={toggleMenu} />
            <Outlet />
            <Drawer open={isMenuOpen} onClose={toggleMenu} placement="left">
                <SideBar />
            </Drawer>
        </div>
    );
};

export default LandingLayout;