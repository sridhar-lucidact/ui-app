import { SwitchProps as NextUiSwitchProps } from "@nextui-org/react"

// Know about 'Switch' props :- https://nextui.org/docs/components/switch#api
export interface SwitchProps extends Omit<NextUiSwitchProps, "size"> {
  size?: "xs" | "md" | "sm" | "lg"
};