import { UpsertProduct, GetProduct,  ClassHeader, GetAllProductsFromIdArray, Success, GetSupInfoForProductInYourCity, GetTopOffers } from "../utils/Constants";
import { getCookie } from "../utils/Cookies";
import { postToServer, getFromServer, putToServer} from "../utils/Queries";

export async function getSupInfo(products){
    return await Promise.all(products.map(async a => {
        var res = await getFromServer(GetSupInfoForProductInYourCity, { city: getCookie("city"), id: a.id });      
        if (res.status === Success) {
          a.count = res.data.count;
          a.minPrice = res.data.minPrice;                    
        } else {
            console.error("Error");
        }
        return a;
        
      }))
}

export async function upsertProduct(product, options) {
    return await postToServer(UpsertProduct, {
        ...product,
        properties: options.additionalAttribute
    }, ClassHeader)
} 

export async function getTopOffer() {
    return await getFromServer(GetTopOffers, {
        count: 6
    }, ClassHeader)
} 

export async function changeStatus(productId, statusId) {
    return await putToServer(`Product/ChangeStatus/${productId}/${statusId}`, ClassHeader)
} 

export async function getProductsFromIdsArray(ids){
    let res = await postToServer(GetAllProductsFromIdArray, ids);
    return await getSupInfo(res.data);
}

export async function getCountProducts(count) {
    let res = await getFromServer("Product", {count: count});
    return await getSupInfo(res.data);
}


export async function getProductById(productId) {
    return await getFromServer(GetProduct, { id: productId })
}

export async function getExistAttributeVariantsList(existAttributes){
    return await Promise.all(existAttributes.map(async (b) => {
        return {
            name: b.name, description: b.description, list: (await getFromServer(b.actionGetPath))
                .data.map(c => {
                    return { id: c.id, title: c.title }
                }
                )
        };
    }));
}