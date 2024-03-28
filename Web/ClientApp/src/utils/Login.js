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