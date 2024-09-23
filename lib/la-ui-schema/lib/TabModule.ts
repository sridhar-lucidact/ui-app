import { EventOptions, Icon } from "./CommonModule";
import { PatientStatus } from "./EnumModule";
import { LayoutContent } from "./PageModule";

export interface Tab {
    id : string;
    title: string;   
    hide?: true; 
    isActive?: true;
    isDisabled?: true;
    layoutContent: LayoutContent;
}

export interface HeaderTab extends Omit<Tab,"layoutContent"> {
    icon?: Icon;
    subTabs?: Tab[];
    subTitle?: string;
}

export interface PatientTab extends HeaderTab {
    status: PatientStatus;
    mrn: string;
    event?:EventOptions[];
}