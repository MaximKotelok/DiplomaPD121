import { Element } from "react-scroll";
import { getFavsProducts } from "../services/favProducts";
import { getFavsPharmacies } from "../services/favPharmacies";
import { FavouriteProducts, FavouritePharmacies } from "./Constants";
import { getToken } from "./Login";

export function formatDate(str) {
  const date = new Date(str);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} в ${hours}:${minutes}`;
}

export function groupBy(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
export function minimizeText(text, maxSymbols) {
  if (text) {
      if (text.length <= maxSymbols) {
          return text;
      }
      return text.slice(0, maxSymbols) + '...';
  }
  return "";
}

export function checkFormParamsAreNotEmpty(form, ignoreParams) {
  return Object.keys(form).every(a=>form[a] || ignoreParams.findIndex(b=>b==a) != -1);
};

export function toLocalString(str){

    const date = new Date(str);
    const options = { month: 'long', day: 'numeric', year: "numeric" };
    return date.toLocaleDateString('uk-UA', options);

}


export function updateObj(obj, name, value) {
  return {
    ...obj,
    [name]: value
  }
}

export function getCurrentTimeInUkraine() {
  let currentDate = new Date();



  let options = { timeZone: 'Europe/Kiev', hour12: false, hour: '2-digit', minute: '2-digit' };
  return currentDate.toLocaleTimeString('en-US', options);

}
export function addMinutes(timeString, addMinutes) {

  var timeComponents = timeString.split(":");
  var hours = parseInt(timeComponents[0]);
  var minutes = parseInt(timeComponents[1]);

  var currentTime = new Date();
  currentTime.setHours(hours);
  currentTime.setMinutes(minutes);


  currentTime.setMinutes(currentTime.getMinutes() + addMinutes);

  var updatedTimeString = ("0" + currentTime.getHours()).slice(-2) + ":" + ("0" + currentTime.getMinutes()).slice(-2);

  return updatedTimeString;

}

export function fillNullValues(originalObject, fillObject) {
  const result = { ...originalObject };
  for (const key in originalObject) {
    if (!originalObject[key] && fillObject[key]) {
      result[key] = fillObject[key];
    }
  }

  return result;
}


export function wrapTagIntoDiv(text, tag, className) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');

  const elements = doc.querySelectorAll(tag);

  elements.forEach((currentElement, index) => {
    const nextElement = elements[index + 1];

    const newDiv = doc.createElement('div');
    newDiv.className = className;

    let currentSibling = currentElement.nextSibling;
    while (currentSibling && currentSibling !== nextElement) {
      const temp = currentSibling.nextSibling;
      newDiv.appendChild(currentSibling);
      currentSibling = temp;
    }

    currentElement.parentNode.insertBefore(newDiv, currentElement.nextSibling);
  });

  return doc;
}



export function splitByClass(doc, className) {

  const divs = doc.getElementsByClassName(className);
  const res = Array.from(divs).map(tag => tag.outerHTML);

  return res;

}

export function getTagContentFromString(doc, tag) {

  const bTags = doc.getElementsByTagName(tag);
  const bTagContent = Array.from(bTags).map(tag => tag.textContent);

  return bTagContent;
}

export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

export const isFavoriteProduct = (productId) => {
    let storageFavs = localStorage.getItem(FavouriteProducts);
    if (storageFavs == null)
        return false;
    let favs = storageFavs.split(',');
    const result = favs.findIndex(a => a == productId) !== -1;
    return result;
};

export const isFavoritePharmacy = (pharmacyId) => {
    let storageFavs = localStorage.getItem(FavouritePharmacies);
    if (storageFavs == null)
        return false;
    let favs = storageFavs.split(',');
    const result = favs.findIndex(a => a == pharmacyId) !== -1;
    return result;
};

export async function initFavsProducts(setFavs) {
    if (!localStorage.hasOwnProperty("authToken"))
        setFavs([]);

    let favs = localStorage.getItem(FavouriteProducts)
    if (favs == null || favs == "undefined") {
        let favs = await getFavsProducts();
        localStorage.setItem(FavouriteProducts, favs);
        setFavs(favs);
     }
    else {
        setFavs(favs.split(','));
    }
}

export function formatDateForEmailSend(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}

/*export async function initFavsPharmacies(setFavs) {
    if (!localStorage.hasOwnProperty("authToken"))
        setFavs([]);

    let favs = localStorage.getItem(favouritePharmacies)
    if (favs == null || favs == "undefined") {
        let favs = await getFavsPharmacies();
        localStorage.setItem(favouritePharmacies, favs);
        setFavs(favs());
    }
    else {
        setFavs(favs.split(','));
    }
}*/

export async function initStorageFavs() {
    let favsProducts = await getFavsProducts();
    let favsPharmacies = await getFavsPharmacies();
    localStorage.setItem(FavouriteProducts, favsProducts);
    localStorage.setItem(FavouritePharmacies, favsPharmacies);
}

export function isWidthDown(breakpoint, width) {
  const breakpointWidth = breakpoints[breakpoint];
  return width <= breakpointWidth;
};
export function redirect404() {
  window.location.href = '/404';
};

export function toTwoDigitsNumber(number) {
  return number.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}



export function isPharmacyOpen(timeOpen, timeClosed) {
  const now = new Date();


  now.toLocaleString('en-US', { timeZone: 'Europe/Kiev' });

  const openingDate = new Date(now);
  const closingDate = new Date(now);


  const [openingHour, openingMinute] = timeOpen.split(':').map(Number);
  const [closingHour, closingMinute] = timeClosed.split(':').map(Number);


  openingDate.setHours(openingHour, openingMinute, 0, 0);
  closingDate.setHours(closingHour, closingMinute, 0, 0);


  return now >= openingDate && now < closingDate;
}   