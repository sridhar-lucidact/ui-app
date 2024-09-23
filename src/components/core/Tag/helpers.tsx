import { TagElement } from "./types";

export const getTagElement = (name: TagElement)=> {
  let tag = "span";
  
  switch (name) {    
    case "div":
      tag = "div";
      break;
    default: break;
  }

  return tag as React.ElementType;
};