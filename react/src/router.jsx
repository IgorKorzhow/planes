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
            // {
            //     path: '/exercises',
            //     element: <Exercises />
            // },
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
            }
            // {
            //     path: '/programs',
            //     element: <Programs />
            // },
            // {
            //     path: '/programs/create',
            //     element: <CreateProgram />
            // },
            // {
            //     path: '/programs/update/:id',
            //     element: <UpdateProgram />
            // },
            // {
            //     path: '/progress',
            //     element: <Progress />
            // },
            // {
            //     path: '/results/createCompletedExercise',
            //     element: <CreateCompletedExercise />
            // },
            // {
            //     path: '/results',
            //     element: <Results />
            // },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    },
]);

export default router;
