import { THeaderTab, TLaTab, TPatientTab } from "~/types/schema/tab.type";
import { defaultClinicConfig, defaultForms } from "./confUtils";

export interface PathVariables {
  [key: string]: string
}

export interface ParsedPathParams {
  matchedPath: boolean
  variables: PathVariables
  id: string
  path: string
}

export interface PathParamsAndConfig {
  tab: TLaTab
  pathParams: PathVariables
}

export function getPatientBasePath() {
  const path = location.pathname.split("/");
  return path[1] + "/patient"
}

export function getDialogBasePath() {
  return "dialog"
}

/**
 * 
 * @param path this is the full hydrated url
 * @return Object
 */
export const findPathParamsWithConfig = (path: string): PathParamsAndConfig | undefined => {
  if (path.startsWith("/")) path = path.replace("/", "")

  let config: PathParamsAndConfig | undefined;
  if (path.includes("dialog")) {
    const configPath = (path.split("#")[1] || path || "").replace("/" + getDialogBasePath(), "");
    config = findConfigFromTabs(configPath, defaultClinicConfig().pages as unknown as THeaderTab[])
    if (config?.tab?.id && !config.tab.id.includes("dialog")) {
      config.tab = {
        ...config?.tab,
        id: `dialog/${config.tab.id}`
      }
    }
  } else if ( path.includes("patient/")) {
    const configPath = (path.split("#")[0] || "").replace(getPatientBasePath() + "/", "");
    config = findConfigFromTabs(configPath, defaultClinicConfig().patient as unknown as TPatientTab[])
    if (config?.tab?.id && !config.tab.id.includes("patient")) {
      config.tab= {
        ...config?.tab,
        id: `clinic/patient/${config.tab.id}`
      }
    }
  } else {
    const configPath = (path.split("#")[0] || "").replace(getPatientBasePath(), "");
    config = findConfigFromTabs(configPath, defaultClinicConfig().headerTabs as THeaderTab[])
  }

  if (!config) {
    config = findConfigFromTabs(path, defaultForms() as unknown as TLaTab[])
  }
  return config;
}

const findConfigFromTabs = (path: string, tabs: TLaTab[]): PathParamsAndConfig | undefined => {
  if (path.startsWith("/")) path = path.replace("/", "")

  let parsedPathParams: ParsedPathParams | undefined;

  const tab = tabs.find((tab) => {
    parsedPathParams = findPathParamsById(path, tab?.id as string);
    if (parsedPathParams?.matchedPath) {
      return true;
    }
    return false
  });
  
  if (tab && parsedPathParams) {
    return {
      tab: {
        ...tab,
        id: parsedPathParams?.id || tab?.id,
        delete: true
      },
      pathParams: parsedPathParams.variables
    }
  }
}

/**
 * 
 * @param path this is the full hydrated url
 * @param id this is the id, where path param is defined
 * @return Object
 */
export const findPathParamsById = (path: string, id: string): ParsedPathParams | undefined => {
  let variables: {[key: string]: string } = {}
  let matchedPath = false;
  
  if (!id) return {
    matchedPath,
    variables,
    id,
    path
  }

  const ids = id.split("/");
  const paths = path.split("/");
  if (ids.length > paths.length) return;

  for(let [index, id] of ids.entries()) {
    if (id.startsWith("{") && id.endsWith("}")) {
      ids[index] = paths[index];
      const key = id.replace(/\{|\}/g, "")
      variables[key] = paths[index];
    } else if (ids[index] !== paths[index]) {
      break;
    }
    if ((index + 1) === ids.length) matchedPath = true
  }
  
  return {
    matchedPath,
    variables,
    id: ids.join("/"),
    path
  };
}

export function getValuesFromIdOrPath(id: string) {
  const ids: string[] = id.split("/");
  const headerId = ids.splice(0, 2).join("/")
  const subHeaderId = ids.shift() || ""
  const widgets = ids.join(".")
  return { headerId, subHeaderId, widgets }
}