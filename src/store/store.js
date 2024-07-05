import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/products/productSlice";
import authSlice from "../features/auths/authSlice";

export const store = configureStore({
    reducer :{
        products : productSlice,
        auths : authSlice
    }
})
