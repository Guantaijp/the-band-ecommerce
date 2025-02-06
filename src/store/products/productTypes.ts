export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: string[];
    creationAt: string;
}

export interface ProductState {
    items: Product[];
    selectedProduct: Product | null;
    loading: boolean;
    error: string | null;
}