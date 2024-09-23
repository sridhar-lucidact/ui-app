import { TitleBar } from "./TitleBarModule";
import { EventOptions, GraphData, Text } from "./CommonModule";
import { BootStrapColSize } from "./EnumModule";


interface CardData {
    value: Text;
    subValue?: Text;
    graphData?: GraphData
}
type CardDataMini = Omit<CardData, "graphData">;

export interface Card {
    id: string;
    event?:EventOptions[];
    hide?: true;
    titleBar: TitleBar;
    colSize?: BootStrapColSize;
    cardContent?: [CardDataMini, CardDataMini]|CardData;
}


export interface CardBar {
    id: string,
    event?:EventOptions[];
    colSize?: BootStrapColSize;
    hide?: true;
    cards: Card[];
}