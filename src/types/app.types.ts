import { TGraphData, TText } from "./schema/common.type";

export interface TCardData {
  value: TText;
  subValue?: TText;
  graphData?: TGraphData
}

export type TCardDataMini = Omit<TCardData, "graphData">;

export type TCardContent = [TCardDataMini, TCardDataMini] | TCardData

export interface TCardBodyTextProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  value: Text,
  subValue?: Text,
  data?: Text,
  graphData?: TGraphData,
}

// common
export interface TOption {
  label: string
  value: string
  icon?: string
  default?: true
}

export interface TPatientTabData {
  mrn?: string
  name?: string
  status?: string
}