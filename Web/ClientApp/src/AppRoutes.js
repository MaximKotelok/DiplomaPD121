import { Home } from "./components/pages/Home/Home";
import { Details } from "./components/pages/Details/Details";
import { Map } from "./components/pages/Map/Map";
import RegistrationForm from "./components/Auth/RegistrationForm";
import LoginForm from "./components/Auth/LoginForm";
import ChooseACategoryComponent from "./components/AddProductComponents/ChooseACategoryComponent/ChooseACategoryComponent";
import AddProductComponent from "./components/AddProductComponents/AddProductComponent/AddProductComponent";
const AppRoutes = [
  {
    index: true,
    element: <Home />
   },
   {
     path: '/map/:id?',
     element: <Map />
   },
  {
    path: '/product-details/:id',
    element: <Details />
    },
    {
        path: '/register',
        element: <RegistrationForm />
    },
    {
        path: '/login',
        element: <LoginForm />
    },
    {
        path: '/ChooseACategory',
        element: <ChooseACategoryComponent />
    },
    {
        path: '/AddProduct/:typeId',
        element: <AddProductComponent />
    },
    {
        path: '/UpdateProduct/:productId',
        element: <AddProductComponent />
    }
  
];

export default AppRoutes;
