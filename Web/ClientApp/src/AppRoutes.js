import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/pages/Home/Home";
import { Details } from "./components/pages/Details/Details";
import RegistrationForm from "./components/Auth/RegistrationForm";
import LoginForm from "./components/Auth/LoginForm";
import ConfirmEmail from "./components/Auth/ConfirmEmail";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
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
        path: '/confirm-email',
        element: <ConfirmEmail />
    }
];

export default AppRoutes;
