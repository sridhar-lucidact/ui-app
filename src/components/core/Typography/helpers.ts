import { FontFamily, TypographyVariant } from "./types";

export const getFontFamily = (name: FontFamily) => {
  let family = "";
  switch (name) {
    case "Inter":
      family = "font-sans";
    break;
    case "Inter Tight":
      family = "font-inter-tight";
    break;
    default:
      family = "font-sans";
  }
  return family;
};

export const getTagVariant = (variant: TypographyVariant)=> {
  let tag = "p";
  
  switch (variant) {
    case "body":
    case "body-semibold":
    case "subtitle":
    case "subtitle-medium":
    case "subtitle-semibold":
    case "subtitle-s2":
    case "subtitle-medium-s2":
    case "subtitle-semibold-s2":
      tag === "p";
      break;

    case "span":
    case "inline":
      tag = "span";
      break;

    case "h1":
    case "h1-title":
    case "big-title":
      tag = "h1";
      break;

    case "h2":
    case "h2-title":
      tag = "h2";
      break;
    default: break;
  }

  return tag as React.ElementType;
};