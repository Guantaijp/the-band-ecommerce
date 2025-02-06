// src/store/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {  AuthState } from './authTypes';

const AUTH_URL = 'https://api.escuelajs.co/api/v1/auth';

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${AUTH_URL}/login`, { email, password });
            const { access_token } = response.data;

            const profileResponse = await axios.get(`${AUTH_URL}/profile`, {
                headers: { Authorization: `Bearer ${access_token}` }
            });

            return {
                token: access_token,
                user: profileResponse.data
            };
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, { rejectWithValue, getState }) => {
        const state = getState() as { auth: AuthState };
        try {
            const response = await axios.post(`${AUTH_URL}/refresh-token`, {
                token: state.auth.token
            });
            return response.data.access_token;
        } catch (error:any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload as string;
                state.isAuthenticated = false;
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

// Selectors
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;