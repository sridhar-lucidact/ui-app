import { cn } from "@nextui-org/react";
import { Tabs, type TabsProps } from "@nextui-org/tabs";
import { useMemo } from "react";


type CustomCoreTabsProps = {
    /**
     * Variants of the tabs
     */
    variant?: "solid" | "underlined",
    /**
     * Pass classes to tab button element
     */
    tabButtonClassName?: string,
    /**
     * Pass classes to tabs list element
     */
    tabsListClassName?: string,
    /**
     * Pass classes to main wrapper of the tabs 
     */
    tabsWrapperClassName?: string,
    /**
     * Pass classes to cursor which is visible when button is selected
     */
    cursorClassName?: string,
}


/**
 * Type definitions for the props of CoreTabs component
 * 
 */
export type CoreTabsProps = Omit<TabsProps, "variant"> & CustomCoreTabsProps;


/**
 * A wrapper component for next-ui's tabs component 
 * 
 * It works similar to next-ui's tabs component but it has some style changes
 * 
 * For documentation
 * @see https://nextui.org/docs/components/tabs#api
 * 
 */
const CoreTabs = ({ variant = "solid", radius = "none", tabButtonClassName, tabsListClassName, tabsWrapperClassName, cursorClassName, ...restProps }: CoreTabsProps) => {




    const classNames: TabsProps["classNames"] = useMemo(() => {
        return {
            tabList: cn("gap-0 p-0 h-[3rem]", {
                ["gap-x-4"]: variant === "underlined",
                [" border-t border-t-lucid-grey-700 bg-lucid-grey-800"]: variant === "solid",


            }, tabsListClassName),
            tab: cn("core-tab h-full px-4 py-[0.9375rem] data-[hover-unselected=true]:opacity-100", {
                ["px-0 after:absolute after:bg-transparent  after:w-full after:h-[3px] after:bottom-0 [&[data-hover-unselected=true]::after]:bg-lucid-grey-600 "]: variant === "underlined",
                ["[&:not(:last-child)]:border-r [&:not(:last-child)]:border-r-lucid-grey-700 data-[hover-unselected=true]:bg-lucid-grey-700"]: variant === "solid",

            }, tabButtonClassName),
            tabContent: cn("w-full text-lucid-grey-400 group-data-[selected=true]:text-lucid-grey-900 font-medium text-sm leading-[1.2857]", {
                ["text-lucid-grey-600 group-data-[selected=true]:font-semibold group-data-[selected=true]:text-lucid-blue-900"]: variant === "underlined"
            }),
            cursor: cn({
                ["bg-lucid-grey-100"]: variant === "solid",
                ["h-[0.1875rem] group-data-[selected=true]:w-full group-data-[selected=true]:bg-lucid-blue-900"]: variant === "underlined"
            }, cursorClassName)

        }
    }, [variant, tabButtonClassName, tabsListClassName, tabsWrapperClassName, cursorClassName])


    return (
        <Tabs {...restProps} variant={variant} radius={radius} classNames={classNames} />
    )
}


export default CoreTabs;