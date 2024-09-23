import { createSlice } from '@reduxjs/toolkit'
import dottie from 'dottie';
import { getAppKeyFromId } from '~/utils/appHelper';
import { TUiConf } from './uiConf';
import { deepMerge } from '~/utils/objectHelper';

// Define a type for the slice state
export interface TRepeatConf {
  data: any,
  uiConf: TUiConf
}

// Define the initial state using that type
const initialState: TRepeatConf = {
  data: {},
  uiConf: {}
}

export const appSlice = createSlice({
  name: 'repeatConf',
  initialState,
  reducers: {
    addOrUpdateRepeatData: (state, action) => {
      deepMerge(state.data, action.payload);
    },
    addOrUpdateRepeatUiConf: (state, action) => {
      deepMerge(state.uiConf, action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addOrUpdateRepeatData, addOrUpdateRepeatUiConf } = appSlice.actions

export const getRepeatConf = (id: string) => (state: {repeatConf: TRepeatConf}) => {
  const repeatData = dottie.get(state.repeatConf.data, getAppKeyFromId(id));
  const repeatConf = dottie.get(state.repeatConf.uiConf, getAppKeyFromId(id));
  if (!repeatData && !repeatConf) return null;
  return { data: repeatData, uiConf: repeatConf }
}

export default appSlice.reducer