import { EventType, EventActionType, HttpMethod } from "./EnumModule";

export type GraphData = {    
};

export type GridControls = {
    addRecord?: Event;
    searchRecords?: true;
    groupRecords?: true;
    hideColumns?: true;
    exportReords?: true;
}

export type GridPagination = {
    pagination?: true;    
    pageSize?: 100|50|20|10;
    paginationStyle?: 'Incremental'
}

export type GridOptions = {
    columnDefs?: {
        headerName?: string;
        valueGetter?: string;
        field?: string;
    }[];
    controls?: GridControls;
    filters?: {};
    pagination?: GridPagination;    
};

export type Icon = string;

export interface Event {
    action?: EventActionType;
    cellFieldName?: string;
    seriesName?: string;
    fieldValue?: string|string[]|boolean;
    apiConf?: {
        method?: HttpMethod;
        path?: string;
        queryParams?: {[key: string]: string|number|boolean};
        payload?: {[key: string]: string|number|boolean};
    };
    dialogConf?: {
        path: string;
        queryParams?: {[key: string]: string|number|boolean};
    };
    patientConf?: {
        path: string;
    };
    tabConf?: {
        path: string;
        label: string;
        icon?: Icon;
    };
    injectConf?: InjectFormConf;
}

export interface EventOptions {
    [EventType.OnActiveTab]?: Event[];
    [EventType.OnBlur]?: Event[];
    [EventType.OnCellClick]?: Event[];
    [EventType.OnCellDoubleClick]?: Event[];
    [EventType.OnChange]?: Event[];    
    [EventType.OnClick]?: Event[];
    [EventType.OnClose]?: Event[];
    [EventType.OnDelete]?: Event[];    
    [EventType.OnExpand]?: Event[];
    [EventType.OnFocus]?: Event[];
    [EventType.OnGridPageChange]?: Event[];
    [EventType.OnLoad]?: Event[];
    [EventType.OnKeydown]?: Event[];
    [EventType.OnKeyup]?: Event[];
    [EventType.OnPrevious]?: Event[];
    [EventType.OnNext]?: Event[];
    [EventType.OnRefresh]?: Event[];
    [EventType.OnRowClick]?: Event[];
    [EventType.OnPointClick]?: Event[];
    [EventType.OnSelect]?: Event[];    
    [EventType.OnSubmit]?: Event[];    
}

export enum InjectFormAction {
    append = 'append',
    prepend = 'prepend',
    replace = 'replace',
    remove = 'remove'
}

export interface InjectFormConf {
    source: string
    target?: string
    action: InjectFormAction
    as?: string
}


export interface Text {
    color?: string;
    icon?: Icon;
    text: string;
}