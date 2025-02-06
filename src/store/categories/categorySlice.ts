// src/store/categories/categorySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {  CategoryState } from './categoryTypes';

const CATEGORIES_URL = 'https://api.escuelajs.co/api/v1/categories';

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(CATEGORIES_URL);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchProductsByCategory = createAsyncThunk(
    'categories/fetchProductsByCategory',
    async (categoryId: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${CATEGORIES_URL}/${categoryId}/products`);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const createCategory = createAsyncThunk(
    'categories/createCategory',
    async (categoryData: { name: string, image: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(CATEGORIES_URL, categoryData);
            return response.data;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: CategoryState = {
    items: [],
    loading: false,
    error: null
};

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    }
});

export const categoryReducer = categorySlice.reducer;

// Selectors
export const selectCategories = (state: { categories: CategoryState }) => state.categories.items;
export const selectCategoriesLoading = (state: { categories: CategoryState }) => state.categories.loading;