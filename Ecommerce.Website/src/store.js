import { configureStore } from "@reduxjs/toolkit";
import { reducerSlice } from "reducers";

const store = configureStore({
    reducer: reducerSlice
})

export default store;
