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
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest";
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllDonationRequests from "../pages/Dashboard/Admin/AllDonationRequests";
import ContentManagement from "../pages/Dashboard/Admin/ContentManagement";
import Blogs from "../pages/Blogs";
import AddBlog from "../pages/Dashboard/Admin/addBlog";
import SearchPage from "../pages/SearchPage";
import DonationRequestDetails from "../pages/DonationRequestDetails";
import DonationRequests from "../pages/DonationRequests";
import BlogDetails from "../pages/BlogDetails";
import RoleRoute from "../routers/RoleRoute";
import EditBlog from "../pages/Dashboard/Admin/EditBlog";
import FundingPage from "../pages/Dashboard/Funding/FundingPage";
import EditDonationRequest from "../pages/Dashboard/EditDonationRequest";
import ForbiddenPage from "../pages/ForbiddenPage";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout
    ,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "/donation-request",
        element: <DonationRequests />
      },
      {
        path: "/donation-request/:id",
        element: <PrivateRoute><DonationRequestDetails /></PrivateRoute>
      },
      {
        path: "/forbidden",
        element: <ForbiddenPage />
      },
    ],
    errorElement:<NotFound/>
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
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>, 
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest />
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />
      },
      {
        path: "edit-donation-request/:id",
        element: <EditDonationRequest />
      },
      {
        path: "profile",
        element: <UserProfile />
      },
      {
        path: "funding",
        element: <FundingPage />,
      },
      {
        path: "all-users",
        element: <RoleRoute allowedRoles={["admin"]}><AllUsers /></RoleRoute>
      },
      {
        path: "all-blood-donation-request",
        element: <RoleRoute allowedRoles={["admin", "volunteer"]}><AllDonationRequests /></RoleRoute>,
      },
      {
        path: "content-management",
        element: <RoleRoute allowedRoles={["admin", "volunteer"]}><ContentManagement /></RoleRoute>,
      },
      {
        path: "content-management/edit/:id",
        element: <RoleRoute allowedRoles={["admin", "volunteer"]}><EditBlog /></RoleRoute>
      },
      {
        path: "content-management/add-blog",
        element: <RoleRoute allowedRoles={["admin", "volunteer"]}><AddBlog /></RoleRoute>,
      },
    ],
  },
]);


export default router;
