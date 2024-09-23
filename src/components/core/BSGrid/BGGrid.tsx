import { cn } from "@nextui-org/react";
import { DivElement } from "~/types/components.types";
import { TRow } from "~/types/schema/page.type";
import { BootStrapColSize } from "~/types/schema/enum.type";
import { RowSize } from "la-ui-schema/lib/EnumModule";

export function isRow(conf: any): conf is TRow {
  return !!(conf as TRow).rowContent
}

export type TRowSize = RowSize | string

export function Row(props: DivElement<{ rowSize?: TRowSize}>) {
  const { children, className, rowSize, ...rest } = props
  return <div className={cn("row w-100", className, { [`row-${rowSize}`]: rowSize})} {...rest}>{children}</div>
}

export type TColSizeType = BootStrapColSize | string

export function Column(props: DivElement<{ colSize?: TColSizeType }>) {
  const { children, className, colSize, ...rest } = props
  let col = "col-md-12";
  if (!!colSize) {
    col = `col-md-${colSize}`;
  }
  
  return <div className={cn("col-12", className, col)} {...rest}>{children}</div>
}