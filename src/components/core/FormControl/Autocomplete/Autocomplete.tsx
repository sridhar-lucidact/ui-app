
import { forwardRef, useMemo, useState } from "react";
import { Autocomplete, AutocompleteItem, AutocompleteProps, cn } from "@nextui-org/react";
import "./styles.css"
import SelectorArrow from "../shared/SelectorArrow";
import { debounce } from "lodash";
const vaildVariants = ["bordered", "underlined"];


interface AutoCompleteOption {label?: string; icon?: string, value: string, default?: true}

/**
 * Type definitions for custom props used in CoreSelect component
 */
type CoreAutocompleteCustomProps = {
    /**
     * Pass classes to label element
     */
    labelClassName?: string,
    variant?: "bordered" | "underlined" | "flat" | "faded",
    /**
     * Pass classes to input element wrapper
     */
    inputWrapperClassName?: string,
    /**
     * Pass classes to input element
     */
    className?: string,


    options: AutoCompleteOption[],

    onSearch?: (e: string) => Promise<any[]> | undefined
}
/**
 * Type definitions for props of CoreSelect
 */
export type CoreAutocompleteProps = Omit<AutocompleteProps, "variant" | "children"> & CoreAutocompleteCustomProps & {
    theme?: string
};


/**
 * Wrapper component which wraps next-ui's select component and provides a standard styling to it 
 * 
 * For documentation
 * 
 * @see https://nextui.org/docs/components/select#select-props
 */
const CoreAutocomplete = forwardRef(({ options, radius = "sm", variant = "bordered", showScrollIndicators = false, labelClassName, className, errorMessage, inputWrapperClassName, size, theme, onSearch, ...restProps }: CoreAutocompleteProps, ref) => {
    const [fieldState, setFieldState] = useState<{inputValue: string, items: AutoCompleteOption[]}>({
        inputValue: "",
        items: options
    });

    // Specify how each of the Autocomplete values should change when the input
    // field is altered by the user
    const onInputChange = (value: string) => {
        setFieldState((prevState) => ({
            ...prevState,
            inputValue: value
        }));
        searchValue(value)
    }

    const searchValue = debounce(async (value: string) => {
        // console.log(onSearch)
        if (onSearch) {
            const response = await onSearch(value);
            if (response) {
                const items = (response[0][0] as AutoCompleteOption[]).filter(response => response.value)
                setFieldState((prevState) => ({
                    ...prevState,
                    items,
                }));
            }
        }
    }, 300)

    const selectMemoziedClassesNames: AutocompleteProps["classNames"] = useMemo(() => {
        return {
            base: cn("core-autocomplete", {
                ["bordered"]: variant === "bordered",
                ["underlined"]: variant === "underlined",
                "dark-theme": theme === "dark",
                "mt-6 items-center": !!restProps.label && restProps.labelPlacement === "outside-left",
                "!mt-10": !!restProps.label && restProps.labelPlacement === "outside",
                [`label-placement-${restProps.labelPlacement}`]: restProps.labelPlacement
            }),
            // listboxWrapper: {},
            // listbox: {},
            // popoverContent: {},
            // endContentWrapper: {},
            // clearButton: {},
            // selectorButton: {}
        }
    }, [labelClassName, inputWrapperClassName, className, errorMessage])

    const popoverProps: AutocompleteProps["popoverProps"] = useMemo(() => {
        return {
            classNames: {
                content: cn("autocomplete-menu-popup !shadow-elevated-lite border border-lucid-grey-300 rounded-lg p-0", {
                    ['dark-theme']: theme === "dark"
                }),
            }
        }
    }, [])

    // const radiusToUse = variant === "bordered" ? radius : "none";
    const radiusToUse = radius;
    const variantToUse = vaildVariants.includes(variant) ? variant : undefined;
    return (
        <Autocomplete
            labelPlacement="outside"
            radius={radiusToUse}
            variant={variantToUse}
            selectorIcon={<SelectorArrow />}
            {...restProps}
            classNames={selectMemoziedClassesNames}
            errorMessage={errorMessage}
            isInvalid={!!errorMessage}
            popoverProps={{...popoverProps, ...restProps.popoverProps}}
            showScrollIndicators={showScrollIndicators}
            inputValue={fieldState.inputValue}
            items={fieldState.items}
            onInputChange={onInputChange}
        >
            {(o) => {
                const option = o as AutoCompleteOption;
                return (
                    <AutocompleteItem key={option.value}>
                        {option.label}
                    </AutocompleteItem>
                )
            }}
        </Autocomplete>
    )
})


export default CoreAutocomplete;