import { ClassHeader, GetCategoriesForProductAdd, GetMainCategories, PathToCategory, Success, itemsPerPageForAdmin } from "../utils/Constants";
import { getFromServer, postToServer, deleteFromServer } from "../utils/Queries";
import { getSupInfo } from "./product";

export async function getAllCategories() {
    return await getFromServer(GetCategoriesForProductAdd)
} 

export async function GetCategoryById(id) {
    return await getFromServer("Category/GetById", {id:id})
} 

export async function GetCategoryByIdForAdmin(id) {
    return await getFromServer("Category/GetByIdForAdmin", { id: id })
}

export async function GetByIdForMenu(id) {
    return await getFromServer("Category/GetByIdForMenu", {id:id})
} 

export async function GetProductsFromCategory(id, count) {
    let data = await getFromServer("Category/GetProductsFromCategory", {id: id, count: count});    
    
    return data;
} 

export async function getAllCategoriesForAdmin(search,page) {
    return await postToServer("Category/GetAllCategoriesForAdmin", {
        itemsPerPage: itemsPerPageForAdmin,
        page: page,
        search
    })
}

export async function getCountOfPagesAllCategoriesForAdmin(search) {
    return await postToServer("Category/GetCountOfPagesAllCategoriesForAdmin", {
        itemsPerPage: itemsPerPageForAdmin,
        search
    })
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

export async function getFirstNItemsOfBottomCategoryById(id, count) {
    return await getFromServer("Category/GetBottomCategoryById", {id:id, count:count})
}

export async function getFirstNItemBottomCategory(typeOfPhoto, count) {
    return await getFromServer("Category/GetBottomCategory", {
        typeOfPhoto: typeOfPhoto,
        count: count,
      });
}

export async function getRecomendedCategory(count) {
    return await getFromServer("Category/GetRecomendedCategories", {
        count: count,
      });
}
 
export async function getFirstNItemMainCategories(count){
    return await getFromServer(GetMainCategories, { count: count })
}

export async function upsertCategory(category) {
    return await postToServer("Category/UpsertCategory", {
        ...category,
    }, ClassHeader)
}
export async function deleteCategory(id) {
    return await deleteFromServer(`Category/DeleteCategory/${id}`, {})
}