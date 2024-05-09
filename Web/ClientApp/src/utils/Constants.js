export const Success = 'Success';
export const ServerURL = 'https://localhost:7133';
export const ApiPath = `${ServerURL}/api`;
export const PhotoPath = `${ApiPath}/Photo`;
export const UserPath = `${ApiPath}/User`;
export const GetSupInfoForProductInYourCity = 'ConcreteProduct/GetSupInfoForProductInYourCity';
export const RecentlyViewedListName = "RecentlyViewedList";
export const GetAllProductsFromIdArray = "Product/GetAllProductsFromIdArray";
export const GetAllManufacturers = "Manufacturer/GetAllManufacturers";
export const GetMainCategories = "Category/Main/All";
export const GetRecomendedBrands = "Brand/GetRecomendedBrands";
export const PathToCategory = "Category/PathToCategory";


export const EXT_GOOGLE =  ApiPath + "/userauthentication/external-login/google";
export const EXT_FACEBOOK = ApiPath + "/userauthentication/external-login/facebook";

export const itemsPerPageForAdmin = 6;

// Product
export const GetCategoriesForProductAdd = "Category/GetCategoriesForProductAdd";
export const GetGroupsForProductAdd = "ProductAttributeGroup/GetGroupsForProductAdd";

export const GetGroupById = "ProductAttributeGroup/get";
export const UpsertProduct = "Product/UpsertProduct";
export const GetProduct = "Product/GetById";
export const GetProductForPharmacy = "Product/GetForPharmacyById";
export const GetTopOffers = "Product/GetTopOffers";

// Brand
export const GetAllBrands = "Brand/GetAllBrands";
export const GetBrandById = "Brand/GetBrandById";
export const UpsertBrand = "Brand/UpsertBrand";

//Country
export const GetAllCountries = "Country/GetAllCountries";

//City
export const GetAllCities = "City/";
export const DefualtCity = "Львів";

//Company
export const GetAllPharmaCompanies = "PharmaCompany/GetAllPharmaCompanies";
export const GetPharmaCompanyById = "PharmaCompany/GetPharmaCompanyById";
export const UpsertPharmaCompany = "PharmaCompany/UpsertPharmaCompany";

//Pharmacy
export const GetAllPharmacies = "Pharmacy/";
export const GetPharmacyById = "Pharmacy/";
export const GetListOfPharmacyInYourCity = "Pharmacy/GetListOfPharmacyInYourCity";
export const GetAllConcreteProductsFromPharmacy = "Pharmacy/GetAllConcreteProductsFromPharmacy";
export const UpsertPharmcy = "Pharmacy/UpsertPharmacy";
export const GetPharmacyProduct = "Pharmacy/GetPharmacyProduct"

//Favoutire LocalStorages
export const FavouriteProducts = "favsProducts";
export const FavouritePharmacies = "favsPharmacies";

//Fav Product
export const GetFavoriteProducts = "User/getFavoriteProducts";
export const AddFavouriteProduct = "User/addFavouriteProduct/";
export const RemoveFavouriteProduct = "User/removeFavouriteProduct/";


//Fav Pharmacy
export const GetFavoritePharmacies = "User/getFavoritePharmacies";
export const GetFavoritePharmaciesWithSupInfo = "User/getFavoritePharmaciesWithSupInfo";
export const AddFavouritePharmacy = "User/addFavouritePharmacy/";
export const RemoveFavouritePharmacy = "User/removeFavouritePharmacy/";


export const ClassHeader = {
    Accept: "application/json",
    "Content-Type": "application/json",
}
export const FileHeader = {
    'Content-Type': 'multipart/form-data'
}

export const StateInfos = {
    LOADING: 'loading',
    ERROR: 'error',
    LOADED: 'LOADED',
    CHOOSE_TYPE_AND_CATEGORY: "choose-type-and-category"
};

export const LayoutProviderValues = {
    MAP: 'map',
    ADD: 'add',
    UPDATE: 'update',
    DISABLE_FOOTER: 'disable-footer'
};
export const Role_Admin = "адміністратор"
export const Role_PharmaCompany = "представник компанії"
export const Role_Pharmacist = "фармацевт"



export const STANDART_IMG = "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png";
// export const STANDART_IMG = "../";