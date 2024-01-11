import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/pages/Home/Home";
import { Details } from "./components/pages/Details/Details";

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
  }
];

export default AppRoutes;
