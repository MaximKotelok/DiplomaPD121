import { ClassHeader } from "../utils/Constants";
import { postToServer, getFromServer, deleteFromServer } from "../utils/Queries";

export async function getAllAttributeGroups() {
    return await getFromServer("AttributeGroup/GetAllAttributeGroups")
} 
export async function getAttributeGroupById(brandId) {
    return await getFromServer("AttributeGroup/GetAttributeGroupById", { brandId: brandId })
}
export async function getCountAttributeGroups(count) {
    return await getFromServer("AttributeGroup/GetCountAttributeGroups", { count: count })
} 
export async function upsertAttributeGroup(brand) {
    return await postToServer("AttributeGroup/UpsertAttributeGroup", {
        ...brand,
    }, ClassHeader)
} 
export async function deleteAttributeGroup(id) {
    return await deleteFromServer(`AttributeGroup/DeleteAttributeGroup/${id}`, {})
}