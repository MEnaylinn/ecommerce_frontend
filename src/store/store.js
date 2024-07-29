import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/products/productSlice";
import authSlice from "../features/auths/authSlice";
import shippingSlice from "../features/shipping/shippingSlice";
import cartItemSlice from "../features/cart/cartItemSlice";
import paymentSlice from "../features/billing/paymentSlice";

export const store = configureStore({
    reducer :{
        products : productSlice,
        auths : authSlice,
        carts :cartItemSlice,
        shipping : shippingSlice,
        userpayment : paymentSlice

    }
})
