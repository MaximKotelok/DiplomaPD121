import { removeToken } from "../utils/Login";
import { getFromServer, postToServer } from "../utils/Queries";
import { GetFavoritePharmacies, GetFavoritePharmaciesWithSupInfo, AddFavouritePharmacy, RemoveFavouritePharmacy} from "../utils/Constants";


export async function getFavsPharmacies(){
    let res = await getFromServer(GetFavoritePharmacies);
    if(res.status === "Error"){
        removeToken(); 
        console.log("Error on getFavs")   
    }
    return res.data;
}

export async function getFavsPharmaciesWithSupInfo() {
    let res = await getFromServer(GetFavoritePharmaciesWithSupInfo);
    if (res.status === "Error") {
        removeToken();
        console.log("Error on getFavsWithSups")
    }
    return res.data;
}



export async function addFavouritePharmacy(id){
    let res = await postToServer(AddFavouritePharmacy + id);
    
    if(res.status === "Error"){
        return res.error.response.status;
    }
    
    return 200;
    
}


export async function removeFavouritePharmacy(id){
    let res = await postToServer(RemoveFavouritePharmacy + id);
    if(res.status === "Error"){
        removeToken();
        return res.error.response.status;
    }
    
    return 200;
}
