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
export const GetRecomendedCategory = "Category/GetRecomendedCategory";
export const PathToCategory = "Category/PathToCategory";
export const GetRecomendedCategoryById = "Category/GetRecomendedCategoryById";

// Product
export const GetCategoriesForProductAdd = "Category/GetCategoriesForProductAdd";
export const GetGroupsForProductAdd = "ProductAttributeGroup/GetGroupsForProductAdd";

export const GetGroupById = "ProductAttributeGroup/get";
export const UpsertProduct = "Product/UpsertProduct";
export const GetProduct = "Product/GetById";


// Brand
export const GetAllBrands = "Brand/GetAllBrands";
export const GetBrandById = "Brand/GetBrandById";
export const UpsertBrand = "Brand/UpsertBrand";

//Country
export const GetAllCountries = "Country/GetAllCountries";

//Company
export const GetAllPharmaCompanies = "PharmaCompany/GetAllPharmaCompanies";
export const GetPharmaCompanyById = "PharmaCompany/GetPharmaCompanyById";
export const UpsertPharmaCompany = "PharmaCompany/UpsertPharmaCompany";


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
    LOADED: 'LOADED'
};

export const LayoutProviderValues = {
    MAP: 'map',
    ADD: 'add',
    UPDATE: 'update',
    DISABLE_FOOTER: 'disable-footer'
};