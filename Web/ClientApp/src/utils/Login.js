export function setToken(token){
    localStorage.setItem('authToken', token);               
}
export function getToken(){
    return localStorage.getItem('authToken');
}

export function removeToken(){
    return localStorage.removeItem('authToken');
}