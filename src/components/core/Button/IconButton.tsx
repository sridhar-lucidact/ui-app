import { createRef, forwardRef, RefObject, useRef } from "react";
import Button, { TButtonSizeProp } from "./Button";
import { ButtonProps, cn } from "@nextui-org/react";

export type TIconButtonProps = Omit<ButtonProps, "size"> & {
  size?: TButtonSizeProp
  icon?: string
}

const IconButton = (props: TIconButtonProps) => {
  const ref: any = useRef<HTMLButtonElement>(null)
  const { icon, children, ...rProps } = props;
  return <Button
    ref={ref}
    variant="bordered"
    size="icon-small"
    isIconOnly
    {...rProps}
  >
    {icon ? <span className={cn(icon, "block")} color="inherit"></span> : null}
    {children}
  </Button>
}

export default IconButton;