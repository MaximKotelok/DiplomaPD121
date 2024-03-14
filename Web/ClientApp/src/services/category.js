import { ClassHeader, GetCategoriesForProductAdd, GetMainCategories, GetRecomendedCategory, GetRecomendedCategoryById, PathToCategory, Success } from "../utils/Constants";
import { getFromServer} from "../utils/Queries";
import { getSupInfo } from "./product";

export async function getAllCategories(title) {
    return await getFromServer(GetCategoriesForProductAdd)
} 

export async function GetCategoryById(id) {
    return await getFromServer("Category/GetById", {id:id})
} 

export async function GetByIdForMenu(id) {
    return await getFromServer("Category/GetByIdForMenu", {id:id})
} 

export async function GetProductsFromCategory(id, count) {
    let data = await getFromServer("Category/GetProductsFromCategory", {id: id, count: count});    
    
    return data;
} 


export async function GetWithProducts(id, from, to, count) {
    let data = await getFromServer("Category/GetWithProducts", {id: id, from: from, to: to, count: count})
    
    return data;
} 
export async function IsCategoryHasProducts(id) {
    let data = await getFromServer("Category/IsCategoryHasProducts", {id: id})
    
    return data;
} 

export async function GetCategoryProductsForFilter(id, from, to) {
    let data = await getFromServer("Category/GetCategoryProductsForFilter", {id: id, from: from, to: to}, ClassHeader)
    
    return data;
} 

export async function getPathToCategory(id) {
    return await getFromServer(PathToCategory, {id:id})
}

export async function getFirstNItemsOfRecomendedCategoryById(id, count) {
    return await getFromServer(GetRecomendedCategoryById, {id:id, count:count})
}

export async function getFirstNItemRecomendedCategoryByPhoto(typeOfPhoto, count) {
    return await getFromServer(GetRecomendedCategory, {
        typeOfPhoto: typeOfPhoto,
        count: count,
      });
}
 
export async function getFirstNItemMainCategories(count){
    return await getFromServer(GetMainCategories, { count: count })
}
