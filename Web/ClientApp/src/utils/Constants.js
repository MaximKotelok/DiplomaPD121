export const Success = 'Success';
export const ServerURL = 'https://localhost:7133';
export const ApiPath = `${ServerURL}/api`;
export const PhotoPath = `${ApiPath}/Photo`;
export const GetSupInfoForProductInYourCity = 'ConcreteProduct/GetSupInfoForProductInYourCity';
export const RecentlyViewedListName = "RecentlyViewedList";
export const GetAllProductsFromIdArray = "Product/GetAllProductsFromIdArray";
export const GetAllManufacturers = "Manufacturer/GetAllManufacturers";
export const GetMainCategories = "Category/Main/All";
export const GetRecomendedBrands = "Brand/GetRecomendedBrands";
export const GetAllBrands = "Brand/GetAllBrands";
export const GetRecomendedCategory = "Category/GetRecomendedCategory";
export const PathToCategory = "Category/PathToCategory";
export const GetRecomendedCategoryById = "Category/GetRecomendedCategoryById";

// Product Add
export const GetCategoriesForProductAdd = "Category/GetCategoriesForProductAdd";
export const GetGroupsForProductAdd = "ProductAttributeGroup/GetGroupsForProductAdd";

export const GetGroupById = "ProductAttributeGroup/get";
export const UpsertProduct = "Product/UpsertProduct";
export const GetProduct = "Product/GetById";

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
    UPDATE: 'update'
};