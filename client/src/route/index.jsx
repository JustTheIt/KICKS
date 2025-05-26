import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword";
import UserMenuMobile from "../pages/UserMenuMobile";
import Dashboard from "../layouts/Dashboard";
import Profile from "../pages/Profile";
import MyOrders from "../pages/MyOrders";
import Address from "../pages/Address";
import CategoryPage from "../pages/CategoryPage";
import SubCategoryPage from "../pages/SubCategoryPage";
import UploadProduct from "../pages/UploadProduct";
import ProductAdmin from "../pages/ProductAdmin";
import AdminPermision from "../layouts/AdminPermision";
import ProductListPage from "../pages/ProductListPage";
import ProductDisplayPage from "../pages/ProductDisplayPage";
import CartMobile from "../pages/CartMobile";
import CheckoutPage from "../pages/CheckoutPage";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderManagement from "../pages/OrderManagement";
import UserManagement from "../pages/UserManagement";
import About from "../pages/info/About";
import Benefits from "../pages/info/Benefits";
import Quality from "../pages/info/Quality";
import Contact from "../pages/info/Contact";
import Shipping from "../pages/info/Shipping";
import Return from "../pages/info/Return";
import FAQ from "../pages/info/FAQ";
import Privacy from "../pages/info/Privacy";
import Product from "../pages/Product";
import ScrollToTop from "../components/ScrollToTop";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "products",
                element: <Product />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "benefits",
                element: <Benefits />
            },
            {
                path: "quality",
                element: <Quality />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "shipping",
                element: <Shipping />
            },
            {
                path: "returns",
                element: <Return />
            },
            {
                path: "faq",
                element: <FAQ />
            },
            {
                path: "privacy",
                element: <Privacy />
            },
            {
                path: "user",
                element: <UserMenuMobile />
            },
            {
                path: "dashboard",
                element: <Dashboard />,
                children: [
                    {
                        path: "profile",
                        element: <Profile />
                    },
                    {
                        path: "myorders",
                        element: <MyOrders />
                    },
                    {
                        path: "address",
                        element: <Address />
                    },
                    {
                        path: 'category',
                        element: <AdminPermision><CategoryPage/></AdminPermision>
                    },
                    {
                        path: "subcategory",
                        element: <AdminPermision><SubCategoryPage/></AdminPermision>
                    },
                    {
                        path: 'upload-product',
                        element: <AdminPermision><UploadProduct/></AdminPermision>
                    },
                    {
                        path: 'product',
                        element: <AdminPermision><ProductAdmin/></AdminPermision>
                    },
                    {
                        path: 'user-management',
                        element: <AdminPermision><UserManagement/></AdminPermision>
                    },
                    {
                        path: "order-management",
                        element: <AdminPermision><OrderManagement/></AdminPermision>
                    },
                ]
            },
            {
                path: ":category",
                children: [
                    {
                        path: ":subCategory",
                        element: <ProductListPage />
                    }
                ]
            },
            {
                path: "product/:product",
                element: <ProductDisplayPage />
            },
            {
                path: 'cart',
                element: <CartMobile />
            },
            {
                path: "checkout",
                element: <CheckoutPage />
            },
            {
                path: "success",
                element: <Success />
            },
            {
                path: 'cancel',
                element: <Cancel />
            }
        ]
    },
    {
        path: "/login",
        element: <AuthLayout />,
        children: [
            {
                path: "",
                element: <Login />
            }
        ]
    },
    {
        path: "/register",
        element: <AuthLayout />,
        children: [
            {
                path: "",
                element: <Register />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "verification-otp",
                element: <OtpVerification />
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            }
        ]
    }
]);

export default router;