import { GetAllBrands } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getAllBrands() {
    return await getFromServer(GetAllBrands)
} 
 
