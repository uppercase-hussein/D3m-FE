import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appSlice from "./slices/app.slice";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// import { StaffDetails } from "../interface/Staff";


const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

// const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

export default storage;
const rootReducer = combineReducers({
    app: appSlice
})

// export type RootState = {
//     auth: AuthState
// }
//  ReturnType<typeof rootReducer>

 export type RootState = ReturnType<typeof store.getState>
 export type AppDispatch = typeof store.dispatch
 
const persistConfig = {
    key: 'root',
    storage
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer
})