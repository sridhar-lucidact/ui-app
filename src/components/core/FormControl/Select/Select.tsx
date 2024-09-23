
import { forwardRef, useMemo } from "react";
import { Select, SelectItem, SelectProps } from "@nextui-org/select";
import { cn } from "@nextui-org/react";
import "./styles.css"
import SelectorArrow from "../shared/SelectorArrow";
const vaildVariants = ["bordered", "underlined"];


interface SelectOption {label?: string; icon?: string, value: string, default?: true}

/**
 * Type definitions for custom props used in CoreSelect component
 */
type CoreSelectCustomProps = {
    /**
     * Pass classes to label element
     */
    labelClassName?: string,
    variant?: "bordered" | "underlined" | "flat",
    /**
     * Pass classes to input element wrapper
     */
    inputWrapperClassName?: string,
    /**
     * Pass classes to input element
     */
    className?: string,


    options: SelectOption[],
}
/**
 * Type definitions for props of CoreSelect
 */
export type CoreSelectProps = Omit<SelectProps, "variant" | "children"> & CoreSelectCustomProps & {
    theme?: string
};


/**
 * Wrapper component which wraps next-ui's select component and provides a standard styling to it 
 * 
 * For documentation
 * 
 * @see https://nextui.org/docs/components/select#select-props
 */
const CoreSelect = forwardRef(({ options, radius = "sm", variant = "bordered", showScrollIndicators = false, labelClassName, className, errorMessage, inputWrapperClassName, size, theme, ...restProps }: CoreSelectProps, ref) => {

    const selectMemoziedClassesNames: SelectProps["classNames"] = useMemo(() => {
        return {
            label: cn("text-sm leading-[1.167] !text-lucid-grey-700", labelClassName, {
                'text-xs top-5': restProps.labelPlacement === "outside",
                "!w-[30%] min-w-40 top-[1px]": restProps.labelPlacement === "outside-left"
            }),
            trigger: cn(" px-4 py-3.5 h-full min-h-[3rem] font-medium !text-lucid-blue-900 focus:outline-0", {
                [" !px-0 !py-2.5 shadow-none border-b border-lucid-grey-300 after:!h-px "]: variant === "underlined",
                ["border border-lucid-grey-500"]: variant === "bordered",
                ["!text-lucid-blue-900 "]: !!errorMessage,
                ["!text-lucid-blue-900 group-data-[invalid=true]:border-lucid-red-400 group-data-[invalid=true]:!shadow-[0px_0px_0px_2px_var(--lucid-red-250)] "]: variant === "bordered" && !!errorMessage,
                "min-h-8 h-8": size === "sm",
                "bg-lucid-grey-800 text-lucid-grey-100 hover:!bg-lucid-grey-700": theme === "dark",
                "!p-0 !pb-2 min-h-7": variant === "underlined"
            }, className),
            inputWrapper: cn(
                " py-0 px-0 shadow-none h-auto min-h-[auto] rounded-lg  ", {
                ["group-data-[invalid=true]:outline group-data-[invalid=true]:!border-lucid-red-400 group-data-[invalid=true]:outline-2 group-data-[invalid=true]:outline-[#FFC5CA] group-data-[focus=true]:!border-lucid-red-400 "]: variant === "bordered" && !!errorMessage,
                ["!px-0 !border-b border-lucid-grey-200 data-[hover=true]:border-lucid-grey-500 after:bg-lucid-blue-500 after:!h-px"]: variant === "underlined",
                ["border-lucid-red-400 data-[hover=true]:border-lucid-red-400 after:!bg-lucid-red-400"]: variant === "underlined" && !!errorMessage,
                
            }, inputWrapperClassName),
            base: cn("core-select-input-wrapper gap-2", {
                ["bordered"]: variant === "bordered",
                ["underlined"]: variant === "underlined",
                "dark-theme": theme === "dark",
                "mt-6 items-center": !!restProps.label && restProps.labelPlacement === "outside-left",
                "!mt-10": !!restProps.label && restProps.labelPlacement === "outside"
            }),
            helperWrapper: "p-0 pt-2",
            description: "leading-[1.16667] text-lucid-grey-600",
            errorMessage: "leading-[1.16667] text-lucid-red-400",
            innerWrapper: cn({
                ["pb-0"]: variant === "underlined",
            }),
            value: cn(" leading-[1.28577] font-medium  text-lucid-grey-600 group-data-[invaild=true]:text-lucid-grey-600 ", {
                ["group-data-[has-value=true]:text-lucid-grey-900 "]: variant === "underlined",
                ["group-data-[has-value=true]:text-lucid-blue-900 group-data-[invalid=true]:!text-lucid-grey-900"]: variant === "bordered",
                "!text-lucid-grey-100": theme === "dark"
            }),
            selectorIcon: cn("group-data-[invalid=true]:!text-lucid-grey-900", {
                ["right-0"]: variant === "underlined",
                "text-lucid-grey-100": theme === "dark"
            }),
            mainWrapper: cn("form-field", {
                "w-[70%] max-w-[21.25rem]": restProps.labelPlacement === "outside-left",
                "!pt-2": variant === "underlined"
            })
        }
    }, [labelClassName, inputWrapperClassName, className, errorMessage])

    const popoverProps: SelectProps["popoverProps"] = useMemo(() => {
        return {
            classNames: {
                content: cn("select-menu-popup !shadow-elevated-lite border border-lucid-grey-300 rounded-lg p-0", {
                    ['dark-theme']: theme === "dark"
                }),
            }
        }
    }, [])

    // const radiusToUse = variant === "bordered" ? radius : "none";
    const radiusToUse = radius;
    const variantToUse = vaildVariants.includes(variant) ? variant : undefined;
    return (
        <Select
            labelPlacement="outside"
            radius={radiusToUse}
            variant={variantToUse}
            selectorIcon={<SelectorArrow />}
            {...restProps}
            items={options}
            classNames={selectMemoziedClassesNames}
            errorMessage={errorMessage}
            isInvalid={!!errorMessage}
            popoverProps={{...popoverProps, ...restProps.popoverProps}}
            showScrollIndicators={showScrollIndicators}
        >
            {(o) => {
                return (
                    <SelectItem key={o.value}>
                        {o.label}
                    </SelectItem>
                )
            }}
        </Select>
    )
})


export default CoreSelect;