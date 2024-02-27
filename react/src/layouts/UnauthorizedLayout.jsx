import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function UnauthorizedLayout() {

    return (
        <>
            <Navbar />
            <Outlet/>
        </>
    );
}

export default UnauthorizedLayout;
