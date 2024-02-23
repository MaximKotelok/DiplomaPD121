import { Home } from "./components/User/Pages/Home/Home";
import { Details } from "./components/User/Pages/Details/Details";
import { Map } from "./components/User/Pages/Map/Map";

import RegistrationForm from "./components/Auth/RegistrationFormComponent/RegistrationForm";
import LoginForm from "./components/Auth/LoginFormComponent/LoginForm";
import ConfirmEmail from "./components/Auth/ConfirmEmailComponent/ConfirmEmail";

import ChooseACategoryComponent from "./components/Admin/Pharmacy/AddProductComponents/ChooseACategoryComponent/ChooseACategoryComponent";
import ChooseATypeComponent from "./components/Admin/Pharmacy/AddProductComponents/ChooseATypeComponent/ChooseATypeComponent";
import AddProductComponent from "./components/Admin/Pharmacy/AddProductComponents/UpsertProductComponent/UpsertProductComponent";

import { Layout } from "./layouts/UserLayout/Layout";
import LayoutAdmin from "./layouts/AdminLayout/LayoutAdmin";
import AuthPageComponent from "./components/Auth/AuthPageComponent";
import Status404 from "./components/StatusesPage/Status404";
import { Category } from "./components/User/Pages/Category/Category";
import TableComponent from "./components/Admin/Admin/ZayavkaComponents/TableComponent/TableComponent";
import Cart from "./components/User/Pages/Cart/Cart";
import Profile from "./components/User/Pages/Profile/Profile";
const AppRoutes = [
  {
    index: true,
    element: <Home />,
    Layout: Layout,
  },
  ///Cart
  {
    path: "/cart",
    element: <Cart />,
    Layout: Layout,
  },

  //// Profile
  //   {
  //     path: "/зrofile",
  //     element: <Profile/>,
  //     Layout: Layout,
  //   },

  {
    path: "/map/:id?",
    element: <Map />,
    Layout: Layout,
  },
  {
    path: "/product-details/:id",
    element: <Details />,
    Layout: Layout,
  },
  {
    //Поки що так потім пораджусь з вами але думаю це норм як я зробив
    path: "/auth",
    element: <AuthPageComponent />,
    Layout: Layout,
  },

  {
    path: "/profile",
    element: <Profile />,
    Layout: Layout,
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
    path: "/ChooseACategory",
    element: <ChooseACategoryComponent />,
    Layout: LayoutAdmin,
  },
  {
    path: "/category/:id",
    element: <Category />,
    Layout: Layout,
  },
  {
    path: "/category/:id/:currentPage",
    element: <Category />,
    Layout: Layout,
  },
  {
    path: "/ChooseAType/:categoryId",
    element: <ChooseATypeComponent />,
    Layout: LayoutAdmin,
  },
  {
    path: "/AddProduct/:categoryId/:typeId",
    element: <AddProductComponent />,
    Layout: LayoutAdmin,
  },
  {
    path: "/UpdateProduct/:productId",
    element: <AddProductComponent />,
    Layout: LayoutAdmin,
  },
  {
    path: "/404",
    element: <Status404 />,
    Layout: Layout,
  },
  {
    element: <TableComponent />,
    path: "/zayavka",
    Layout: LayoutAdmin,
  },
  {
    path: "/confirm-email",
    element: <ConfirmEmail />,
    Layout: Layout,
  },
  {
    path: "*",
    element: <Status404 />,
    Layout: Layout,
  },
];

export default AppRoutes;
