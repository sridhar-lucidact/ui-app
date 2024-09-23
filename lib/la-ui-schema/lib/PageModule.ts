import { CardBar } from "./CardModule";
import { BootStrapColSize } from "./EnumModule";
import { HeaderTab, PatientTab } from "./TabModule";
import { Form, Widget } from "./WidgetModule";

export type Container = {
    colSize?: BootStrapColSize;
    containerContent: (CardBar|Widget|Row)[]; 
}
export type Row = {
    colSize: BootStrapColSize.col_12;
    rowContent: (CardBar|Widget|Container)[];
};
export type FluidLayout = (CardBar|Widget|Row|Container)[]; 
export type OneColumnLayout = Row[];
export type TwoColumnLayout = [Row[],Row[]];

export type LayoutContent = FluidLayout|TwoColumnLayout|OneColumnLayout;

export type Page = {
    headerTabs: HeaderTab[];
    pages?: PageContainer[];
    forms?: Form[];
    patient?: PatientTab[];
}

export type PageContainer = {
    id: string;    
    layoutContent: LayoutContent;
}