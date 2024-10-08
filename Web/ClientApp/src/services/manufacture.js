import { GetAllManufacturers, ClassHeader, itemsPerPageForAdmin } from "../utils/Constants";
import { postToServer, getFromServer, deleteFromServer } from "../utils/Queries";


export async function getAllManufacturers() {
    return await getFromServer(GetAllManufacturers)
} 

export async function getManufacturerById(manufacturerId) {
    return await getFromServer("Manufacturer/GetManufacturerById", { manufacturerId: manufacturerId })
} 

export async function getAllManufacturerForAdmin(page, search) {
    return await postToServer("Manufacturer/GetAllManufacturersForAdmin", {
        itemsPerPage: itemsPerPageForAdmin,
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
