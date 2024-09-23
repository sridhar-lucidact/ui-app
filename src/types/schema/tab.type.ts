import {
  Tab,
  HeaderTab,
  PatientTab,
} from 'la-ui-schema/lib/TabModule';

export interface TTab extends Tab {}
export interface THeaderTab extends HeaderTab {}
export interface TPatientTab extends PatientTab {
  delete: true
}
export type TLaTab = TTab | THeaderTab | TPatientTab