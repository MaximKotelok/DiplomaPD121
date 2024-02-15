import { getFromServer } from "../utils/Queries";

export async function getPharmacy(id){
    return await getFromServer(
        `Pharmacy/${id}`
        )
}

export async function getPharmacyProduct(id, productId) {
    
    return await getFromServer(
        `Pharmacy/GetPharmacyProduct`, {id:id, productId:productId}
        )
}
