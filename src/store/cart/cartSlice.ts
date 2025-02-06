import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        }
    }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0);

export const cartReducer = cartSlice.reducer;