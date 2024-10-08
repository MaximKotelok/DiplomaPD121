﻿import { GetPharmacyProduct, GetPharmacyById, UpsertPharmcy, ClassHeader, itemsPerPageForAdmin } from "../utils/Constants";
import { postToServer, getFromServer, deleteFromServer } from "../utils/Queries";

export async function getPharmacyById(id){
    return await getFromServer(GetPharmacyById + `${id}`)
}
export async function getPharmacyCity(id){
    return await getFromServer(`Pharmacy/GetPharmacyCity/${id}`)
}

export async function getProductByTitleFromPharmacy(pharmacyId, search) {
    return await getFromServer(`Pharmacy/GetPharmacyProductByTitle`, {
        id: pharmacyId,
        search,
        count: 5
    }, ClassHeader)
}

export async function GetPharmacist(id){
    return await getFromServer("Pharmacy/GetPharmacist/" + `${id}`)
}

export async function getPharmaciesForAdmin(page, search, isDisplayOnlyCompanies){
    return await postToServer("Pharmacy/GetPharmaciesForAdmin",  {
        itemsPerPage: itemsPerPageForAdmin,
        page: page,
        search,
        isDisplayOnlyCompanies
    })
}

export async function getCountOfPagesPharmaciesForAdmin(search, isDisplayOnlyCompanies){
    return await postToServer("Pharmacy/GetCountOfPagesPharmaciesForAdmin",  {
        itemsPerPage: itemsPerPageForAdmin,
        search,
        isDisplayOnlyCompanies
    })
}

export async function getAllPharmaciesForPharmaCompany(page, search){
    return await postToServer("Pharmacy/GetAllPharmaciesForPharmaCompany",  {
        itemsPerPage: itemsPerPageForAdmin,
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
