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
    let res = await postToServer("User/addFavouriteProduct/"+id);
    
    if(res.status === "Error"){
        removeToken();        
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
