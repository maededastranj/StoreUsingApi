import { create } from "zustand";
import axios from "axios";

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
}

interface ProductStore {
    products: Product[];
    filteredProducts: Product[];
    basket: Product[];
    fetchProducts: () => Promise<void>;
    filterByCategory: (category: string) => void;
    removeFromBasket: (productId: number) => void;
    addToBasket: (product: Product) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    filteredProducts: [],
    basket: [],

    fetchProducts: async () => {
        const response = await axios.get("https://fakestoreapi.com/products");
        set({ products: response.data, filteredProducts: response.data });
    },

    filterByCategory: (category:string) => {
        set((state) => ({
            filteredProducts: category === "All" ? state.products : state.products.filter((product) => product.category === category),
        }));
    },
    removeFromBasket: (productId: number) =>
        set((state) => ({
            basket: state.basket.filter((item) => item.id !== productId),
        })),
    filterBySearch: (query: string) =>
        set((state) => ({
            filteredProducts: state.products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase())),
        })),
        filterByPriceRange: (min: number, max: number) =>
            set((state) => ({
              filteredProducts: state.products.filter(
                (product) => product.price >= min && product.price <= max
              ),
            })),
          

    addToBasket: (product) => set((state) => ({ basket: [...state.basket, product] })),
}));
