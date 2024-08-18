import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

const store = configureStore({
    reducer: {
        // actions
        user: userSlice
    }
})

export default store