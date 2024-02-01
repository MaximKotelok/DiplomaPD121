import { GetAllBrands, GetRecomendedBrands } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getAllBrands() {
    return await getFromServer(GetAllBrands)
} 
export async function getCountBrands(count) {
    return await getFromServer(GetRecomendedBrands, { count: count })
} 
 

