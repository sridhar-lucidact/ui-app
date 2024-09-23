import { EventOptions, Icon, GraphData, GridOptions } from "./CommonModule";
import { BootStrapColSize, FieldType, LabelAlign, RowSize, WidgetType } from "./EnumModule";
import { TitleBar, WidgetTitleBar } from "./TitleBarModule";

export interface Validation {
    maxLength?: number;
    minLength?: number;
    maxValue?: number;
    minValue?: number;
    future?: boolean;
    past?: boolean;
    required?: true;
}

export interface Form {
    id: string;
    titleBar?: TitleBar;
    colSize?: BootStrapColSize;
    rowSize?: RowSize;
    event?:EventOptions[];
    hide?: true;
    subForm?: true;
    type: WidgetType;
    rows?: (FieldSpec|Form)[][];
    graphData?: GraphData;
    gridOptions?: GridOptions;
    gridData?: {
        data:[],
        totalRecords: number,
        currentPage?: number 
    }        
}

export interface FieldControls {
    focus?: true;    
    hide?: true|string;
    readOnly?: true;
    remove?: true;
}

export interface FieldOptions {
    label?: string; 
    icon?: Icon, 
    value: string, 
    default?: true
}

export interface DateFieldConf {
    showRange?: true;
    showTime?: true;
    showTimeZone?: true;    
}

export type RangeValues = string[]|number[];

export interface FieldSpec {
    id: string;
    colSize?: BootStrapColSize;
    fieldType?: FieldType;
    name?: string;
    label?: string;
    labelIcon?: Icon;
    labelAlign?: LabelAlign;
    value?: string;
    valueIcon?: Icon;
    defaultValue?: string;
    selectValues?: string[];
    event?: EventOptions[];
    validation?: Validation;
    controls?: FieldControls;
    rangeValues?: RangeValues;
    options?: FieldOptions[];
    dateConf?: DateFieldConf;
}

export interface Widget {
    id: string;
    event?: EventOptions[];
    titleBar: WidgetTitleBar;
    colSize?: BootStrapColSize;
    rowSize?: RowSize;
    hide?: true;
    form?: Form[];    
}