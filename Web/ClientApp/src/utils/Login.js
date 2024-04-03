import { UpsertBrand } from "./Constants";
import { getCookie, setCookie } from "./Cookies";

export function setToken(token){
    setCookie('authToken', token);               
}
export function getToken(){
    return getCookie('authToken');
}

export function removeToken(){
    return setCookie('authToken', "", 0);
}

export function isLogged()
{
    let token = getCookie('authToken');
    if (token !== undefined && token !== "")
        return true;
    return false;
}