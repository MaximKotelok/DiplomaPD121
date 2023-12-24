import axios from "axios";


const globalUrl = 'https://localhost:7133/api';

export function postToServer(url, data) {
    let res = {};
    axios({
        method: "post",
        url: `${globalUrl}/${url}`,
        data,
        config: {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        },
    })
        .then((response) => {
            res = { status: "Success", data: response.json() };
        })
        .catch((error) => {
            res = { status: "Error" };
        });
}

export async function postPhotoToServer(url, path, photo) {
    let res = {};

     await axios({
            method: 'post',
            url: `${globalUrl}/${url}`,
            data: { path, photo },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((response) => {
            res = { status: 'Success', data: response.data };
        })
        .catch((error) => {
            res = { status: 'Error', error };
        });

    return res
}

export async function getFromServer(url) {
    let res = {};
    await axios({
            method: "get",
            url: `${globalUrl}/${url}`,
            config: {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            },
        })
        .then((response) => {
            res = { status: "Success", data: response.data};
        })
        .catch((error) => {
            res = { status: "Error", error };
        });
    return res
}
    
