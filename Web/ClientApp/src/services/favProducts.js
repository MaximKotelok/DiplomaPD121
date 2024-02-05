import { UpsertProduct, GetProduct,  ClassHeader, GetAllProductsFromIdArray, Success, GetSupInfoForProductInYourCity, UserPath } from "../utils/Constants";
import { getCookie } from "../utils/Cookies";
import { removeToken } from "../utils/Login";
import { postToServer } from "../utils/Queries";

export async function getFavs(){
    let res = await postToServer("User/getFavorites");
    if(res.status === "Error"){
        removeToken();    
    }
    return res.data;

}

export async function addFavouriteProduct(id){
    console.log("a")
    let res = await postToServer("User/addFavouriteProduct/"+id);
    
    if(res.status === "Error"){
        removeToken();        
        return res.error.response.status;
    }
    
    return 200;
    
}


export async function removeFavouriteProduct(id){
    console.log("b")
    let res = await postToServer("User/removeFavouriteProduct/"+id);
    if(res.status === "Error"){
        removeToken();
        return res.error.response.status;
    }
    
    return 200;
}
