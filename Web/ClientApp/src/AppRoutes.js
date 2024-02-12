import { Home } from "./components/User/Pages/Home/Home";
import { Details } from "./components/User/Pages/Details/Details";
import { Map } from "./components/User/Pages/Map/Map";

import RegistrationForm from "./components/Auth/RegistrationFormComponent/RegistrationForm";
import LoginForm from "./components/Auth/LoginFormComponent/LoginForm";
import ConfirmEmail from "./components/Auth/ConfirmEmailComponent/ConfirmEmail";

import ChooseACategoryComponent from "./components/Admin/Pharmacy/AddProductComponents/ChooseACategoryComponent/ChooseACategoryComponent";
import ChooseATypeComponent from "./components/Admin/Pharmacy/AddProductComponents/ChooseATypeComponent/ChooseATypeComponent";
import AddProductComponent from "./components/Admin/Pharmacy/AddProductComponents/AddProductComponent/AddProductComponent";

import { Layout } from "./layouts/UserLayout/Layout";
import LayoutAdmin from "./layouts/AdminLayout/LayoutAdmin";
import AuthPageComponent from "./components/Auth/AuthPageComponent";
import TableComponent from "./components/Admin/Admin/ZayavkaComponents/TableComponent/TableComponent";
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
 //Поки що так потім пораджусь з вами але думаю це норм як я зробив
  
        path: '/auth',
        element: <AuthPageComponent />,
        Layout: Layout
    },
    // {
    //     path: '/register',
    //     element: <RegistrationForm />,
    //     Layout: Layout
    // },
    // {
    //     path: '/login',
    //     element: <LoginForm />,
    //     Layout: Layout
    // },
    {
        path: '/ChooseACategory',
        element: <ChooseACategoryComponent />,
        Layout: LayoutAdmin
    },
    {
        path: '/ChooseAType/:categoryId',
        element: <ChooseATypeComponent />,
        Layout: LayoutAdmin
    },
    {
        path: '/AddProduct/:categoryId/:typeId',
        element: <AddProductComponent  />,
        Layout: LayoutAdmin
    },
    {
        path: '/UpdateProduct/:productId',
        element: <AddProductComponent />,
        Layout: LayoutAdmin
    },
    {
        path: '/zayavka',
        element: <TableComponent />,
        Layout: LayoutAdmin
    },
    {
        path: '/confirm-email',
        element: <ConfirmEmail />,
        Layout: Layout
    }

];

export default AppRoutes;
