import { configureStore } from '@reduxjs/toolkit'
import appData from './appData'
import appConf from './appConf'
import uiConf from './uiConf'
import repeatConf from './repeatConf'
import globalStore from './globalStore'

const store = configureStore({
  reducer: {
    appData,
    appConf,
    uiConf,
    repeatConf,
    global: globalStore
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;