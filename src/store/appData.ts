import { createSlice } from '@reduxjs/toolkit'
// import deepmerge from 'deepmerge';
import dottie from 'dottie';
import { getAppKeyFromId } from '~/utils/appHelper';
import { deepMerge } from '~/utils/objectHelper';

// Define a type for the slice state
interface AppData {
  [key: string]: any
}

// Define the initial state using that type
const initialState: AppData = {
  "clinic/patients": {
    "enrolled": {
      "M023": {
        "mrn": "M023",
        "name": "Jimmy",
        "status": "success" 
      }
    },
    "addpatients": {
      "widget": {
        "patientInformation": {
          "patient": {
            "firstName": "John",
            "lastName": "Doe"
          }
        },
        "discareddevices": {
          "formAddPatient": {
            "firstName": "John",
            "lastName": "Doe"
          }
        }
      }
    }
  },
  "clinic/forms": {
    "form": {
      "widget": {
        "discareddevices": {
          "telephoneFields": {
            "firstName": "Walker"
          },
          "telephoneFields2": {
            "firstName": "Walker",
            "telephone": "some number"
          }
        }
      }
    }
  }
}



export const appSlice = createSlice({
  name: 'appData',
  initialState,
  reducers: {
    addOrUpdateAppData: (state, action) => {
      deepMerge(state, action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addOrUpdateAppData } = appSlice.actions

export const getAppData = (id: string) => (state: AppData) => dottie.get(state.appData, getAppKeyFromId(id))

export default appSlice.reducer