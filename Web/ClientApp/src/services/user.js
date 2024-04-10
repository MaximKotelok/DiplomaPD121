import { GetAllBrands, GetRecomendedBrands, Success } from "../utils/Constants";
import { getToken } from "../utils/Login";
import { postToServer, getFromServer} from "../utils/Queries";

export function checkIsAuth() {
    return (getToken() && true);
} 

export async function getMyInfo() {
    return await getFromServer("User/getMyInfo");
} 

export async function getAllUsers(page, search = "") {
    return await postToServer("User/getAllUsers", {itemsPerPage: 6, page: page, search: search});
} 

export async function banOrUnban(userId, status) {
    if(status)
    return await postToServer(`User/ban/${userId}`);
    else
    return await postToServer(`User/unban/${userId}`);
} 

export async function updateUser(data) {
    return await postToServer("User/updateUser", data);
} 

export async function changePassword(data) {
    return await postToServer("User/changePassword", data);
} 

