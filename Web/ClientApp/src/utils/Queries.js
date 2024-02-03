import axios from "axios";
import { ApiPath, GetSupInfoForProductInYourCity,Success } from "./Constants";
import { getCookie } from "./Cookies";

export async function getProducts(url, data, getFunction){
    
    let getProducts = (await getFunction(url, data));
    
    await Promise.all(getProducts.data.map(async a => {
      var res = await getFromServer(GetSupInfoForProductInYourCity, { city: getCookie("city"), id: a.id });
      if (res.status === Success) {
        a.count = res.data.count;
        a.minPrice = res.data.minPrice;
      } else {
        console.error("Error");
      }
    }));
    return getProducts;
}

export async function postToServer(url, data, headers) {
    try {
        const response = await axios.post(
            `${ApiPath}/${url}`,
            data,
            {
                headers: headers,
            }
        );
        console.log(response.data);    
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
            },
        });        
        
        return { status: Success, data: response.data };
    } catch (error) {
        console.log(error);
        return { status: "Error", error };
    }
}    
