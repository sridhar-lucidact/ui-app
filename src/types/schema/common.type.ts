import {
  GraphData,
  GridOptions,
  Icon,
  InjectFormConf,
  Event,
  EventOptions,
  Text,
  InjectFormAction,
  GridControls,
  GridPagination
} from 'la-ui-schema/lib/CommonModule';

export interface TGraphData extends GraphData {}

export interface TGridControls extends GridControls {}
export interface TGridPagination extends GridPagination {}
export interface TGridOptions extends GridOptions {}

export type TIcon = Icon

export interface TInjectFormConf extends InjectFormConf {
  id: string
}

export type TInjectFormAction = InjectFormAction & {}

export interface TEvent extends Event {}

export interface TEventOptions extends EventOptions {}

export interface TText extends Text {}