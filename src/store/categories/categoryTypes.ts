// src/store/categories/categoryTypes.ts
export interface Category {
    id: number;
    name: string;
    image: string;
}

export interface CategoryState {
    items: Category[];
    loading: boolean;
    error: string | null;
}