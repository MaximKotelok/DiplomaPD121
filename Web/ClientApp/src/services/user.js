import { GetAllBrands, GetRecomendedBrands, Success, itemsPerPageForAdmin } from "../utils/Constants";
import { getToken } from "../utils/Login";
import { postToServer, getFromServer} from "../utils/Queries";

export function checkIsAuth() {
    return (getToken() && true);
} 

export async function getMyInfo() {
    return await getFromServer("User/getMyInfo");
} 

export async function getAllUsers(page, search = "") {
    return await postToServer("User/getAllUsers", {itemsPerPage: itemsPerPageForAdmin, page: page, search: search});
} 

export async function banOrUnban(userId, status, description) {
    if(status)
    return await postToServer(`User/ban/${userId}`, {description});
    else
    return await postToServer(`User/unban/${userId}`, {description});
} 

export async function updateUser(data) {
    return await postToServer("User/updateUser", data);
} 
export async function updateUserPhoto(newPathToPhoto) {
    return await postToServer("User/updatePhoto", {newPathToPhoto});
} 

export async function changePassword(data) {
    return await postToServer("User/changePassword", data);
} 

