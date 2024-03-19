﻿import { Element } from "react-scroll";
import { getFavs } from "../services/favProducts";
import { favouriteProducts } from "./Constants";

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
};

export const isFavorite = (productId) => {
    let favs = localStorage.getItem(favouriteProducts).split(',');
    if(!favs)
        return false;
    const result = favs.findIndex(a=>a == productId) !== -1;    
    return result;
};

export async function initFavs(setFavs) {
    if (!localStorage.hasOwnProperty("authToken"))
        setFavs([]);

    let favs = localStorage.getItem("favs")
    if (favs == null || favs == "undefined") {
        let favs = await getFavs();
        localStorage.setItem(favouriteProducts, favs);
        setFavs(favs());
     }
    else {
        setFavs(favs.split(','));
    }
    
}

export async function initStorageFavs() {
    let favsProducts = await getFavs();
    localStorage.setItem(favouriteProducts, favsProducts);
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
