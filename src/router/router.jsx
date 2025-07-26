import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import DashboardLayout from "../layouts/DashboardLayout";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout
,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    },
    {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      // protected dashboard routes
    ],
  },
]);


export default router;
