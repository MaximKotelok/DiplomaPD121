import { GetGroupById, GetGroupsForProductAdd } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getGroupById(localTypeId) {
    return await getFromServer(GetGroupById, { id: localTypeId })
} 
export async function getFirstNGroupByTitle(title, n) {
    return await getFromServer(GetGroupsForProductAdd, { title: title, count: n })
} 
 
