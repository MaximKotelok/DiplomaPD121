import { getObjectFromSession, saveObjectToSession } from "../utils/SessionStorage";

export const addToCart = (pharmacyId, itemId) => {
    pharmacyId = parseInt(pharmacyId);
    itemId = parseInt(itemId);
    if (itemId && pharmacyId) {

        let cart = getCart();
        let pharmacyIndex = cart.findIndex(a=>a.id==pharmacyId);        
        if (pharmacyIndex !== -1){
            let itemIndex = cart[pharmacyIndex].items.findIndex(a=>a.id==itemId);
            if(itemIndex !== -1){
                console.log(cart[pharmacyIndex].items[itemIndex].count+1)
                cart[pharmacyIndex].items[itemIndex].count = cart[pharmacyIndex].items[itemIndex].count+1; 
            }else{                
                cart[pharmacyIndex].items.unshift({id: itemId, count: 1});
                
            }
        }else{
            cart.unshift({id: pharmacyId, items: [{id: itemId, count: 1}]});
        }
        console.log(cart)   
        saveObjectToSession("cartItems", cart);
    }
}

export const getCart = () => {
    let cart = getObjectFromSession("cartItems");
    if (cart)
        return cart;
    return [];
}

