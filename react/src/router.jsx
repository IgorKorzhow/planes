import {createBrowserRouter, Navigate} from "react-router-dom";
import AuthorizedLayout from "./layouts/AuthorizedLayout.jsx";
import UnauthorizedLayout from "./layouts/UnauthorizedLayout.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Main from "./pages/Main.jsx";
import Exercises from "./pages/Exercises/Exercises.jsx";
import CreateExercise from "./pages/Exercises/CreateExercise.jsx";
import Programs from "./pages/Programs/Programs.jsx";
import CreateProgram from "./pages/Programs/CreateProgram.jsx";
import CreateCompletedExercise from "./pages/Results/CreateCompletedExercise.jsx";
import Results from "./pages/Results/Results.jsx";
import Progress from "./pages/Progress.jsx";
import ShowExercise from "./pages/Exercises/ShowExercise.jsx";
import ShowProgram from "./pages/Programs/ShowProgram.jsx";
import UpdateProgram from "./pages/Programs/UpdateProgram.jsx";
import UpdateExercise from "./pages/Exercises/UpdateExercise.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <UnauthorizedLayout />,
        children: [
            {
                path: '/',
                element: <Main />
            },
            {
                path: '/exercises',
                element: <Exercises />
            },
            {
                path: '/exercises/:id',
                element: <ShowExercise />
            },
            {
                path: '/programs',
                element: <Programs />
            },
            {
                path: '/programs/:id',
                element: <ShowProgram />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: '/',
        element: <AuthorizedLayout />,
        children: [
            {
                path: '/exercises',
                element: <Exercises />
            },
            {
                path: '/exercises/create',
                element: <CreateExercise />
            },
            {
                path: '/exercises/update/:id',
                element: <UpdateExercise />
            },
            {
                path: '/programs',
                element: <Programs />
            },
            {
                path: '/programs/create',
                element: <CreateProgram />
            },
            {
                path: '/programs/update/:id',
                element: <UpdateProgram />
            },
            {
                path: '/progress',
                element: <Progress />
            },
            {
                path: '/results/createCompletedExercise',
                element: <CreateCompletedExercise />
            },
            {
                path: '/results',
                element: <Results />
            },
        ]
    },
    {
        path: '*',
        element: <Navigate to="/" />
    },
]);

export default router;
