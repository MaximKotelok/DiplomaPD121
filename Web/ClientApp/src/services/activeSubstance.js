import { GetAllCities } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getActiveSubstance(id) {
    return await getFromServer(`ActiveSubstance/GetActiveSubstance/${id}`);
} 

