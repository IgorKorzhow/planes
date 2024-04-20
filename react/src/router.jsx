import {createBrowserRouter, Navigate} from "react-router-dom";
import AuthorizedLayout from "./layouts/AuthorizedLayout.jsx";
import UnauthorizedLayout from "./layouts/UnauthorizedLayout.jsx";
import Flights from "./pages/Flights/Flights.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateFlight from "./pages/Flights/CreateFlight.jsx";
import UpdateFlight from "./pages/Flights/UpdateFlight.jsx";
import Planes from "./pages/Planes/Planes.jsx";
import CreatePlane from "./pages/Planes/CreatePlane.jsx";
import UserInfo from "./pages/UserInfo.jsx";
import Tickets from "./pages/Tickets.jsx";
import UpdatePlane from "./pages/Planes/UpdatePlane.jsx";
import ChartBoughtTickets from "./pages/ChartBoughtTickets.jsx";
import ShowPlane from "./pages/Planes/ShowPlane.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <UnauthorizedLayout />,
        children: [
            {
                path: '/',
                element: <Flights />
            },
            {
                path: '/planes',
                element: <Planes />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register/>
            },
        ]
    },
    {
        path: '/',
        element: <AuthorizedLayout />,
        children: [
            {
                path: '/user-info',
                element: <UserInfo />
            },
            {
                path: '/flights/create',
                element: <CreateFlight />
            },
            {
                path: '/flights/update/:id',
                element: <UpdateFlight />
            },
            {
                path: '/planes',
                element: <Planes />
            },
            {
                path: '/planes/create',
                element: <CreatePlane />
            },
            {
                path: '/planes/update/:id',
                element: <UpdatePlane />
            },
            {
                path: '/planes/show/:id',
                element: <ShowPlane />
            },
            {
                path: '/tickets',
                element: <Tickets />
            },
            {
                path: '/tickets/statistics',
                element: <ChartBoughtTickets />
            }
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    },
]);

export default router;
