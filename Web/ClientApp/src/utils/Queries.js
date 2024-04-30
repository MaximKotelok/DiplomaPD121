import axios from "axios";
import { ApiPath, GetSupInfoForProductInYourCity,Success } from "./Constants";
import { getToken } from "./Login";

export async function postToServer(url, data, headers) {
    try {
        const response = await axios.post(
            `${ApiPath}/${url}`,
            data,
            {
                headers: { ...headers, Authorization: 'Bearer ' + getToken() },
            }
        );
                
        return { status: 'Success', data: response.data };
        
    } catch (error) {
        console.log(error);
        
        return { status: 'Error', error };
    }
}

export async function putToServer(url, data, headers) {
    try {
        const response = await axios.put(
            `${ApiPath}/${url}`,
            data,
            {
                headers: {...headers, Authorization: 'Bearer ' +getToken()},
            }
        );    
        return { status: 'Success', data: response.data };
    } catch (error) {
        console.log(error);
        return { status: 'Error', error };
    }
}

export async function getFromServer(url, params = {}) {

    try {
        
        const response = await axios.get(`${ApiPath}/${url}`, {
            params: params,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer ' +getToken()
            },
        });        
        
        return { status: Success, data: response.data };
    } catch (error) {
        console.log(error);
        return { status: "Error", error };
    }
}    

export async function deleteFromServer(url, params = {}) {

    try {
        
        const response = await axios.delete(`${ApiPath}/${url}`, {
            params: params,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer ' +getToken()
            },
        });        
        
        return { status: Success, data: response.data };
    } catch (error) {
        console.log(error);
        return { status: "Error", error };
    }
}    
