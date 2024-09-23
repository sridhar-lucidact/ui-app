import { forwardRef, useMemo } from "react";
import { Textarea, TextAreaProps } from "@nextui-org/input";
import { cn } from "@nextui-org/react";


export type CustomCoreTextareaProps = {
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
    errorMessage?: string

}
type CoreTextAreaProps = Omit<TextAreaProps, 'variant'> & CustomCoreTextareaProps


/**
 * Wrapper component on next-ui's textarea which provides custom styles to the input
 * 
 * For documentation
 * @see https://nextui.org/docs/components/textarea#api
 */
const CoreTextArea = forwardRef(({ variant = "bordered", errorMessage, labelClassName, inputWrapperClassName, className, ...restProps }: CoreTextAreaProps, ref) => {


    const inputMemoziedClassesNames: TextAreaProps["classNames"] = useMemo(() => {
        return {
            label: cn("leading-[1.167] !text-lucid-grey-700", labelClassName, {
                'text-xs top-5': restProps.labelPlacement === "outside",
                "w-[30%] min-w-40 top-2": restProps.labelPlacement === "outside-left"
            }),
            input: cn("px-4 py-3.5 font-medium !text-lucid-blue-900   leading-[1.28577] placeholder:text-lucid-grey-600 ", {
                ["px-0 py-2"]: variant === "underlined",
                ["!text-lucid-blue-900 "]: !!errorMessage
            }, className),
            inputWrapper: cn(
                " py-0 px-0 shadow-none h-auto min-h-[auto] rounded-lg  !bg-white data-[hover=true]:!bg-white group-data-[focus=true]:!bg-white", {

                ["border data-[hover=true]:border-lucid-blue-500  group-data-[focus=true]:shadow-active-input border-lucid-grey-500"]: variant === "bordered",
                ["rounded-none data-[focus=true]:!border-lucid-blue-500"]: variant === "underlined",
                ["group-data-[focus=true]:!border-lucid-blue-500 "]: variant === "bordered" && !errorMessage,
                ["group-data-[invalid=true]:!border-lucid-red-400 group-data-[invalid=true]:shadow-error-input group-data-[focus=true]:!border-lucid-red-400 !bg-white group-data-[focus=true]:!bg-white group-data-[hover=true]:!bg-white "]: variant === "bordered" && !!errorMessage,
                ["!px-0 !border-b border-lucid-grey-200 data-[hover=true]:border-lucid-grey-500 after:bg-lucid-blue-500 after:!h-px"]: variant === "underlined",
                ["border-lucid-red-400 data-[hover=true]:border-lucid-red-400 after:!bg-lucid-red-400 data-[focus=true]:!border-lucid-red-400"]: variant === "underlined" && !!errorMessage,
                "w-[70%] max-w-[21.25rem]": restProps.labelPlacement === "outside-left"
            }, inputWrapperClassName),
            base: cn("data-[has-label=true]:mt-[1.375rem] gap-2", {
                "items-start": restProps.labelPlacement === "outside-left"
            }),
            helperWrapper: "p-0 pt-2",
            description: "leading-[1.16667] text-lucid-grey-600",
            errorMessage: "leading-[1.16667] text-lucid-red-400",
            innerWrapper: cn("form-field", {
                ["pb-0"]: variant === "underlined"
            }),
        }
    }, [labelClassName, inputWrapperClassName, className, errorMessage])
    
    return (
        <Textarea
            labelPlacement={"outside"}
            {...restProps}
            isInvalid={!!errorMessage}
            classNames={inputMemoziedClassesNames}
            errorMessage={errorMessage}
        />
    )
})



export default CoreTextArea;