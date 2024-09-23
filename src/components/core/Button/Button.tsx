import { PropsWithChildren, forwardRef, useMemo } from "react";
import { Button as NextButton, ButtonGroup, ButtonGroupProps, ButtonProps } from "@nextui-org/button";
import { cn } from "@nextui-org/react";



export type TButtonSizeProp = "big" | "small" | "medium" | "icon-small" | "icon-medium" | "icon-large" | "icon-xlarge";


/**
 * Type definition for Button props
 */
type CoreButtonProps = PropsWithChildren<Omit<ButtonProps, "size" | "isDisabled" | "variant"> & {
  size?: TButtonSizeProp,
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost" | "text"
}>;


/**
 * Button component which wraps Next UI's button component
 * 
 * It does not support 'isDisabled' use 'disabled' to mark the button as disabled 
 * 
 * Props such as size, color work differently but rest of the props work the same way
 * 
 * @see https://nextui.org/docs/components/button#api
 * for props documentation
 */
const Button = forwardRef((props: CoreButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) => {

  const { variant = "solid", color = "primary", radius = "sm", size = "big", fullWidth, className, children, disabled, spinner, isIconOnly, ...restProps } = props;

  /**
   * Memoized btn classes
   */
  const btnClasses = useMemo(() => {

    return cn(" w-auto h-auto font-semibold leading-[1.285] py-[0.9375rem] px-2.5 ", {
      ['disabled:bg-lucid-blue-200 disabled:opacity-100  data-[hover=true]:bg-lucid-blue-600 data-[hover=true]:!opacity-100 focus:bg-lucid-blue-700']: variant === "solid" && color === "primary",
      ["border border-lucid-grey-500 rounded-md text-lucid-grey-900  data-[hover=true]:border-lucid-grey-800 data-[hover=true]:!bg-transparent disabled:!opacity-100 disabled:!border-lucid-grey-500 disabled:!text-lucid-grey-500 focus:bg-lucid-grey-200"]: !isIconOnly && variant === "ghost",
      ["min-h-[3rem]"]: size === "big",
      ["py-2 min-h-[2rem]"]: size === "medium",
      ["py-2 font-medium text-xs leading-[1.166] rounded-md min-h-[1rem] "]: size === "small",
      ["bg-primary text-white"]: variant === "solid" && color === "primary",
      ["data-[hover=true]:bg-transparent text-primary disabled:text-lucid-grey-500 disabled:!opacity-100 focus:text-lucid-blue-700"]: !isIconOnly && variant === "light",
      ["min-h-[auto] min-w-[auto] p-0 text-lucid-grey-900"]: isIconOnly,
      ["h-6 w-6 !border text-base"]: size === "icon-small",
      ["h-8 w-8 !border text-xl"]: size === "icon-medium",
      ["h-10 w-10 text-xl"]: size === "icon-large",
      ["h-12 w-12 text-2xl"]: size === "icon-xlarge",
      ["data-[hover=true]:bg-lucid-grey-200  disabled:text-lucid-grey-500 disabled:!opacity-100 focus:bg-lucid-grey-400 !border-0"]: isIconOnly && variant === "light",
      ["w-full"]: !!fullWidth,
      "inline-flex text-primary !p-0 bg-transparent !min-h-0": variant === "text"
    }, className)
  }, [size, className, variant, isIconOnly, fullWidth])

  const radiusToUse = isIconOnly ? "full" : radius;

  const buttonVariant = variant === "text" ? "flat" : variant;

  return (
    <NextButton
      ref={ref}
      isDisabled={disabled}
      fullWidth={fullWidth}
      {...restProps}
      radius={radiusToUse}
      className={btnClasses}
      variant={buttonVariant}
      isIconOnly={isIconOnly}
    >
      {children}
    </NextButton >
  )
})



export { ButtonGroup };
export type CoreButtonGroupProps = ButtonGroupProps
export default Button;