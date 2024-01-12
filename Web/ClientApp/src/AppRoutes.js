import { Home } from "./components/pages/Home/Home";
import { Details } from "./components/pages/Details/Details";
import { Map } from "./components/pages/Map/Map";
import RegistrationForm from "./components/Auth/RegistrationForm";
import LoginForm from "./components/Auth/LoginForm";

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
    }
  
];

export default AppRoutes;
