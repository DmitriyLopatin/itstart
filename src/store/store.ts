import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { seminarAPI } from "../sevices/SeminarService";

const rootReducer = combineReducers({
    [seminarAPI.reducerPath]: seminarAPI.reducer
})


export const store = configureStore({
    reducer: rootReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(seminarAPI.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
