import { GetAllCities } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getAllCities() {
    return await getFromServer(GetAllCities)
} 
