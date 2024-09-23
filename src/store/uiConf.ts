import { createSlice } from '@reduxjs/toolkit'
import dottie from 'dottie';
import { TCardBarSchema, TCardSchema } from '~/types/schema/card.type';
import { TFieldSpec, TForm, TWidget } from '~/types/schema/widget.type';
import { getAppKeyFromId } from '~/utils/appHelper';
import { deepMerge } from '~/utils/objectHelper';

// Define a type for the slice state
export interface TUiConf {
  [key: string]: TFieldSpec | TWidget | TForm | TCardBarSchema | TCardSchema | TUiConf
}

// Define the initial state using that type
const initialState: TUiConf = {}

export const appSlice = createSlice({
  name: 'uiConf',
  initialState,
  reducers: {
    addOrUpdateUiConf: (state, action) => {
      deepMerge(state, action.payload);
    }
  }
})

// Action creators are generated for each case reducer function
export const { addOrUpdateUiConf } = appSlice.actions
// export const { getUiConf } = appSlice.selectors

export const getUiConf = (id: string) => (state: {uiConf: TUiConf}) => dottie.get(state.uiConf, getAppKeyFromId(id))

export default appSlice.reducer