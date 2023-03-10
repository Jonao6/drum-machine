import { drumMachineSlice } from "./slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: drumMachineSlice.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export default store