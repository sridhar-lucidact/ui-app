
import { TEvent, TInjectFormConf } from "~/types/schema/common.type";
import { EventActionType } from "~/types/schema/enum.type";
import { generateValues, hydrateString } from "~/utils/appHelper";
import cloneDeep from "lodash/cloneDeep";
import { http } from "~/utils/https";
import { ConfType } from "~/types/compoundTypes";
import { findAndAddTab } from "~/hooks/useNewTab";
import { findPathParamsWithConfig, getDialogBasePath, getPatientBasePath } from "~/utils/pathUtils";
import { history } from "~/__helper/history";
import store from "~/store";
import { injectForm, mergeForm, restoreConf } from "~/store/appConf";

export const injectConfigInApp = (payload: TInjectFormConf, dispatcher = store.dispatch) => {
  dispatcher(injectForm(payload))
}

export const mergeConfigInApp = (payload: TInjectFormConf, dispatcher = store.dispatch) => {
  dispatcher(mergeForm(payload))
}
export const restoreConfig = (dispatcher = store.dispatch) => {
  dispatcher(restoreConf())
}

type TBaseEventOptions<T> = {
  conf: ConfType,
  data: T,
  responses: any[],
  id?: string,
  pathValues?: {[key: string]: string},
  queryParams?: {[key: string]: string}
}

type TEventsOptions<T> = TBaseEventOptions<T> & {
  executeEventOptionIndex?: number
  events: TEvent[] | undefined
}

export async function executeEventOption<T>(options: TEventsOptions<T>) {
  const { executeEventOptionIndex, events, conf, data, responses, id } = options;
  if (!events) return [];

  const allEventResponses: any[] = cloneDeep(responses)
  const eventResponses: any[] = []
  for (let event of events) {
    const eventResponse = await executeEvent({event, id, conf, data, responses: allEventResponses});
    eventResponses.push(eventResponse);
    if (typeof executeEventOptionIndex === 'number') {
      allEventResponses[executeEventOptionIndex].push(eventResponse)
    } else {
      allEventResponses.push(eventResponse)
    }
  }
  return eventResponses;
}

type TEventOptions<T> = TBaseEventOptions<T> & {
  event: TEvent,
}

export function getQuery(location = window.location) {
  const qs = location.search.replace("?", "");
  const queries = qs.split("&");
  return queries.reduce((a, q) => {
    const [ key, value ] = q.split("=");
    a[key] = value;
    return a;
  }, {} as {[key: string]: string})
}

export function executeEvents(events: TEvent[]) {
  executeEventOption<any>({
    events,
    conf: {} as ConfType,
    data: null,
    responses: [],
  })
}


