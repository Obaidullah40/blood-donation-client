import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../routers/PrivateRoute";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import UserProfile from "../pages/Dashboard/UserProfile";

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
  element: <PrivateRoute><DashboardLayout /></PrivateRoute>, // if protected
  children: [
    {   index: true, 
        element: <DashboardHome /> },
    {
      path: "create-donation-request",
    //   element: <CreateDonationRequest />
    },
    {
      path: "my-donation-requests",
    //   element: <MyDonationRequests />
    },
    {
      path: "profile",
      element: <UserProfile />
    },
  ],
},
]);


export default router;
