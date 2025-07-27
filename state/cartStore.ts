import { CartItem } from "@/types/cart";
import { Product } from "@/types/product.type";

import { create } from "zustand";

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, selectedSize: string) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  increaseQuantity: (productId: string, selectedSize: string) => void;
  decreaseQuantity: (productId: string, selectedSize: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  addToCart: (product, selectedSize) =>
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return { cart: updatedCart };
      }

      return {
        cart: [
          ...state.cart,
          {
            ...product,
            selectedSize,
            quantity: 1,
          },
        ],
      };
    }),

  removeFromCart: (productId, selectedSize) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) => !(item.id === productId && item.selectedSize === selectedSize)
      ),
    })),

  increaseQuantity: (productId, selectedSize) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decreaseQuantity: (productId, selectedSize) =>
    set((state) => ({
      cart: state.cart
        .map((item) => {
          if (item.id === productId && item.selectedSize === selectedSize) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[],
    })),

  clearCart: () => set({ cart: [] }),
}));
