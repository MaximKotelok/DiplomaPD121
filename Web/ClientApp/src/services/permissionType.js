import { GetAllManufacturers } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getAllPermissions() {
    return await getFromServer("PermissionType/GetAllPermissions")
} 
 
