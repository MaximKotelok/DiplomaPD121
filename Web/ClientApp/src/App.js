import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./AppRoutes";
// import { Layout } from './layouts/UserLayout/Layout';
import "./custom.css";
import { setupLocation } from "./utils/Location";
// import LayoutProvider from "./layouts/LayoutProvider";
// import LayoutAdmin from "./components/pages/Admin/LayoutAdmin";
import "./styles/variables.css";
import "./styles/global.css";
import { ToastContainer } from "react-toastify";
import { Home } from "./components/User/Pages/Home/Home";
import { Layout } from "./layouts/UserLayout/Layout";
import AuthPageComponent from "./components/Auth/AuthPageComponent";
import Cart from "./components/User/Pages/Cart/Cart";
import Profile from "./components/User/Pages/Profile/Profile";
import Status404 from "./components/StatusesPage/Status404";
import ConfirmEmail from "./components/Auth/ConfirmEmailComponent/ConfirmEmail";
import TableComponent from "./components/Admin/Admin/ZayavkaComponents/TableComponent/TableComponent";
import { Map } from "./components/User/Pages/Map/Map";
import { Details } from "./components/User/Pages/Details/Details";
import { Category } from "./components/User/Pages/Category/Category";
import RegistrationForm from "./components/Auth/RegistrationFormComponent/RegistrationForm";
import LoginForm from "./components/Auth/LoginFormComponent/LoginForm";
import LayoutProvider from "./layouts/LayoutProvider";
import LayoutAdmin from "./layouts/AdminLayout/LayoutAdmin";
import MyPharmacies from "./components/User/Pages/Profile/Components/MyPharmaciesComponent/MyPharmacies";
import MineBookeds from "./components/User/Pages/Profile/Components/MineBookedsComponent/MineBookedsComponent";
import SelectedProducts from "./components/User/Pages/Profile/Components/SelectedProductsComponent/SelectedProducts";
import WathcList from "./components/User/Pages/Profile/Components/WathcListComponent/WathcList";
import UpsertBrandComponent from "./components/Admin/Brand/AddBrandComponents/UpsertBrandComponent/UpsertBrandComponent";
import UpsertPharmaCompanyComponent from "./components/Admin/PharmaCompany/AddPharmaCompanyComponents/UpsertPharmaCompanyComponent/UpsertPharmaCompanyComponent";
import UpsertPharmacyComponent from "./components/Admin/Pharmacy/AddPharmacyComponents/UpsertPharmacyComponent/UpsertPharmacyComponent";
import { UpsertProduct } from "./utils/Constants";
import { Reservation } from "./components/User/Pages/Reservation/Reservation";
import UpsertProductComponent from "./components/Admin/Pharmacy/AddProductComponents/UpsertProductComponent/UpsertProductComponent";

// export default class App extends Component {
// static displayName = App.name;

/* async componentDidMount() {
   await setupLocation();
 }*/
export default class App extends Component {

    async componentDidMount() {
        await setupLocation();
    }
   

  render() {
    return (
        <LayoutProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index path="" element={<Home />} />
              <Route index path="/ReservationConfirm/:pharmacyId" element={<Reservation />} />
              <Route path="auth/*" element={<AuthPageComponent />}>
                <Route path="registration" element={<RegistrationForm />} />
                <Route path="login" element={<LoginForm />} />
                <Route path="" element={<LoginForm />} />
              </Route>

              <Route path="cart" element={<Cart />} />
              <Route path="profile/*" element={<Profile />}>
                <Route path="mypharmacies" element={<MyPharmacies />} />
                <Route path="minebookeds" element={<MineBookeds />} />
                <Route path="selectedproducts" element={<SelectedProducts />} />
                <Route path="wathclist" element={<WathcList />} />
              </Route>
            <Route path="confirm-email" element={<ConfirmEmail />} />
              <Route path="map/:id?" element={<Map />} />
              <Route path="map/pharmacies/:pharmacyId" element={<Map />} />
              <Route path="map/pharmacies" element={<Map />} />
              <Route path="product-details/:id" element={<Details />} />
              <Route path="category/:id" element={<Category />} />
              <Route path="category/:id/:currentPage" element={<Category />} />
              <Route path="*" element={<Status404 />} />
            </Route>

            <Route path="admin" element={<LayoutAdmin />}>
              <Route path="" element={<Home />} />
              <Route path="zayavka" element={<TableComponent />} />
              <Route path="updateProduct/:productId" element={<UpsertProductComponent />} />
              <Route path="addProduct" element={<UpsertProductComponent />} />
              <Route path="addBrand" element={<UpsertBrandComponent />} />
              <Route path="updateBrand/:brandId" element={<UpsertBrandComponent />} />
              <Route path="addPharmaCompany" element={<UpsertPharmaCompanyComponent />} />
              <Route path="updatePharmaCompany/:companyId" element={<UpsertPharmaCompanyComponent />} />    
              <Route path="addPharmacy" element={<UpsertPharmacyComponent />} />
              <Route path="updatePharmacy/:pharmacyId" element={<UpsertPharmacyComponent />} /> 
            </Route>
          </Routes>
        </LayoutProvider>
    );
  }
}
//
//   <Routes>
//     {AppRoutes.map((route, index) => {
//       const { element, Layout, ...rest } = route;

//       const RenderedElement = Layout ? (
//         <Layout>{element}</Layout>
//       ) : (
//         element
//       );

//       return <Route key={index} {...rest} element={RenderedElement} />;
//     })}
//   </Routes>
// </LayoutProvider>
//     );
//   }
// }
