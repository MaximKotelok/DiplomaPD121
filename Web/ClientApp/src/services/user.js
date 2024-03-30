import { GetAllBrands, GetRecomendedBrands, Success } from "../utils/Constants";
import { getToken } from "../utils/Login";
import { postToServer, getFromServer} from "../utils/Queries";

export function checkIsAuth() {
    return (getToken() && true);
} 

export async function getMyInfo() {
    return await getFromServer("User/getMyInfo");
} 
export async function updateUser(data) {
    return await postToServer("User/updateUser", data);
} 

