import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
// import { Layout } from './layouts/UserLayout/Layout';
import "./custom.css";
import { setupLocation } from "./utils/Location";
// import LayoutProvider from "./layouts/LayoutProvider";
// import LayoutAdmin from "./components/pages/Admin/LayoutAdmin";
import "./styles/variables.css";
import "./styles/global.css";
// import 'react-international-phone/style.css';
import { ToastContainer } from "react-toastify";
import { Home } from "./components/User/Pages/Home/Home";
import { Layout } from "./layouts/UserLayout/Layout";
import AuthPageComponent from "./components/Auth/AuthPageComponent";
import Cart from "./components/User/Pages/Cart/Cart";
import Profile from "./components/User/Pages/Profile/Profile";
import Status404 from "./components/StatusesPage/Status404";
import ConfirmEmail from "./components/Auth/ConfirmEmailComponent/ConfirmEmail";
import { Map } from "./components/User/Pages/Map/Map";
import { Details } from "./components/User/Pages/Details/Details";
import { Category } from "./components/User/Pages/Category/Category";
import RegistrationForm from "./components/Auth/RegistrationFormComponent/RegistrationForm";
import LoginForm from "./components/Auth/LoginFormComponent/LoginForm";
import LayoutProvider from "./layouts/LayoutProvider";
import MyPharmacies from "./components/User/Pages/Profile/Components/MyPharmaciesComponent/MyPharmacies";
import MineBookeds from "./components/User/Pages/Profile/Components/MineBookedsComponent/MineBookedsComponent";
import SelectedProducts from "./components/User/Pages/Profile/Components/SelectedProductsComponent/SelectedProducts";
import WathcList from "./components/User/Pages/Profile/Components/WathcListComponent/WathcList";
import { UpsertProduct } from "./utils/Constants";
import { Reservation } from "./components/User/Pages/Reservation/Reservation";
import EditProfile from "./components/User/Pages/Profile/Components/EditProfileComponent/EditProfile";
import PharmacyInfo from "./components/User/Pages/PharmacyInfo/PharmacyInfo";
import { LoginLayuotPharmacy } from "./layouts/LoginPharmacy/LoginLayuotPharmacy";
import LayoutAdmin from "./layouts/AdminLayout/LayoutAdmin";
import { UserPharmacy } from "./components/Admin/PAge/UsersPharmacy/UserPharmacy";
import UpsertProductComponent from "./components/Admin/PAge/Pharmacy/AddProductComponents/UpsertProductComponent/UpsertProductComponent";
import UpsertPharmaCompanyComponent from "./components/Admin/PAge/PharmaCompany/AddPharmaCompanyComponents/UpsertPharmaCompanyComponent/UpsertPharmaCompanyComponent";
import UpsertPharmacyComponent from "./components/Admin/PAge/Pharmacy/AddPharmacyComponents/UpsertPharmacyComponent/UpsertPharmacyComponent";
import { SupportChat } from "./components/Admin/PAge/SupportChat/SupportChat";
import SearchComponent from "./components/Common/SearchComponent/SearchComponent";
import { SearchProductPageComponent } from "./components/User/Pages/Search/SearchProductPageComponent";
import { removeToken } from "./utils/Login";
import { ZayavkaComponents } from "./components/Admin/PAge/Admin/ZayavkaComponents/ZayavkaComponents";
import { UsersComponents } from "./components/Admin/PAge/Admin/UsersComponents/UsersComponents";
import { PharmacyListComponents } from "./components/Admin/PAge/Admin/PharmacyListComponents/PharmacyListComponents";
import { ProductListComponents } from "./components/Admin/PAge/Admin/ProductListComponents/ProductListComponents";
import { AddProductPharmacyComponent } from "./components/Admin/PAge/Pharmacy/AddProductComponents/AddProductPharmacyComponent/AddProductPharmacyComponent";
import { OrderListProductComponents } from "./components/Admin/PAge/Pharmacy/OrderListProductComponents/OrderListProductComponents";
import { ProductDetailsAdminComponents } from "./components/Admin/PAge/Admin/ProductDetailsAdminComponents/ProductDetailsAdminComponents";
import { UpsertBrendComponent } from "./components/Admin/PAge/Pharmacy/UpsertBrendComponent/UpsertBrendComponent";
import { AddCategoryComponents } from "./components/Admin/PAge/Pharmacy/AddCategoryComponents/AddCategoryComponents";
import { AttributeListComponents } from "./components/Admin/PAge/Admin/AttributeListComponents/AttributeListComponents";
import { UpsertAttributeComponents } from "./components/Admin/PAge/Admin/UpsertAttributeComponents/UpsertAttributeComponents";
import { ActiveSubstanceListComponents } from "./components/Admin/PAge/Admin/ActiveSubstanceListComponents/ActiveSubstanceListComponents";
import { UpsertActiveSubstanceComponents } from "./components/Admin/PAge/Admin/UpsertActiveSubstanceComponents/UpsertActiveSubstanceComponents";

