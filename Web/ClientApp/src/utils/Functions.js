import { Element } from "react-scroll";

export function wrapTagIntoDiv(text, tag, className){
    let updatedText;

    updatedText = text.replaceAll(`<${tag}>`, `</div><div class="${className}"><${tag}>`);
    updatedText = updatedText.replaceAll(`</${tag}>`, `</${tag}>`);
    updatedText = updatedText.replace(`</div><${tag}>`, `<${tag}>`);
    updatedText = `${updatedText}</div>`;

    const parser = new DOMParser();
    const doc = parser.parseFromString(updatedText, 'text/html');
    console.log(doc);
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

export const breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

export function isWidthDown(breakpoint, width){
    const breakpointWidth = breakpoints[breakpoint];
    return width <= breakpointWidth;
};