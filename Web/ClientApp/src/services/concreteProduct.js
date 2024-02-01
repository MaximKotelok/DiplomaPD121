import { getFromServer } from "../utils/Queries";

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