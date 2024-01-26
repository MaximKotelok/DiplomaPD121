import { Home } from "./components/pages/Home/Home";
import { Details } from "./components/pages/Details/Details";
import { Map } from "./components/pages/Map/Map";
import RegistrationForm from "./components/Auth/RegistrationForm";
import LoginForm from "./components/Auth/LoginForm";
import ChooseACategoryComponent from "./components/AddProductComponents/ChooseACategoryComponent/ChooseACategoryComponent";
import ConfirmEmail from "./components/Auth/ConfirmEmail";

import AddProductComponent from "./components/AddProductComponents/AddProductComponent/AddProductComponent";
import { Layout } from "./components/Layout";
import LayoutAdmin from "./components/pages/Admin/LayoutAdmin";
import LayoutPharma from "./components/pages/Pharma/LayoutPharma";
const AppRoutes = [
    {
        index: true,
        element: <Home />,
        Layout: Layout
    },
    {
        path: '/map/:id?',
        element: <Map />,
        Layout: Layout
    },
    {
        path: '/product-details/:id',
        element: <Details />,
        Layout: Layout
    },
    {
        path: '/register',
        element: <RegistrationForm />,
        Layout: Layout
    },
    {
        path: '/login',
        element: <LoginForm />,
        Layout: Layout
    },
    {
        path: '/ChooseACategory',
        element: <ChooseACategoryComponent />,
        Layout: Layout
    },
    {
        path: '/AddProduct/:typeId',
        element: <AddProductComponent  />,
        Layout: LayoutPharma,
        layoutProps: { title: "Details Page" } 
    },
    {
        path: '/UpdateProduct/:productId',
        element: <AddProductComponent />,
        Layout: LayoutPharma,
        layoutProps: { title: "Details Page" } 
    },
    {
        path: '/confirm-email',
        element: <ConfirmEmail />,
        Layout: Layout
    }

];

export default AppRoutes;
