import { GetAllCountries} from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getAllCountries() {
    return await getFromServer(GetAllCountries)
} 