export function executeEvent<T>(options: TEventOptions<T>) {
  // console.log('executeEvent', options)
  const { event, conf, data, responses, id } = options;
  const locationConfig = findPathParamsWithConfig(location.pathname)
  let pathValues: {[key: string]: string} = locationConfig?.pathParams ?? {}
  const queryParams: {[key: string]: string} = getQuery(window.location)
  
  if (id) {
    const config = findPathParamsWithConfig(id)
    pathValues = {
      ...config?.pathParams,
      ...pathValues,
    }
  }

  switch (event.action) {
    case EventActionType.APICall:
      return executeAPIEvent<T>({event, conf, data, responses, id, pathValues, queryParams});
    case EventActionType.Function:
      return null;
    case EventActionType.PatientTab:
      openPatientTab({event, conf, data, responses, id, pathValues, queryParams});
      return null;
    case EventActionType.Dialog:
      openDialog({event, conf, data, responses, id, pathValues, queryParams});
      return null;
    case EventActionType.NewWindow:
      if (event.apiConf) {
        window
          .open(hydrateString(event.apiConf.path || id || "", conf, data, responses, pathValues, queryParams), '_blank')
          ?.focus()
      }
    break;
    case EventActionType.Redirect:
      if (event.apiConf) {
        window.location.href = hydrateString(event.apiConf.path || id || "", conf, data, responses, pathValues, queryParams)
      }
    break;
    case EventActionType.Refresh:
      window.location.reload()
    break;
    case EventActionType.InjectForm:
      const injectConf = {...event?.injectConf as TInjectFormConf}
      if (id) injectConf.id
      if (injectConf.target) injectConf.target = hydrateString(injectConf.target, conf, data, responses, pathValues, queryParams)
      if (injectConf.source) injectConf.source = hydrateString(injectConf.source, conf, data, responses, pathValues, queryParams)
        injectConfigInApp(injectConf)
    break;
    case EventActionType.MergeForm:
      const mergeConf = {...event?.injectConf as TInjectFormConf}
      if (id) mergeConf.id
      if (mergeConf.target) mergeConf.target = hydrateString(mergeConf.target, conf, data, responses, pathValues, queryParams)
      if (mergeConf.source) mergeConf.source = hydrateString(mergeConf.source, conf, data, responses, pathValues, queryParams)
        mergeConfigInApp(mergeConf)
    break;
    case EventActionType.Refresh:
      restoreConfig()
    break;
    case EventActionType.Bookmark:
      // restoreConfig()
      window.location.href = "#"
    break;
    default:
      console.debug("Event ignored, action not recognized", event)
    // do nothing
  }
}

export function openPatientTab<T>(options: TEventOptions<T>) {
  const { event, conf, data, responses, id, pathValues, queryParams } = options;
  const basePath = getPatientBasePath()
  const path = basePath + "/" + hydrateString(event?.patientConf?.path || id || "", conf, data, responses, pathValues, queryParams)
  findAndAddTab(path)
  if (history?.navigate) {
    history.navigate("/" + path);
  }
}

export function openDialog<T>(options: TEventOptions<T>) {
  const { event, conf, data, responses, id, pathValues, queryParams } = options;
  const basePath = getDialogBasePath();
  const path = basePath + "/" + hydrateString(event?.dialogConf?.path || id || "", conf, data, responses, pathValues, queryParams)
  if (history?.navigate) {
    history.navigate(`${location.pathname}#/${path}`);
  }
}

const apiUrls: {[key: string]: string} = {
  "clinic/dashboard": import.meta.env.VITE_API_CLINIC_DASHBOARD,
  "clinic/alerts": import.meta.env.VITE_API_CLINIC_ALERTS,
  "clinic/devices": import.meta.env.VITE_API_CLINIC_DEVICES,
  "clinic/enrollments": import.meta.env.VITE_API_CLINIC_ENROLLMENTS,
  "clinic/patients": import.meta.env.VITE_API_CLINIC_PATIENTS,
  "clinic/reports": import.meta.env.VITE_API_CLINIC_REPORTS,
  "clinic/patient": import.meta.env.VITE_API_CLINIC_PATIENT
}

const getApiUrl = () => {
  const [, path1, path2] = window.location.pathname.split("/")
  const path = path1 + "/" + path2
  return apiUrls[path] || import.meta.env.VITE_API_URL
}

async function executeAPIEvent<T>(options: TEventOptions<T>) {
  const { event, conf, data, responses, id, pathValues, queryParams: queryValue } = options;
  const method = event.apiConf?.method || "GET";
  const path = hydrateString(event.apiConf?.path || id || "", conf, data, responses, pathValues, queryValue);
  let payload = null;
  if (event.apiConf?.payload) {
    payload = generateValues(event.apiConf.payload, conf, data, responses, pathValues, queryValue)
  }
  let queryParams = null;
  if (event.apiConf?.queryParams) {
    queryParams = generateValues(event.apiConf.queryParams, conf, data, responses, pathValues, queryValue)
  }
  let url = path
  if (!url.includes("http")) url = getApiUrl() + "/" + path
  
  const response = await http({
    method: method,
    url,
    data: payload,
    params: queryParams
  })
  return response.data;
}