"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem } from "../types/cart";

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: number;
  increment: (id: number, step?: number) => void;
  decrement: (id: number, step?: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quatity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const increment = (id: number, step = 1) =>
    setItems((prev) =>
      prev.map((i) => (i.id == id ? { ...i, quantity: i.quantity + step } : i))
    );

  const decrement = (id: number, step = 1) =>
    setItems(
      (prev) =>
        prev
          .map((i) => (i.id === id ? { ...i, quantity: i.quantity - step } : i))
          .filter((i) => i.quantity > 0) // если стало 0 — удаляем
    );

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        total,
        increment,
        decrement,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
