import { createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash';
import { defaultClinicConfig, findElementById, getIndexToReplace, getIndexToUpdate } from '~/utils/confUtils';
import { findPathParamsWithConfig, getPatientBasePath } from '~/utils/pathUtils';
import { TLaTab } from '~/types/schema/tab.type';
import { TInjectFormAction, TInjectFormConf } from '~/types/schema/common.type';
import { findTab } from '~/utils/headerUtils';
import { TRow } from '~/types/schema/page.type';

// Define a type for the slice state
interface AppConf {
  tabs: TLaTab[]
}

// Define the initial state using that type
const initialState: AppConf = {
  tabs: defaultClinicConfig().headerTabs as TLaTab[]
}

const getTargetFormConf = (tabs: TLaTab[], targetId: string, action: TInjectFormAction) => {
  const targetFormConf = findElementById(tabs, targetId);
  if (!targetFormConf.parentConf) {
    console.log('target form conf not found for ', targetId);
    return;
  }
  targetFormConf.index = getIndexToUpdate(targetFormConf.index || 0, action);
  // console.log('targetFormConf', targetId, targetFormConf);
  return targetFormConf;
}

const getSourceFormConf = (tabs: TLaTab[], targetId: string, conf: TInjectFormConf) => {
  const sourceId = (conf.source || conf.as) as string;
  const newTabs = cloneDeep(tabs);
  if (!sourceId) {
    console.log('source id not provided');
    return;
  }
  const sourceFormConf = findElementById(newTabs, sourceId);
  if (!sourceFormConf.conf) {
    console.log('source form conf not found for ', sourceId);
    return;
  }
  // console.log('sourceFormConf', sourceId, sourceFormConf);
  if(conf.as) sourceFormConf.conf.id = conf.as;
  
  const targetAction = conf.action;
  sourceFormConf.conf.targetId = targetId;
  sourceFormConf.conf.sourceId = sourceId;
  sourceFormConf.conf.targetAction = targetAction;
  
  sourceFormConf.index = getIndexToReplace(targetAction);
  return sourceFormConf;
}

export const appSlice = createSlice({
  name: 'appConf',
  initialState,
  reducers: {
    addTab: (state, action: { payload: TLaTab }) => {
      // console.log("addTab", action)
      if (!action.payload.id) {
        console.debug("No tab id provided")
        return;
      }

      const tab = findTab(state.tabs, action.payload.id)
      if (tab) {
        console.debug("tab with id already exist", action.payload.id)
        return
      };  
      state.tabs.push(action.payload)
    },
    injectForm: (state, action: { payload: TInjectFormConf }) => {
      // console.log("injectForm", action)
      const targetId = action.payload.target || action.payload.id
      const targetFormConf = getTargetFormConf(state.tabs, targetId, action.payload.action);
      if (!targetFormConf || !targetFormConf.parentConf) return;
      
      if (action.payload.source) {
        const sourceFormConf = getSourceFormConf(state.tabs, targetId, action.payload);
        if (!sourceFormConf || !sourceFormConf.conf) return;
        targetFormConf.parentConf.splice(targetFormConf.index, sourceFormConf.index, cloneDeep(sourceFormConf.conf))
      } else {
        targetFormConf.parentConf.splice(targetFormConf.index, 1)
      }
      
    },
    mergeForm: (state, action: { payload: TInjectFormConf }) => {
      const targetId = action.payload.target || action.payload.id
      const targetFormConf = getTargetFormConf(state.tabs, targetId, action.payload.action);
      if (!targetFormConf || !targetFormConf.parentConf) return;
      
      const sourceFormConf = getSourceFormConf(state.tabs, targetId, action.payload);
      if (!sourceFormConf || !sourceFormConf.conf) return;
      
      let destConf: { rows: TRow[] } = {
        rows: []
      }

      if (targetFormConf.conf?.rows) {
        destConf = targetFormConf.conf
      } else if (targetFormConf.parentConf?.rows) {
        destConf = targetFormConf.parentConf
      }

      let sourceRows: TRow[] = [];
      if (sourceFormConf.conf?.rows) {
        sourceRows = sourceFormConf.conf.rows
      } else if (sourceFormConf.parentConf?.rows) {
        sourceRows = sourceFormConf.parentConf.rows
      }
      
      destConf.rows = [...destConf.rows, ...sourceRows]

    },
    restoreConf: (state) => {
      const existingPatientTabs = state.tabs.filter(tab => (tab?.id || "").includes(getPatientBasePath() + "/")).map(tab => tab.id);
      const newPatientTabs = existingPatientTabs.map(tab => findPathParamsWithConfig(tab || "")).map(tab => tab?.tab);
      state.tabs = [
        ...defaultClinicConfig().headerTabs,
        ...newPatientTabs
      ] as TLaTab[]
    },
    removeTab: (state, action) => {
      const index = state.tabs.findIndex(tab => tab.id === action.payload)
      if (index > -1) {
        state.tabs.splice(index, index + 1);
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addTab, injectForm, mergeForm, restoreConf, removeTab } = appSlice.actions

export const getTabs = (state: {appConf: AppConf}) => state.appConf.tabs

export default appSlice.reducer