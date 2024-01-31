import { GetAllManufacturers } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getAllManufacturers() {
    return await getFromServer(GetAllManufacturers)
} 
 
