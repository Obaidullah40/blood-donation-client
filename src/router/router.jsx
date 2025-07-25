import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout
,
        children: [
            {
                index: true,
                Component: Home
            // },
            // {
            //     path: 'register',
            //     Component: Register
            // },
            // {
            //     path: 'signIn',
            //     Component: SignIn
            }
        ]
    },
]);


export default router;
