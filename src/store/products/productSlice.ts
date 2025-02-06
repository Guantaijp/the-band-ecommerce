// src/store/products/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Product, ProductState } from './productTypes';

const BASE_URL = 'https://api.escuelajs.co/api/v1/products';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchSingleProduct = createAsyncThunk(
    'products/fetchSingleProduct',
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (productData: Partial<Product>, { rejectWithValue }) => {
        try {
            const response = await axios.post(BASE_URL, productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, productData }: { id: number, productData: Partial<Product> }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id: number, { rejectWithValue }) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: ProductState = {
    items: [],
    selectedProduct: null,
    loading: false,
    error: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.selectedProduct = action.payload;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex(p => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
            });
    }
});

export const productReducer = productSlice.reducer;

// Selectors
export const selectProducts = (state: { products: ProductState }) => state.products.items;
export const selectProductLoading = (state: { products: ProductState }) => state.products.loading;
export const selectSelectedProduct = (state: { products: ProductState }) => state.products.selectedProduct;