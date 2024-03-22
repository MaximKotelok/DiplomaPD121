import { removeToken } from "../utils/Login";
import { getFromServer, postToServer } from "../utils/Queries";

export async function getFavsPharmacies(){
    let res = await getFromServer("User/getFavoritePharmacies");
    if(res.status === "Error"){
        removeToken(); 
        console.log("Error on getFavs")   
    }
    return res.data;
}

export async function addFavouritePharmacy(id){
    let res = await postToServer("User/addFavouritePharmacy/"+id);
    
    if(res.status === "Error"){
        return res.error.response.status;
    }
    
    return 200;
    
}


export async function removeFavouritePharmacy(id){
    let res = await postToServer("User/removeFavouritePharmacy/"+id);
    if(res.status === "Error"){
        removeToken();
        return res.error.response.status;
    }
    
    return 200;
}
