import { UpsertProduct, GetProduct, ClassHeader, GetAllProductsFromIdArray, Success, GetSupInfoForProductInYourCity, GetTopOffers, GetProductForPharmacy, itemsPerPageForAdmin } from "../utils/Constants";
import { getCookie } from "../utils/Cookies";
import { postToServer, getFromServer, putToServer, deleteFromServer} from "../utils/Queries";
import { postPhotoToServer } from "./photo";
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
    let res = await getFromServer(GetTopOffers, {
        count: 10
    }, ClassHeader);
    if(res.status === Success){
        console.log({
            status: res.status,
            data: await Promise.all(res.data.map(a=>
            {
                return{
                    title: a.title,
                    data: getSupInfo(a.data)
                }
            })
        )
        
    })
        return {
            status: res.status,
            data: await Promise.all(res.data.map(async a=>
            {
                return{
                    title: a.title,
                    data: await getSupInfo(a.data)
                }
            })
        )
        
    }
    }
    return "error";
    
} 

export async function getMinAndMaxPrice(id) {
    return await getFromServer("ConcreteProduct/GetMinAndMaxPrice", {
        id: id,
        city: getCookie("city")
    }, ClassHeader)
} 

export async function GetProductByTitle(title, count = 6) {
    return await getFromServer("Product/GetProductByTitle", {
        title,
        count
    }, ClassHeader)
} 

export async function Search(title = null, categories = null, brands = null, activeSubstanceId, properties = null,page=1, orderBy=null) {
    let res = await postToServer("Product/Search", {
        title,
        categories,
        brands,
        activeSubstanceId,
        properties,
        page,
        itemsPerPage:itemsPerPageForAdmin,
        orderBy
    }, ClassHeader)

    if(res.status === Success){
        return {...res, products: await getSupInfo(res.data.products)}
    }
    return "Error"
} 
export async function GetSearchInput(title = null, categories = null, brands = null, activeSubstanceId = null, properties = null) {
    return await postToServer("Product/GetSearchInput", {
        title,
        categories,
        brands,
        properties, 
        activeSubstanceId
    }, ClassHeader)
} 
export async function getProductsAdmin(page = 1, search = ""){
    return await postToServer("Product/GetProductsAdmin", {
        itemsPerPage:itemsPerPageForAdmin,
        page: page,
        search: search
    }, ClassHeader)
} 
export async function getCountOfPagesForProductsAdmin(search = ""){
    return await postToServer("Product/GetCountOfPagesForProductsAdmin", {
        itemsPerPage:itemsPerPageForAdmin,
        search: search
    }, ClassHeader)
} 

export async function changeStatus(productId, statusId, description) {
    return await putToServer(`Product/ChangeStatus/${productId}/${statusId}`, {description}, ClassHeader)
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
export async function getProductByIdForUpdate(productId) {
    return await getFromServer("Product/GetByIdForUpdate", { id: productId })
}

export async function getProductByIdForAdmins(productId) {
    return await getFromServer("Product/GetProductByIdForAdmins", { id: productId })
}

export async function getProductForPharmacyById(productId) {
    return await getFromServer(GetProductForPharmacy, { id: productId })
}


export async function GetPriceHistory(productId) {
    return await getFromServer("Product/GetPriceHistory", { id: productId })
}

export async function deleteProduct(productId) {
    return await deleteFromServer(`Product/${productId}`, {})
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