import { GetGroupById, GetGroupsForProductAdd } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getGroupById(localTypeId) {
    return await getFromServer(GetGroupById, { id: localTypeId })
} 
export async function getAllTypes() {
    return await getFromServer(GetGroupsForProductAdd)
} 
 
