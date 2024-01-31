import { UpsertProduct, GetProduct,  ClassHeader } from "../utils/Constants";
import { postToServer, getFromServer} from "../utils/Queries";

export async function upsertProduct(product, options) {
    await postToServer(UpsertProduct, {
        ...product,
        productAttributeGroupID: options.typeId,
        properties: options.additionalAttribute
    }, ClassHeader)
} 

export async function getProductById(productId) {
    return await getFromServer(GetProduct, { id: productId })
}