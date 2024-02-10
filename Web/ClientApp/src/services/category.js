import { GetCategoriesForProductAdd, GetMainCategories, GetRecomendedCategory, GetRecomendedCategoryById, PathToCategory } from "../utils/Constants";
import { getFromServer} from "../utils/Queries";

export async function getAllCategories(title) {
    return await getFromServer(GetCategoriesForProductAdd)
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
