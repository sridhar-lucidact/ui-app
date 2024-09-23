import { cloneDeep } from 'lodash';
import { TCardBarSchema, TCardSchema } from '~/types/schema/card.type';
import { TInjectFormAction, TInjectFormConf } from '~/types/schema/common.type';
import { TRow } from '~/types/schema/page.type';
import { THeaderTab, TLaTab, TTab } from '~/types/schema/tab.type';
import { TFieldSpec, TForm, TWidget } from '~/types/schema/widget.type';
import { findPathParamsWithConfig, getValuesFromIdOrPath } from '~/utils/pathUtils';
import dottie from 'dottie';
import { Form } from 'la-ui-schema/lib/WidgetModule';
import { LayoutContent } from 'la-ui-schema/lib/PageModule';
import clinicConf from "ui-conf/ui-clinic.json";
import formsConf from "ui-conf/ui-forms.json";
import pagesConf from "ui-conf/ui-pages.json";
import patientConf from "ui-conf/ui-patient.json";
import { hydrateString, isBlank } from './appHelper';

type TRowContent = TCardSchema[] | TWidget[] | TTab[]
type TWidgetForm = TCardBarSchema | TWidget | TCardSchema | TTab | TRow

export interface TLayoutFormContent {
  tabIndex: number
  subTabIndex: number
  layoutContent?: any
  layoutContentIndex: number
  rows?: TRowContent[]
  rowIndex: number
  rowContent?: TRowContent
  rowContentIndex: number
  card?: TCardSchema
  cardIndex: number
  widget?: TWidgetForm
  form?: TForm
  formIndex: number
  formCol?: TFieldSpec|Form
  formRowIndex: number
  formColIndex: number
}

export const defaultForms  = () => cloneDeep(formsConf);


export const defaultClinicConfig = () => ({
  headerTabs: cloneDeep(clinicConf),
  patient: cloneDeep(patientConf),
  pages: cloneDeep(pagesConf),
  forms: cloneDeep(formsConf),
})

export const getIndexToUpdate = (indexValue: number, action: TInjectFormAction) => {
  return action === "append" ? indexValue + 1 : indexValue 
}

export const getIndexToReplace = (action: TInjectFormAction) => {
  return action === "replace" ? 1 : 0 
}

export const runner = (str: string) => new Function("return " + str)()

export type TAnyForm = TFieldSpec | TWidget | TForm | TCardBarSchema | TCardSchema

export function checkHidden(conf: TAnyForm, data: any, uiConf?: TAnyForm, isEditing?: boolean) {
  let hideConf = dottie.get(conf, "hide") || dottie.get(conf, "controls.hide") 
  
  if (!isBlank(uiConf?.hide)) hideConf = uiConf?.hide
  let viewUiConf: TAnyForm | undefined;
  let addUiConf: TAnyForm | undefined;

  if (uiConf?.hasOwnProperty("formType")) {
    const formType = (uiConf as TFieldSpec)?.formType
    viewUiConf = formType?.View as TAnyForm
    addUiConf = formType?.Add as TAnyForm
  }
  
  if(!isEditing && viewUiConf && viewUiConf.hasOwnProperty("hide")) {
    hideConf = viewUiConf.hide
  }
  
  if(isEditing && addUiConf && addUiConf.hasOwnProperty("hide")) {
    hideConf = addUiConf.hide
  }
  let isHidden = hideConf ? hydrateString(hideConf as unknown as string, conf, data, [], {}, {}) : false

  if (isHidden) {
    isHidden = runner(isHidden as string)
  }

  return isHidden
};

type TFindElementByIdResult = {
  conf: any,
  index: number | undefined,
  parentConf: any
}

export function findElementById(jsonConf: any, id: string, depth: number = 0): TFindElementByIdResult {

  let result: TFindElementByIdResult = {
    conf: undefined,
    index: undefined,
    parentConf: undefined
  }

  if (!jsonConf) {
    return result
  }
  
  if (Array.isArray(jsonConf)) {
    let index = 0;
    for (const tab of jsonConf) {
      if (tab.rowContent) {
        result = findElementById(tab.rowContent, id, depth + 1);
      } else {
        result = findElementById(tab, id, depth + 1);
        if (result.conf && !result.parentConf) {
          result.parentConf = jsonConf;
        };
      }
      if (result.conf) {
        if (result.index === undefined) result.index = index;
        return result
      };
      index++;
    }
  }
    
  if (jsonConf.id === id) {
    result.conf = jsonConf;
  } else if (id.includes(jsonConf.id)) {
    const remainingId = id.replace(jsonConf.id, "")
    const trimmedId = remainingId.startsWith('/') ? remainingId.slice(1) : remainingId;
    const nextElement = jsonConf.subTabs 
      || jsonConf.layoutContent 
      || jsonConf.cards 
      || jsonConf.containerContent
      || jsonConf.rowContent
      || jsonConf.cardContent
      || jsonConf.form
      || jsonConf.rows
    result = findElementById(nextElement, trimmedId, depth + 1);
  } else if (jsonConf.rowContent) {
    result = findElementById(jsonConf.rowContent, id, depth + 1);
  }

  if (!result.conf && depth === 0) {
    const config = findPathParamsWithConfig(id)
    if (config) {
      id = hydrateString(id, undefined, undefined, undefined, config.pathParams, undefined)
    }
    // console.log('conf not found at depth 0', id, config, cloneDeep(jsonConf))
    result = findElementById(config?.tab, id, depth + 1);
  }

  return result;
}