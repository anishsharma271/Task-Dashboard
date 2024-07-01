import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import taskSlice from "./task/taskSlice";

const Store = configureStore({
    reducer: {
        authSlice,
        taskSlice

    }
})
export default Store;