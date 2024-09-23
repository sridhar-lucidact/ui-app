import { forwardRef, PropsWithChildren, useMemo } from "react";
import { Input, InputProps } from "@nextui-org/input";
import { cn } from "@nextui-org/react"


type CoreCustomInputProps = {
    /**
     * Pass classes to label element
     */
    labelClassName?: string,
    variant?: "bordered" | "underlined",
    /**
     * Pass classes to input element wrapper
     */
    inputWrapperClassName?: string,
    /**
     * Pass classes to input element
     */
    className?: string,
    theme?: "dark" | "light"
}

/**
 * Type definitions of props for CoreInput 
 * 
 * It extends props available from next ui's input component with custom props
 * 
 */
export type CoreInputProps = PropsWithChildren<Omit<InputProps, "variant"> & CoreCustomInputProps>


/**
 * Component which wraps next ui's input component and gives standard styles to the input and extends
 * 
 * For Documentation 
 * @see https://nextui.org/docs/components/input#input-props 
 * 
 */
const CoreInput = forwardRef((props: CoreInputProps, ref) => {
    const { variant = "bordered", className, errorMessage, labelClassName, inputWrapperClassName, classNames, theme, size, ...restProps } = props;
    const inputMemoziedClassesNames: InputProps["classNames"] = useMemo(() => {
        return {
            label: cn("text-sm leading-[1.167] !text-lucid-grey-700", classNames?.label, labelClassName, {
                'text-xs top-5': restProps.labelPlacement === "outside",
                "w-[30%] min-w-40": restProps.labelPlacement === "outside-left"
            }),
            input: cn("font-medium !text-lucid-blue-900 leading-[1.28577] placeholder:text-lucid-grey-600 border-none", {
                ["!text-lucid-blue-900 "]: !!errorMessage,
                "!text-lucid-grey-100": theme === "dark",
            }, className, classNames?.input),
            inputWrapper: cn(
                "px-4 shadow-none h-auto min-h-[auto] rounded-lg  ", {
                ["border data-[hover=true]:border-lucid-blue-500 group-data-[focus=true]:outline group-data-[focus=true]:outline-2 group-data-[focus=true]:outline-lucid-blue-200 border-lucid-grey-500"]: variant === "bordered",
                ["group-data-[focus=true]:!border-lucid-blue-500 "]: variant === "bordered" && !errorMessage,
                "data-[hover=true]:border-lucid-grey-600 group-data-[focus=true]:outline-lucid-grey-600 border-lucid-grey-700 bg-lucid-grey-800": theme === "dark" && variant === "bordered",
                ["group-data-[focus=true]:!border-lucid-grey-600 "]: theme === "dark"  && variant === "bordered" && !errorMessage,
                ["group-data-[invalid=true]:outline group-data-[invalid=true]:!border-lucid-red-400 group-data-[invalid=true]:outline-2 group-data-[invalid=true]:outline-[#FFC5CA] group-data-[focus=true]:!border-lucid-red-400 "]: variant === "bordered" && !!errorMessage,
                ["px-0 py-2 !pl-0 !border-b border-lucid-grey-200 data-[hover=true]:border-lucid-grey-500 after:bg-lucid-blue-500 after:!h-px"]: variant === "underlined",
                ["border-lucid-red-400 data-[hover=true]:border-lucid-red-400 after:!bg-lucid-red-400"]: variant === "underlined" && !!errorMessage,
                "min-h-8 h-8 py-0 px-3": size === "sm",
                "!min-h-12": variant === "bordered" && restProps.labelPlacement === "outside"
            }, inputWrapperClassName, classNames?.inputWrapper),
            base: cn("gap-2", classNames?.base, {
                "mt-6": !!restProps.label && restProps.labelPlacement === "outside-left",
                "!mt-10": !!restProps.label && restProps.labelPlacement === "outside"
            }),
            helperWrapper: cn("p-0 pt-2", classNames?.helperWrapper),
            description: cn("leading-[1.16667] text-lucid-grey-600", classNames?.description),
            errorMessage: cn("leading-[1.16667] text-lucid-red-400", classNames?.errorMessage),
            innerWrapper: cn({
                "!pb-2 min-h-7": variant === "underlined"
            }, classNames?.innerWrapper),
            mainWrapper: cn("form-field", {
                "w-[70%] max-w-[21.25rem]": restProps.labelPlacement === "outside-left"
            }, classNames?.mainWrapper)
        }
    }, [labelClassName, inputWrapperClassName, className, errorMessage])
    
    return (
        <Input
            labelPlacement="outside"
            {...restProps}
            variant={variant}
            errorMessage={errorMessage}
            isInvalid={!!errorMessage}
            classNames={inputMemoziedClassesNames}
            placeholder={restProps.placeholder}
        />
    )
})


export default CoreInput