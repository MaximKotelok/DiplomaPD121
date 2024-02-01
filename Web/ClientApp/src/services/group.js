import { GetGroupById } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getGroupById(localTypeId) {
    return await getFromServer(GetGroupById, { id: localTypeId })
} 
 