import { BrandListComponent } from "./components/Admin/PAge/Admin/BrandListComponents/BrandListComponent";
import { DefectiveSeriesComponents } from "./components/Admin/PAge/Admin/DefectiveSeriesComponents/DefectiveSeriesComponents";
import { CategoryListComponents } from "./components/Admin/PAge/Admin/CategoryListComponents/CategoryListComponents";
import { ManufactureListComponents } from "./components/Admin/PAge/Admin/ManufactureListComponents/ManufactureListComponents";
import { ProductConcreatListComponents } from "./components/Admin/PAge/Admin/ProductConcreatListComponents/ProductConcreatListComponents";
import { HomeAdminPageComponents } from "./components/Admin/PAge/HomeAdminPageComponents/HomeAdminPageComponents";
import { ProductInspectionComponents } from "./components/Admin/PAge/Admin/ProductInspectionComponents/ProductInspectionComponents";
import { UpsertManufactureComponent } from "./components/Admin/PAge/Pharmacy/UpsertManufactureComponent/UpsertManufactureComponent";
import { PharmacyListForPharmaCompanyComponent } from "./components/Admin/PAge/PharmaCompany/PharmacyListComponents/PharmacyListComponents";

// export default class App extends Component {
// static displayName = App.name;

/* async componentDidMount() {
   await setupLocation();
 }*/
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationAllowed: false,
            isLoading: true
        };
    }

    async componentDidMount() {
        try {
            await setupLocation(this.handleLocationSetup);
        } finally {
            this.setState({ isLoading: false });
        }

        this.setupAxiosInterceptors();
    }

    setupAxiosInterceptors() {
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response && error.response.status === 401) {
                    removeToken();
                    const currentLocation = (window.location.pathname + window.location.search).substr(1);
                    window.location.replace(`/auth/login?from=/${currentLocation}`);
                }
                return Promise.reject(error);
            }
        );
    }

    handleLocationSetup = () => {
        this.setState({ locationAllowed: true });
    };

    render() {
        const { isLoading, locationAllowed } = this.state;

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (!locationAllowed) {
            return <div>Location not allowed. Please enable location services.</div>;
        }
        return (
            <LayoutProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index path="" element={<Home />} />
                        <Route
                            path="/PharmacyInfo/:pharmacyId"
                            element={<PharmacyInfo />}
                        />
                        <Route
                            path="/ReservationConfirm/:pharmacyId"
                            element={<Reservation />}
                        />
                        <Route
                            path="/Search/ByTitle/:title"
                            element={<SearchProductPageComponent />}
                        />
                        <Route
                            path="/Search/ByTitle/"
                            element={<SearchProductPageComponent />}
                        />
                        <Route
                            path="/Search/ByCategory/:categoryId"
                            element={<SearchProductPageComponent />}
                        />
                        <Route
                            path="/Search/ByBrand/:brandId"
                            element={<SearchProductPageComponent />}
                        />
                        <Route
                            path="/Search/ByActiveSubstance/:activeSubstanceId"
                            element={<SearchProductPageComponent />}
                        />
                        <Route path="res" element={<Reservation />} />
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
                            <Route path="edit" element={<EditProfile />} />
                        </Route>
                        <Route path="confirm-email" element={<ConfirmEmail />} />
                        <Route path="map/:id?" element={<Map />} />
                        <Route path="map/pharmacies/:pharmacyId" element={<Map />} />
                        <Route
                            path="map/pharmacies/:pharmacyId/:companyId"
                            element={<Map />}
                        />
                        <Route path="map/pharmacies" element={<Map />} />
                        <Route path="product-details/:id" element={<Details />} />
                        <Route path="category/:categoryId" element={<Category />} />
                        <Route
                            path="category/:categoryId/:currentPage"
                            element={<Category />}
                        />
                        <Route path="*" element={<Status404 />} />
                    </Route>
                    <Route path="loginPharmacy" element={<LoginLayuotPharmacy />}></Route>

                    <Route path="admin" element={<LayoutAdmin />}>
                        {/*HOME*/}
                        <Route path="homePageAdmin" element={<HomeAdminPageComponents />} />

                        {/*USER*/}
                        <Route path="userList" element={<UsersComponents />} />
                        <Route path="pharmacyUser" element={<UserPharmacy />} />

                        {/*DEFECTIVE SERIES*/}
                        <Route
                            path="defectiveSeriesList"
                            element={<DefectiveSeriesComponents />}
                        />

                        {/*ATTRIBUTE*/}
                        <Route path="attributeList" element={<AttributeListComponents />} />
                        <Route path="attributeList/:paramPage" element={<AttributeListComponents />} />
                        <Route path="addAttribute/" element={<UpsertAttributeComponents />} />
                        <Route
                            path="updateAttribute/:attributeId"
                            element={<UpsertAttributeComponents />}
                        />

                        {/*OFFER*/}
                        <Route path="zayavkaList" element={<ZayavkaComponents />} />
                        <Route
                            path="zayavkaList/:paramPage"
                            element={<ZayavkaComponents />}
                        />

                        {/*ACTIVE SUBVTANCES*/}
                        <Route path="activeSubstanceList" element={<ActiveSubstanceListComponents />} />
                        <Route
                            path="activeSubstanceList/:paramPage"
                            element={<ActiveSubstanceListComponents />}
                        />
                        <Route
                            path="activeSubstance/:id"
                            element={<UpsertActiveSubstanceComponents />}
                        />

                        {/*MANUFACTURER*/}
                        <Route
                            path="manufactureList"
                            element={<ManufactureListComponents />}
                        />
                        <Route
                            path="manufactureList/:paramPage"
                            element={<ManufactureListComponents />}
                        />
                        <Route path="addManufacturer" element={<UpsertManufactureComponent />} />
                        <Route
                            path="updateManufacturer/:manufacturerId"
                            element={<UpsertManufactureComponent />}
                        />

                        {/*BRAND*/}
                        <Route path="brandList" element={<BrandListComponent />} />
                        <Route path="brandList/:id" element={<BrandListComponent />} />
                        <Route path="addBrand" element={<UpsertBrendComponent />} />
                        <Route
                            path="updateBrand/:brandId"
                            element={<UpsertBrendComponent />}
                        />

                        {/*CONCREAT PRODUCT*/}
                        <Route
                            path="productConcreatList"
                            element={<ProductConcreatListComponents />}
                        />

                        {/*PRODUCT*/}
                        <Route path="productList" element={<ProductListComponents />} />
                        <Route
                            path="detailProduct/:productId"
                            element={<ProductDetailsAdminComponents />}
                        />
                        <Route path="addProduct" element={<UpsertProductComponent />} />
                        <Route
                            path="updateProduct/:productId"
                            element={<UpsertProductComponent />}
                        />
                        <Route
                            path="productInspection"
                            element={<ProductInspectionComponents />}
                        />

                        {/*PHARMA COMPANY*/}
                        <Route path="pharmaCompany/pharmacyList" element={<PharmacyListForPharmaCompanyComponent />} />
                        <Route path="pharmaCompany/pharmacyList/:paramPage" element={<PharmacyListForPharmaCompanyComponent />} />
                        <Route
                            path="addPharmaCompany"
                            element={<UpsertPharmaCompanyComponent />}
                        />
                        <Route
                            path="updatePharmaCompany/:companyId"
                            element={<UpsertPharmaCompanyComponent />}
                        />

                        {/*CATEGORY*/}
                        <Route path="categoeyList" element={<CategoryListComponents />} />
                        <Route path="addCategory" element={<AddCategoryComponents />} />


                        {/*PARMACY*/}
                        <Route path="pharmacyList" element={<PharmacyListComponents />} />
                        <Route path="pharmacyList/:paramPage" element={<PharmacyListComponents />} />
                        <Route path="addPharmacy" element={<UpsertPharmacyComponent />} />
                        <Route
                            path="updatePharmacy/:pharmacyId"
                            element={<UpsertPharmacyComponent />}
                        />
                        <Route
                            path="addProductPharmacy"
                            element={<AddProductPharmacyComponent />}
                        />
                        <Route path="orderList" element={<OrderListProductComponents />} />


                        {/*CHAT*/}
                        <Route path="supportChat" element={<SupportChat />} />
                    </Route>
                </Routes>
            </LayoutProvider>
        );
    }
}