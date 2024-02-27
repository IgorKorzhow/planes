import {useStateContext} from "../context/contextProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

function AuthorizedLayout() {

    const {token} = useStateContext();

    if (!token) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default AuthorizedLayout;
