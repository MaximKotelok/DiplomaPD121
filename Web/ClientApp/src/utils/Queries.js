import axios from "axios";
import { ServerURL,Success } from "./Constants";

const globalUrl = `${ServerURL}/api`;

export async function postToServer(url, data) {
console.log(`${globalUrl}/${url}`);
console.log(data);
    try {
        const response = await axios.post(
            `${globalUrl}/${url}`,
            data,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            }
        );
        console.log(response.data);    
        return { status: 'Success', data: response.data };
    } catch (error) {
        console.log(error);
        return { status: 'Error', error };
    }
    }

export async function postPhotoToServer(url, photo) {
    let res = {};

    await axios({
        method: 'post',
        url: `${globalUrl}/${url}`,
        data: photo,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then((response) => {
            res = { status: Success, data: response.data };
        })
        .catch((error) => {
            res = { status: 'Error', error };
        });

    return res
}

export async function getFromServer(url, params) {
    
    try {
        
        const response = await axios.get(`${globalUrl}/${url}`, {
            params: params,
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });        
        
        return { status: Success, data: response.data };
    } catch (error) {
        console.log(error);
        return { status: "Error", error };
    }
}    
