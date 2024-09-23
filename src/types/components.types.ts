import { MouseEvent } from "react"
import { TLaTab } from "./schema/tab.type"

export type DivElement<T extends {}> = React.HTMLAttributes<HTMLDivElement> & T & {}

export type TTabProps = {
  tab: TLaTab,
  onClick?: (e: MouseEvent<HTMLDivElement> | string) => void
}