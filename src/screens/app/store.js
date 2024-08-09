import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../../features/slices/taskSlice"
export const store = configureStore({
    reducer:{
        tasks: taskReducer

    }
})