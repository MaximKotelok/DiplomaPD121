import { deleteFromServer, getFromServer, postToServer } from "../utils/Queries";
import { postPhotoToServer } from "./photo";
import { ClassHeader, itemsPerPageForAdmin } from "../utils/Constants"

export async function getListOfConcreteProductInYourCity(city, productId){
    return await getFromServer(
        `ConcreteProduct/GetListOfConcreteProductInYourCity/${city}/${productId}`
        )
}

export async function getCountOfPagesForConcreteProductsFromPharmacy(search=""){
    return await postToServer(
        `ConcreteProduct/GetCountOfPagesForConcreteProductsFromPharmacy`,
        {
            search,
            itemsPerPage: itemsPerPageForAdmin
        }
        )
}

export async function getConcreteProductsFromPharmacy(search="", page=1){
    return await postToServer(
        `ConcreteProduct/GetConcreteProductsFromPharmacy`,
        {
            search,
            itemsPerPage: itemsPerPageForAdmin,
            page
        }
        )
}


export async function deleteConcreteProduct(id){
    return await deleteFromServer(`ConcreteProduct/DeleteConcreteProduct/${id}`);       
}

export async function getConcreteProduct(id){
    return await getFromServer(`ConcreteProduct/GetConcreteProduct/${id}`);       
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