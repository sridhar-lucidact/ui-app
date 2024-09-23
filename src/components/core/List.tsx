
import {
    Listbox,
    ListboxProps,
    ListboxItem,
    ListboxItemProps,
    ListboxSection,
    ListboxSectionProps
} from "@nextui-org/listbox";



type CustomCoreListProps = {
    children: React.ReactNode,
    onSelect?: (key: string) => void,
}

type CoreListProps = Omit<ListboxProps, "children" | "onSelect"> & CustomCoreListProps


/**
 * Component which wraps next-ui's listbox component and provides a standard functionality for easy use
 * 
 * For documentation 
 * @see https://nextui.org/docs/components/listbox#listbox-props
 */
const CoreList = ({ children, onSelect, ...restProps }: CoreListProps) => {
    return (
        <Listbox
            {...restProps}
            onAction={(key) => {
                onSelect?.(key as string)
            }}
        >

            {(children as any)}
        </Listbox>
    )
}


export const CoreListItem = ListboxItem;
export const CoreListSection = ListboxSection;
export type CoreListItemProps = ListboxItemProps;
export type CoreListSectionProps = ListboxSectionProps;
export default CoreList;