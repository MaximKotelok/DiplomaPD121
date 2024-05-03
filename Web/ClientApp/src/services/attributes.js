import { ClassHeader, itemsPerPageForAdmin } from "../utils/Constants";
import { postToServer, getFromServer, deleteFromServer } from "../utils/Queries";

export async function getAllAttributes() {
    return await getFromServer("Attribute/GetAllAttributes")
} 
export async function getAttributeById(attributeId) {
    return await getFromServer("Attribute/GetAttributeById", { attributeId: attributeId })
}
export async function getCountAttributes(count) {
    return await getFromServer("Attribute/GetCountAttributes", { count: count })
} 
export async function getAllAttributesForAdmin(page, search) {
    return await postToServer("Attribute/GetAllAttributesForAdmin", {
        itemsPerPage: itemsPerPageForAdmin,
        page: page,
        search
    })
}
export async function upsertAttribute(attribute) {
    return await postToServer("Attribute/UpsertAttribute", {
        ...attribute,
    }, ClassHeader)
} 
export async function deleteAttribute(id) {
    return await deleteFromServer(`Attribute/DeleteAttribute/${id}`, {})
}