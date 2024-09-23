import { useDispatch } from "react-redux";
import { addTab, removeTab } from "~/store/appConf";
import { findPathParamsWithConfig } from "~/utils/pathUtils";
import store from "~/store";
import { THeaderTab, TLaTab, TTab } from "~/types/schema/tab.type";
import { history } from "~/__helper/history";
import { findDefaultTab } from "~/utils/headerUtils";

export const findAndAddTab = (id: string) => {
  // console.log('findAndAddTab')
  const paramsWithConfig = findPathParamsWithConfig(id);
  if (paramsWithConfig) {
    addConfig({
      ...paramsWithConfig.tab,
      id,
      delete: true
    });
  }
}

export const addConfig = (tab: any, dispatcher = store.dispatch) => {
  // console.log('addConfig')
  dispatcher(addTab(tab))
}

const moveToDefaultTab = () => {
  const tabs = store.getState().appConf.tabs as TLaTab[]
  // console.log('tabs', console.log(JSON.stringify(tabs)))
  const tab = findDefaultTab(tabs) as THeaderTab;
  const path = [tab.id]
  const subTab = tab?.subTabs ? tab.subTabs[0] : null;
  if (subTab) {
    path.push(subTab.id)
  }
  if (history?.navigate) {
    history.navigate(path.join('/'))
  }
}

export const removeConfig = async (id: string, dispatcher = store.dispatch) => {
  if (location.pathname.includes("/patient/")) {
    moveToDefaultTab()
  }

  setTimeout(() => {
    dispatcher(removeTab(id))
  }, 250)

}

export function useNewTab() {
  const dispatch = useDispatch();

  const addNewTab = (id: string) => {
    // console.log('addNewTab')
    findAndAddTab(id);
  }

  const addNewConfig = (tab: any) => {
    addConfig(tab, dispatch);
  }

  const removeTabById = (id: string) => {
    removeConfig(id, dispatch);
  }

  return { addNewTab, addNewConfig, removeTabById }
}