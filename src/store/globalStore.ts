import { createSlice } from '@reduxjs/toolkit'
import { deepMerge } from '~/utils/objectHelper';


type TEditing = string | null;
// Define a type for the slice state
interface TGlobal {
  editing: TEditing
}

// Define the initial state using that type
const initialState: TGlobal = {
  editing: "clinic/patient/1254/detail/profile/widget/patientdetail/patientInformation/firstName"
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    addOrUpdate: (state, action: { payload: TGlobal}) => {
      deepMerge(state, action.payload);
    },
    setEditing(state, action: { payload: TEditing }) {
      state.editing = action.payload
    },
    clearEditing(state) {
      state.editing = null;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
  addOrUpdate: addOrUpdateGlobal,
  setEditing: setGlobalEditing,
  clearEditing: clearGlobalEditing 
} = globalSlice.actions

export const getGlobalEditing = (state: any) => state.global.editing

export default globalSlice.reducer