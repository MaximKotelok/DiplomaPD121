import { Element } from "react-scroll";

export function wrapTagIntoDiv(text, tag, className){
    const regex = new RegExp(`(<${tag}>.*?<\\/${tag}>)([^<]*)`, 'g');

    const parser = new DOMParser();
    const doc = parser.parseFromString(text.replace(regex, `<div class="${className}">$1$2</div>`), 'text/html');
    return doc;
}

export function splitByClass(doc, tag,className) {
    
    const divs = doc.getElementsByClassName(className);
    const res = Array.from(divs).map(tag => tag.outerHTML);
  
    return res;
    

  }
export function getTagContentFromString(doc,tag) {
    
    const bTags = doc.getElementsByTagName(tag);
    const bTagContent = Array.from(bTags).map(tag => tag.textContent);
  
    return bTagContent;
  }
