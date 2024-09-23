import { forwardRef, useMemo, useRef } from "react";

import { DatePicker, DatePickerProps } from "@nextui-org/date-picker";
import { cn } from "@nextui-org/react";
import Icon from "~/components/core/Icon/Icon";
import SelectorArrow from "../shared/SelectorArrow";

type CustomCoreDatePickerProps = {
    variant?: "bordered" | "underlined",
    /**
     * Pass classes to label element
     */
    labelClassName?: string,
    /**
     * Pass classes to input element wrapper
     */
    inputWrapperClassName?: string,
    /**
     * Pass classes to input element
     */
    className?: string,

    /**
     * Show label
     * @default true
     */
    showLabel?: boolean

    size?: string

    theme?: "dark" | "light"
}

export type CoreDatePickerProps = Omit<DatePickerProps, "variant"> & CustomCoreDatePickerProps


/**
 * Component which wraps next-ui's DatePicker 
 * 
 * It has custom styles but works the same as next-ui's DatePicker
 * 
 * For documentation 
 * @see https://nextui.org/docs/components/date-picker#api
 */
const CoreDatePicker = forwardRef(({
    variant = "bordered",
    radius = "sm",
    label = "Date",
    showLabel = true,
    inputWrapperClassName,
    labelClassName,
    className,
    errorMessage,
    size,
    theme,
    ...restProps
}: CoreDatePickerProps, ref) => {

    const dateMemoziedClassNames: CoreDatePickerProps["classNames"] = useMemo(() => {
        return {
            selectorButton: cn("!text-lucid-grey-800 ", {
                "-mt-1 mr-2 w-5 min-w-5 h-5": variant === "underlined"
            })
        }
    }, []);

    const inputMemoziedClassesNames: CoreDatePickerProps["dateInputClassNames"] = useMemo(() => {
        return {
            label: cn("text-sm leading-[1.167] !text-lucid-grey-700", labelClassName, {
                'text-xs -top-6 absolute': restProps.labelPlacement === "outside",
                "w-[30%] min-w-40 top-[1px]": restProps.labelPlacement === "outside-left"
            }),
            input: cn("font-medium !text-lucid-blue-900   leading-[1.28577] placeholder:text-lucid-grey-600 border-none", {
                ["!text-lucid-blue-900 "]: !!errorMessage,
                "!text-lucid-grey-100": theme === "dark",
            }, className),
            inputWrapper: cn(
                "px-4 shadow-none h-auto min-h-[auto] rounded-lg form-field", {
                ["border data-[hover=true]:border-lucid-blue-500 group-data-[focus=true]:outline group-data-[focus=true]:outline-2 group-data-[focus=true]:outline-lucid-blue-200 border-lucid-grey-500"]: variant === "bordered",
                ["group-data-[focus=true]:!border-lucid-blue-500 "]: variant === "bordered" && !errorMessage,
                "data-[hover=true]:border-lucid-grey-600 group-data-[focus=true]:outline-lucid-grey-600 border-lucid-grey-700 bg-lucid-grey-800": theme === "dark" && variant === "bordered",
                ["group-data-[focus=true]:!border-lucid-grey-600 "]: theme === "dark"  && variant === "bordered" && !errorMessage,
                ["group-data-[invalid=true]:outline group-data-[invalid=true]:!border-lucid-red-400 group-data-[invalid=true]:outline-2 group-data-[invalid=true]:outline-[#FFC5CA] group-data-[focus=true]:!border-lucid-red-400 "]: variant === "bordered" && !!errorMessage,
                ["p-0 pt-2 !border-b border-lucid-grey-200 data-[hover=true]:border-lucid-grey-500 after:bg-lucid-blue-500 after:!h-px"]: variant === "underlined",
                ["border-lucid-red-400 data-[hover=true]:border-lucid-red-400 after:!bg-lucid-red-400"]: variant === "underlined" && !!errorMessage,
                "min-h-8 h-8 py-0 px-3": size === "sm",
                "py-[.688rem]": variant === "bordered",
                "w-[70%] max-w-[21.25rem]": restProps.labelPlacement === "outside-left"
            }, inputWrapperClassName),
            base: cn("gap-2 relative", {
                "mt-6": !!showLabel && !!label && restProps.labelPlacement === "outside-left",
                "mt-10": !!showLabel && !!label && restProps.labelPlacement === "outside"
            }),
            helperWrapper: "p-0 pt-2",
            description: "leading-[1.16667] text-lucid-grey-600",
            errorMessage: "leading-[1.16667] text-lucid-red-400",
            innerWrapper: cn({
                "!pb-2 min-h-7": variant === "underlined"
            })
        }
    }, [labelClassName, inputWrapperClassName, className, errorMessage])
    
    return (
        <DatePicker
            labelPlacement="outside"
            {...restProps}
            startContent={<Icon>calendar1</Icon>}
            selectorIcon={<SelectorArrow />}
            variant={variant}
            radius={radius}
            classNames={dateMemoziedClassNames}
            dateInputClassNames={inputMemoziedClassesNames}
            isInvalid={!!errorMessage}
            errorMessage={errorMessage}
            label={showLabel && label}
            popoverProps={{
                classNames: {
                    content: "calendar-popup !shadow-elevated-lite border border-lucid-grey-300 rounded-lg"
                }
            }}
        />
    )
})


export default CoreDatePicker;