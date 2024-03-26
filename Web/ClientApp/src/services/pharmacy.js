import { GetPharmacyProduct, GetPharmacyById, UpsertPharmcy, ClassHeader } from "../utils/Constants";
import { postToServer, getFromServer } from "../utils/Queries";

export async function getPharmacyById(id){
    return await getFromServer(GetPharmacyById + `${id}`)
}

export async function GetPharmacist(id){
    return await getFromServer("Pharmacy/GetPharmacist/" + `${id}`)
}

export async function getPharmacyProduct(id, productId) {
    return await getFromServer(GetPharmacyProduct, {id:id, productId:productId})
}
export async function upsertPharmacy(pharmacy) {
    return await postToServer(UpsertPharmcy, {
        ...pharmacy,
    }, ClassHeader)
}

export async function upsertPharmacist(pharmacist) {
    return await postToServer("Pharmacy/UpsertPharmacist", {
        ...pharmacist,
    }, ClassHeader)
}

//Нам би переписати старий код, шоб підлаштувати його сюда, ато в нас всі аптєки затосені під аяакс
