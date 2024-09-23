import Icon from "../core/Icon/Icon";
import { Typography } from "../core/Typography/Typography";
import { InfoStatusSearchProps } from "./types";
import { cn } from "@nextui-org/react";

export const InfoStatusSearch = ({
  icon,
  labelProps,
  className,
  children
}: InfoStatusSearchProps) => {
  return (
    <div className={cn(" flex items-center flex-col justify-center gap-y-4", className)}>
      <div className=" flex items-center justify-center h-14 w-14 rounded-full bg-lucid-blue-100 text-lucid-blue-500">
        {
          typeof icon === "string" ? (
            <Icon className="text-2xl">{icon}</Icon>
          ) : icon 
        }
      </div>
      <Typography {...labelProps} variant={ labelProps?.variant || "subtitle-medium"} className={cn(" text-lucid-grey-800", labelProps?.className)}> 
        {children}
      </Typography>
    </div>
  )
};