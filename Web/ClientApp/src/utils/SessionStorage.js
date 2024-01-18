import { RecentlyViewedList } from "./Constants";
import { RecentlyViewedListName } from "./Constants";
const removeValue = (arr, value) => {
    return arr.filter(item => item !== value);
}

const saveObjectToSession = (key, obj) => {
    const serializedObj = JSON.stringify(obj);
    sessionStorage.setItem(key, serializedObj);
};

const getObjectFromSession = (key) => {
    const serializedObj = sessionStorage.getItem(key);

    if(serializedObj){
        return JSON.parse(serializedObj);
    }
    return null;
};

export const addToRecentlyViewedProduct = (id) => {
    id = parseInt(id);
    if (id) {

        let recentlyViewedList = getRecentlyViewedProductsIds();
        if (recentlyViewedList.includes(id))
            recentlyViewedList = removeValue(recentlyViewedList, id);
        recentlyViewedList.unshift(id);
        saveObjectToSession(RecentlyViewedListName, recentlyViewedList);
    }
}

export const getRecentlyViewedProductsIds = () => {
    let arr = getObjectFromSession(RecentlyViewedListName);
    if (arr)
        return arr;
    return [];
}


export const getRecomendedRandomCategory = (type) => {         
    return getObjectFromSession(`${type}RecomendedRandomCategoryId`);
}

export const setRecomendedRandomCategory = (type,id) => {         
    if(id)
        saveObjectToSession(`${type}RecomendedRandomCategoryId`,id);
    else 
    saveObjectToSession(`${type}RecomendedRandomCategoryId`,0);
}

