import { getFromServer, postToServer } from "../utils/Queries";
import { postPhotoToServer } from "./photo";
import { ClassHeader } from "../utils/Constants"

export async function getListOfConcreteProductInYourCity(city, productId){
    return await getFromServer(
        `ConcreteProduct/GetListOfConcreteProductInYourCity/${city}/${productId}`
        )
}

export async function Coords(lat,lng,productId){
    return await getFromServer(`ConcreteProduct/Coords/${lat}/${lng}/${productId}`);       
}

export async function searchConcreteProduct(pharmacyId, value){
    return await getFromServer(`ConcreteProduct/Search/${pharmacyId}/${value}`);
}

export async function addConcreteProductAsync(data) {
    return await postToServer("ConcreteProduct/AddConcreteProductAsync", data, ClassHeader);
}