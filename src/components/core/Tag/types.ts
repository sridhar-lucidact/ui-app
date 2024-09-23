import { ReactNode } from "react";

export type TagElement = "span" | "div";

export type TagVariant = 
  "default"
  | "default-lite" 
  | "secondary" 
  | "info" 
  | "info-lite" 
  | "success" 
  | "success-lite"
  | "warning" 
  | "warning-lite";

type TagValue = string;

export type PartialTagProps = Partial<{
  variant: TagVariant;
  className: string;
  tag: TagElement;
  onClick: (value?:TagValue)=> void;
  value: TagValue;
  iconWrapperClassname: string,
  rightIcon: ReactNode;
  onRightIconClick: ()=> void
  leftIcon: ReactNode;
  onLeftIconClick: ()=> void
}>;

export type TagProps = {
  children: ReactNode;
} & PartialTagProps;