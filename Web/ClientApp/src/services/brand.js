import { GetAllBrands, GetRecomendedBrands, GetBrandById, UpsertBrand, ClassHeader } from "../utils/Constants";
import { postToServer, getFromServer, deleteFromServer } from "../utils/Queries";

export async function getAllBrands() {
    return await getFromServer(GetAllBrands)
} 
export async function getBrandById(brandId) {
    return await getFromServer(GetBrandById, { brandId: brandId })
}
export async function getCountBrands(count) {
    return await getFromServer(GetRecomendedBrands, { count: count })
} 
export async function getAllBrandForAdmin(page, search) {
    return await postToServer("Brand/GetAllBrandsForAdmin", {
        itemsPerPage: 6,
        page: page,
        search
    })
}
export async function upsertBrand(brand) {
    return await postToServer(UpsertBrand, {
        ...brand,
    }, ClassHeader)
} 
export async function deleteBrand(id) {
    return await deleteFromServer(`Brand/DeleteBrand/${id}`, {})
}