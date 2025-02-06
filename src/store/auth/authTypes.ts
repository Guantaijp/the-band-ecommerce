// src/store/auth/authTypes.ts
export interface User {
    id: number;
    email: string;
    name: string;
    role: string;
    avatar: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    error: string | null;
}