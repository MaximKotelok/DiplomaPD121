import { GetCategoriesForProductAdd, PathToCategory } from "../utils/Constants";
import { getFromServer} from "../utils/Queries";

export async function getFirstNCategoryByTitle(title, n) {
    return await getFromServer(GetCategoriesForProductAdd, {title: title, count: n})
} 

export async function getPathToCategory(id) {
    return await getFromServer(PathToCategory, {id:id})
} 
 
