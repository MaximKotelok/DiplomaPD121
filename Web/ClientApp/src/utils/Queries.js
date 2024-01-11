import axios from "axios";
import { GetSupInfoForProductInYourCity, ServerURL,Success } from "./Constants";

const globalUrl = `${ServerURL}/api`;

export async function getProducts(url, data, getFunction){
    
    let getProducts = (await getFunction(url, data));
    
    await Promise.all(getProducts.data.map(async a => {
      var res = await getFromServer(GetSupInfoForProductInYourCity, { city: "Львів", id: a.id });
      if (res.status === Success) {
        a.count = res.data.count;
        a.minPrice = res.data.minPrice;
      } else {
        console.error("Error");
      }
    }));
    return getProducts;
}


export async function postToServer(url, data) {
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
            res = { status: Success, data: response.data };
        })
        .catch((error) => {
            res = { status: 'Error', error };
        });

    return res
}

export async function getFromServer(url, params = {}) {

    console.log(url)
    console.log(params)

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
