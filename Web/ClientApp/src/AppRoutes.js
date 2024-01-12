import { Home } from "./components/pages/Home/Home";
import { Details } from "./components/pages/Details/Details";
import { Map } from "./components/pages/Map/Map";

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
  
];

export default AppRoutes;
