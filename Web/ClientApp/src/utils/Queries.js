import axios from "axios";
import { ApiPath, GetSupInfoForProductInYourCity, ServerURL,Success } from "./Constants";
import { getCookie } from "./Cookies";

const globalUrl = `${ServerURL}/api`;

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

export async function postPhotoToServer(serverUrl, relativePath, file) {
    const formData = new FormData();
    formData.append('relativePath', relativePath);
    formData.append('file', file);
  
    try {
      const response = await axios.post(`${ApiPath}/${serverUrl}`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
        
      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error uploading file:', response.data);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

export async function getFromServer(url, params = {}) {

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
