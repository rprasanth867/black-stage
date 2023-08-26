import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers.all'

const store = configureStore({
  reducer: rootReducer
})


export type IReduxState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

(window as any).APP = { store };
export {store};