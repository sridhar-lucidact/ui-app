import {
  Validation,
  Form,
  FieldSpec,
  Widget,
} from 'la-ui-schema/lib/WidgetModule';
import { WidgetType } from './enum.type';
import { FieldControls } from 'la-ui-schema/lib/WidgetModule';
import { TitleBarControls } from 'la-ui-schema/lib/TitleBarModule';

export interface TValidation extends Validation {}
export interface TForm extends Form {
  sourceId?: string
  targetId?: string
  targetAction?: string
  hide?: true;
}

type TFormTypeConf = {
  [WidgetType.Add]: TFieldSpec
  [WidgetType.View]: TFieldSpec
}
export interface TFieldSpec extends FieldSpec {
  hide?: boolean,
  formType?: TFormTypeConf
}
export type TFormRowColumn = FieldSpec|Form
export interface TWidget extends Widget {}
export interface TFieldControls extends FieldControls {
  collapse?: boolean
}
export interface TTitleBarControls extends TitleBarControls {}