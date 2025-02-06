// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './products/productSlice';
import { authReducer } from './auth/authSlice';
import { categoryReducer } from './categories/categorySlice';
import { cartReducer } from './cart/cartSlice';
export const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        categories: categoryReducer,
        cart: cartReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;