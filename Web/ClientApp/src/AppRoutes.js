import { Home } from "./components/User/Pages/Home/Home";
import { Details } from "./components/User/Pages/Details/Details";
import { Map } from "./components/User/Pages/Map/Map";

import AddProductComponent from "./components/Admin/Pharmacy/AddProductComponents/UpsertProductComponent/UpsertProductComponent";

import { Layout } from "./layouts/UserLayout/Layout";
import LayoutAdmin from "./layouts/AdminLayout/LayoutAdmin";
import AuthPageComponent from "./components/Auth/AuthPageComponent";
import Status404 from "./components/StatusesPage/Status404";
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
        path: '/AddProduct/:categoryId/:typeId',
        element: <AddProductComponent  />,
    },
    {
        path: '/UpdateProduct/:productId',
        element: <AddProductComponent />,
    },
    {
        path: '/404',
        element: <Status404 />,
        Layout: Layout
    },  
    {
        path: '*',
        element: <Status404 />,
        Layout: Layout
    }

];

export default AppRoutes;
