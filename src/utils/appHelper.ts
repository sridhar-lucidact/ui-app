import dottie from "dottie";
import { ConfType } from "~/types/compoundTypes";
import { getValuesFromIdOrPath } from "./pathUtils";

export function hydrateString<T>(str: string, formConf?: ConfType, data?: T, response?: any[], pathValues?: {[key: string]: string}, queryValues?: {[key: string]: string}) {
  if(typeof str === 'string') {
    const re = /(\$\{.+?\})/g;
    str = str.replace(re, (g) => replaceDynamicValues<T>(g, formConf, data, response, pathValues, queryValues));
  }
  return str;
}

export function replaceDynamicValues<T>(str: string, formConf?: ConfType, data?: T, responses?: any[], pathValues?: {[key: string]: string}, queryValues?: {[key: string]: string}) {
  let value: string | T | any[] | undefined;
  if(typeof str !== "string") return str;
  let cleanStr = str.replace(/[${}]/g, '').replace(/(]\[)/g, '.').replace(/[[\]]/g, '');
  let key = null;
  switch(true) {
    case cleanStr === 'this':
      value = data;
      break;
    case cleanStr.startsWith('this'):
      key = cleanStr.replace('this.', '');
      value = dottie.get(data as Object, key);
      if (isBlank(value) && formConf) value = dottie.get(formConf, key);
      if (isBlank(value) && pathValues) value = dottie.get(pathValues, key)
      if (isBlank(value) && queryValues) value = dottie.get(queryValues, key)
      break;
    case cleanStr.startsWith('path') && !!pathValues:
      key = cleanStr.replace('path.', '');
      value = dottie.get(pathValues, key)
      break;
    case cleanStr.startsWith('query') && !!queryValues:
      key = cleanStr.replace('query.', '');
      value = dottie.get(queryValues, key)
      break;
    case cleanStr.startsWith('parent'):
      key = cleanStr.replace('parent.', '');
      value = dottie.get(data as Object, key);
      if (isBlank(value) && formConf) value = dottie.get(formConf, key);
      break;
    case cleanStr === 'events':
      value = responses;
      break;
    case cleanStr.startsWith('events') && !!responses:
      let str2 = cleanStr.replace(/(events)/g, '');
      if (str2.startsWith('.')) str2 = str2.replace('.', '');
      value = dottie.get(responses, str);
      break;
    default:
      value = str;
      break;
  }
  if(isBlank(value)) value = '';
  return value as string;
}


export function isBlank(v: any) {
  return v === null 
    || v === undefined 
    || v === '' 
    || JSON.stringify(v) === '{}' 
    || JSON.stringify(v) === '[]';
}

type ValuesType = {[key: string]: string|number|boolean}

export function generateValues<T>(payload: ValuesType, conf: ConfType, data: T, responses: any[], pathValues?: {[key: string]: string}, queryValues?: {[key: string]: string}) {
  if (!payload) return payload;
  let newPayload: any = {}
  const payloadKeys = dottie.paths(payload).sort((__, b) => b.includes("___") ? 0 : -1);

  payloadKeys.forEach(payloadKey => {
    const keyValue: any = dottie.get(payload, payloadKey);
    const value = replaceDynamicValues(keyValue, conf, data, responses, pathValues, queryValues);
    if (payloadKey === "___") {
      newPayload = value;
    } else if (payloadKey.includes(".___")) {
      dottie.set(newPayload, payloadKey.replace(".___", ""), value)
    } else {
      dottie.set(newPayload, payloadKey, value)
    }
  })
  return newPayload;
}

export function getAppKeyFromId(id: string) {
  const { headerId, subHeaderId, widgets } = getValuesFromIdOrPath(id);
  const keys = [];
  if (headerId) keys.push(headerId)
  if (subHeaderId) keys.push(subHeaderId)
  if (widgets) keys.push(widgets)
  if (id=== "clinic/patient/M00578/detail/profile/widget/patientdetail/careprogram") {
    console.log(keys)
  }
  return keys.join(".");
}