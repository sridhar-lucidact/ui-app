type AnyValue = string | string[] | number | number[] | boolean | boolean[] | Object | Object[] | null

export type TEventData = {
  [key: string]: AnyValue
}

export type TEventUIConf = {
  [key: string]: AnyValue
}

export interface TBaseEventResponse {
  data?: TEventData
  uiConf?: TEventUIConf
  gridData?: TEventData[]
}

export type TEventResponse = TBaseEventResponse & {
  id?: string
  repeat?: TBaseEventResponse[]
}