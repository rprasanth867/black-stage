import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers.all'

export const store = configureStore({
  reducer: rootReducer
})


export type IReduxState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch