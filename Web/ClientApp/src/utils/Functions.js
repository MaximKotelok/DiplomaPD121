import { Element } from "react-scroll";
import { getFavs } from "../services/favProducts";

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



export function splitByClass(doc,className) {
    
    const divs = doc.getElementsByClassName(className);
    const res = Array.from(divs).map(tag => tag.outerHTML);

    return res;
    
  }

export function getTagContentFromString(doc,tag) {
    
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

export const isFavorite = (productId, favs) => {
  if(!favs)
    return false;
  const result = favs.findIndex(a=>a === productId) !== -1;    
  return result;
};

export async function initFavs(setFavs) {
  setFavs(await getFavs());
}


export function isWidthDown(breakpoint, width){
    const breakpointWidth = breakpoints[breakpoint];
    return width <= breakpointWidth;
};
export function redirect404(){
    window.location.href = '/404';
};

export function toTwoDigitsNumber(number){
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
