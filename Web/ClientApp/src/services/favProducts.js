import { removeToken } from "../utils/Login";
import { getFromServer, postToServer } from "../utils/Queries";
import { GetFavoriteProducts, AddFavouriteProduct, RemoveFavouriteProduct } from "../utils/Constants";

export async function getFavsProducts(){
    let res = await getFromServer(GetFavoriteProducts);
    console.log(res)
    if(res.status === "Error"){
        removeToken(); 
        console.log("Error on getFavs")   
    }
    return res.data;
}

export async function addFavouriteProduct(id){
    let res = await postToServer(AddFavouriteProduct+id);
    
    if(res.status === "Error"){
        return res.error.response.status;
    }
    
    return 200;
    
}


export async function removeFavouriteProduct(id){
    let res = await postToServer(RemoveFavouriteProduct+id);
    if(res.status === "Error"){
        removeToken();
        return res.error.response.status;
    }
    
    return 200;
}
