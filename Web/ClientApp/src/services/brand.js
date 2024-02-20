import { GetAllBrands, GetRecomendedBrands, GetBrandById, UpsertBrand, ClassHeader } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function getAllBrands() {
    return await getFromServer(GetAllBrands)
} 
export async function getBrandById(barandId) {
    return await getFromServer(GetBrandById, { id: barandId })
}
export async function getCountBrands(count) {
    return await getFromServer(GetRecomendedBrands, { count: count })
} 

export async function upsertBrand(brand) {
    await postToServer(UpsertBrand, {
        ...brand,
    }, ClassHeader)
} 
