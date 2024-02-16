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
                
                cart[pharmacyIndex].items[itemIndex].count = cart[pharmacyIndex].items[itemIndex].count+1; 
            }else{                
                cart[pharmacyIndex].items.unshift({id: itemId, count: 1});
                
            }
        }else{
            cart.unshift({id: pharmacyId, items: [{id: itemId, count: 1}]});
        }
        saveObjectToSession("cartItems", cart);
    }
}

export const changeCountInCart = (pharmacyId, itemId, count) => {
    pharmacyId = parseInt(pharmacyId);
    itemId = parseInt(itemId);

    if (itemId && pharmacyId) {
        let cart = getCart();
        let pharmacyIndex = cart.findIndex(a => a.id === pharmacyId);

        if (pharmacyIndex !== -1) {
            let itemIndex = cart[pharmacyIndex].items.findIndex(a => a.id === itemId);

            if (itemIndex !== -1) {
                if (count !== 0) {
                    cart[pharmacyIndex].items[itemIndex].count = count;
                } else {
                    cart[pharmacyIndex].items.splice(itemIndex, 1);
                }

                
                if (cart[pharmacyIndex].items.length === 0) {                    
                    cart.splice(pharmacyIndex, 1);
                }

                saveObjectToSession("cartItems", cart);
                return true;
            }
        }

        return false;
    }
};

export const getCart = () => {
    let cart = getObjectFromSession("cartItems");
    if (cart)
        return cart;
    return [];
}

