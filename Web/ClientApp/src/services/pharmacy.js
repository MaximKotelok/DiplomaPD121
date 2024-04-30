﻿import { GetPharmacyProduct, GetPharmacyById, UpsertPharmcy, ClassHeader } from "../utils/Constants";
import { postToServer, getFromServer, deleteFromServer } from "../utils/Queries";

export async function getPharmacyById(id){
    return await getFromServer(GetPharmacyById + `${id}`)
}

export async function GetProductByTitleFromPharmacy(title, pharmacyId, count = 6) {
    return await getFromServer("Pharmacy/GetProductByTitle", {
        title,
        count,
        pharmacyId
    }, ClassHeader)
}

export async function GetPharmacist(id){
    return await getFromServer("Pharmacy/GetPharmacist/" + `${id}`)
}

export async function getAllPharmaciesForAdmin(page, search, isDisplayOnlyCompanies){
    return await postToServer("Pharmacy/GetAllPharmaciesForAdmin",  {
        itemsPerPage: 6,
        page: page,
        search,
        isDisplayOnlyCompanies
    })
}

export async function getAllPharmaciesForPharmaCompany(page, search){
    return await postToServer("Pharmacy/GetAllPharmaciesForPharmaCompany",  {
        itemsPerPage: 6,
        page: page,
        search
    })
}

export async function deletePharmacy(id){
    return await deleteFromServer(`Pharmacy/DeletePharmacy/${id}`,  {})
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
