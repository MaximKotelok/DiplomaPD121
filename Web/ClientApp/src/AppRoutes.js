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
import ChooseATypeComponent from "./components/AddProductComponents/ChooseATypeComponent/ChooseATypeComponent";
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
        Layout: LayoutPharma
    },
    {
        path: '/ChooseAType/:categoryId',
        element: <ChooseATypeComponent />,
        Layout: LayoutPharma
    },
    {
        path: '/AddProduct/:categoryId/:typeId',
        element: <AddProductComponent  />,
        Layout: LayoutPharma
    },
    {
        path: '/UpdateProduct/:productId',
        element: <AddProductComponent />,
        Layout: LayoutPharma
    },
    {
        path: '/confirm-email',
        element: <ConfirmEmail />,
        Layout: Layout
    }

];

export default AppRoutes;
