import { removeToken } from "../utils/Login";
import { getFromServer, postToServer } from "../utils/Queries";

export async function getFavs(){
    let res = await getFromServer("User/getFavoriteProducts");
    if(res.status === "Error"){
        removeToken(); 
        console.log("Error on getFavs")   
    }
    return res.data;
}

export async function addFavouriteProduct(id){
    let res = await postToServer("User/addFavouriteProduct/"+id);
    
    if(res.status === "Error"){
        return res.error.response.status;
    }
    
    return 200;
    
}


export async function removeFavouriteProduct(id){
    let res = await postToServer("User/removeFavouriteProduct/"+id);
    if(res.status === "Error"){
        removeToken();
        return res.error.response.status;
    }
    
    return 200;
}
