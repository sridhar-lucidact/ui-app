import dottie from "dottie";
import { isEmpty } from "lodash";
import { notify, TNotify } from "~/components/Notification";
import { deepMerge } from "~/utils/objectHelper";
import { getValuesFromIdOrPath } from "~/utils/pathUtils";

type TAnyObject = {[key: string]: any}

const parseDataArray = (v: any[]) => {
  let response: TAnyObject | null = {}

  if (!v[0] || !v[0].data) {
    return v;
  }

  for(let item of v) {
    if (item.id && response) {
      response[item.id] = parseData(item.data)
    }
  }

  return response;
}

const parseData  = (d: any): TAnyObject | null => {
  let response: TAnyObject | null = {}
  
  if (!d) return null;

  if (Array.isArray(d)) {
    response = parseDataArray(d);
  } else {
    for (const [key, value] of Object.entries(d)) {
      response[key] = value 
    }
  }
  return response;
}

const getRepeatValues = (values: TAnyObject, response: TAnyObject) => {
  const repeatValues: TAnyObject[] = [];
  for (let valueKey in values) {
    if (!response.hasOwnProperty(valueKey)) {
      response[valueKey] = []
    }
    response[valueKey].push(values[valueKey]);
  }
}

const parseRepeat = (d?: any[]): TAnyObject | null => {
  if (!d || d.length === 0) return null;

  const response: { data: TAnyObject, uiConf: TAnyObject } = {
    data: {},
    uiConf: {}
  };

  d.forEach(item => {
    const { data, uiConf } = item;
    if (data) getRepeatValues(data, response.data);
    if (uiConf) getRepeatValues(dottie.transform(uiConf), response.uiConf);
  });

  return isEmpty(response.data) && isEmpty(response.uiConf) ? null : response;
}

const parseAndShowAlert = (d: { data?: { alert?: TNotify }, alert?: TNotify }): void => {
  const alertMessage = d.alert || d.data?.alert;
  if (alertMessage) {
    notify(alertMessage);
  }
}

const parseResponse = (d: any) => {
  if (!d) return {}
  parseAndShowAlert(d);
  const {id, data, gridData, uiConf, repeat } = d;
  const { headerId, subHeaderId, widgets } = getValuesFromIdOrPath(id);
  let parsedData = parseData(data) as TAnyObject;
  let parseRepeatConf = parseRepeat(repeat);
  
  if (gridData) {
    if (!parsedData) parsedData = {} as TAnyObject;
    parsedData['gridData'] = gridData;
  }
  
  let widgetData: any = parsedData;
  let widgetConf: any = uiConf ? dottie.transform(uiConf) : null;
  let repeatData: any = parseRepeatConf?.data;
  let repeatUiConf: any = parseRepeatConf?.uiConf;
  if(!isEmpty(widgets) && widgetData) widgetData = { [widgets]: widgetData }
  if(!isEmpty(widgets) && uiConf) widgetConf = { [widgets]: widgetConf }
  if(!isEmpty(widgets) && repeatData) repeatData = { [widgets]: repeatData }
  if(!isEmpty(widgets) && repeatUiConf) repeatUiConf = { [widgets]: repeatUiConf }

  
  let subWidgetData: any = widgetData ? dottie.transform(widgetData) : null;
  let subWidgetConf: any = widgetConf ? dottie.transform(widgetConf) : null;
  let subRepeatData: any = repeatData ? dottie.transform(repeatData) : null;
  let subRepeatUiConf: any = repeatUiConf ? dottie.transform(repeatUiConf) : null;
  if(!isEmpty(subHeaderId) && subWidgetData) subWidgetData = { [subHeaderId]: subWidgetData };
  if(!isEmpty(subHeaderId) && subWidgetConf) subWidgetConf = { [subHeaderId]: subWidgetConf };
  if(!isEmpty(subHeaderId) && subRepeatData) subRepeatData = { [subHeaderId]: subRepeatData };
  if(!isEmpty(subHeaderId) && subRepeatUiConf) subRepeatUiConf = { [subHeaderId]: subRepeatUiConf };


  let headerData: any = subWidgetData;
  let headerConf: any = subWidgetConf;
  let headerRepeatData: any = subRepeatData;
  let headerRepeatUiConf: any = subRepeatUiConf;
  if (!isEmpty(headerId) && headerData) headerData = { [headerId]: headerData }
  if (!isEmpty(headerId) && headerConf) headerConf = { [headerId]: headerConf }
  if (!isEmpty(headerId) && headerRepeatData) headerRepeatData = { [headerId]: headerRepeatData }
  if (!isEmpty(headerId) && headerRepeatUiConf) headerRepeatUiConf = { [headerId]: headerRepeatUiConf }

  return {
    data: headerData,
    uiConf: headerConf,
    repeat: {
      data: headerRepeatData,
      uiConf: headerRepeatUiConf
    }
  };
}

function parseAndMerge (response: any, dataUpdates: any) {
  const parsedResponse = parseResponse(response);
  deepMerge(dataUpdates.data, parsedResponse.data);
  deepMerge(dataUpdates.uiConf, parsedResponse.uiConf);
  deepMerge(dataUpdates.repeat.data, parsedResponse.repeat?.data);
  deepMerge(dataUpdates.repeat.uiConf, parsedResponse.repeat?.uiConf);
}

export const parseResponses = (eventResponses: any[], dataUpdates: any) =>  {
  try {
    eventResponses.forEach((eventResponse) => {
      if (Array.isArray(eventResponse)) {
        eventResponse.forEach((d: any) => parseAndMerge(d, dataUpdates)) 
      } else if (eventResponse?.data && Array.isArray(eventResponse?.data)) {
        eventResponse.data.forEach((d: any) => parseAndMerge(d, dataUpdates)) 
      } else {
        parseAndMerge(eventResponse, dataUpdates)
      }
    });
  } catch (error) {
    console.log("Can't parse response", error, eventResponses);
  }
}