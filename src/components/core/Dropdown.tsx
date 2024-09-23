
import {
    Dropdown,
    DropdownProps,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownSectionProps,
    DropdownItem,
    DropdownItemProps,
    DropdownMenuProps

} from "@nextui-org/dropdown";
import { cn, Selection } from "@nextui-org/react";


type CustomCoreDropdownProps = {
    /**
     * List of menu options
     */
    options?: Record<string, any>[],
    /**
     * Custom View for drop down menu 
     * 
     * It should only contain CoreDropdownItem or CoreD otherwise it will crash on opening
     */
    children?: React.ReactNode,

    /**
     * Trigger node on which the popup menu will anchor 
     * 
     * It should support ref otherwise popup won't work
     */
    triggerNode: React.ReactNode,
    selectedKeys?: Selection,

    selectionType?: DropdownMenuProps["selectionMode"],
    onSelectionChanged?: (keys: Selection) => void,
    menuProps?: Omit<DropdownMenuProps, "children" | "onSelectionChange">

}

/**
 * Type definitions for props of CoreDropdown component
 */
type CoreDropdownProps = Omit<DropdownProps, "children"> & CustomCoreDropdownProps & Partial<{
  menuProps: Omit<DropdownMenuProps, "items" | "children">
  itemProps: DropdownItemProps
}>


/**
 * Component which wraps next-ui's dropdown component and provides a simple way to use the component 
 * 
 * For documentation of Next UI's dropdown 
 * @see https://nextui.org/docs/components/dropdown#dropdown-props
 */
const CoreDropdown = ({ triggerNode, options, children, menuProps, itemProps, ...restProps }: CoreDropdownProps) => {
    return (
        <Dropdown {...restProps} classNames={{
            content: cn("core-dropdown shadow-elevated-lite border border-lucid-grey-300 rounded-lg p-0", restProps?.classNames?.content),
            ...restProps?.classNames
        }}  >
            <DropdownTrigger>
                {triggerNode}
            </DropdownTrigger>
            <DropdownMenu items={options} {...menuProps} >
                {


                    (!children ?

                        (item: Record<string, any>) => (
                            <DropdownItem
                                {...itemProps}
                                key={item.key}
                            >
                                {item.label}
                            </DropdownItem>
                        )

                        :
                        children

                    ) as any}

            </DropdownMenu>
        </Dropdown>
    )
}

const CoreDropdownItem = DropdownItem;
const CoreDropdownSection = DropdownSection;
export type CoreDropdownItemProps = DropdownItemProps;
export type CoreDropDownSectionProps = DropdownSectionProps;
export {
    CoreDropdownItem,
    CoreDropdownSection
}

export default CoreDropdown;

export {
    type Selection
}