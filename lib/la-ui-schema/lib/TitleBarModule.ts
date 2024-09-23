import { EventOptions, Icon } from "./CommonModule";
import { Tab } from "./TabModule";

export interface Filter {
    
}

export interface Menu {
    id: string;
    events?: EventOptions[];
    title: string;
    multiSelect?: true;
    menuOptions: MenuOption[];
}

export interface MenuOption {
    id: string;
    title: string;
    icon?: Icon;
    isActive?: boolean;
    isDefault?: boolean;
    isDisabled?: boolean;
    events?: EventOptions[];
    subMenu?: MenuOption[];
}

export interface TitleBarControls {
    collapse?: boolean|'Accordion';
    pointer?: EventOptions[];
}

export interface TitleBar {
    title: string;
    menu?: Menu[];
    filter?: Filter[];
    controls?: TitleBarControls;
}

export interface WidgetTitleBar extends TitleBar {
    controls?: TitleBarControls,
    filters?: Filter[];
    icon?: Icon;
    menu?: Menu[];
    tabs?: Tab[];
}