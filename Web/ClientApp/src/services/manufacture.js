import { GetAllManufacturers, ClassHeader } from "../utils/Constants";
import { postToServer, getFromServer, deleteFromServer } from "../utils/Queries";


export async function getAllManufacturers() {
    return await getFromServer(GetAllManufacturers)
} 

export async function getAllManufacturerForAdmin(page, search) {
    return await postToServer("Manufacturer/GetAllManufacturersForAdmin", {
        itemsPerPage: 6,
        page: page,
        search
    })
}
export async function upsertManufacturer(manufacturer) {
    return await postToServer("Manufacturer/UpsertManufacturer", {
        ...manufacturer,
    }, ClassHeader)
}
export async function deleteManufacturer(id) {
    return await deleteFromServer(`Manufacturer/DeleteManufacturer/${id}`, {})
}
