"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem } from "../types/cart";
import { restaurantsInfo } from "../types/restaurants";

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  total: number;
  utensils: number;
  incrementUtesils: () => void;
  decrementUtensils: () => void;
  increment: (id: number, step?: number) => void;
  decrement: (id: number, step?: number) => void;
  restaurantId: number | null;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [utensilQuantity, setUtensils] = useState(1);
  const [selectedRestaurantId, setRestaurantId] = useState<number | null>(null);
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    const restaurantsId = Number(localStorage.getItem("restaurant_id"));
    if (stored) setItems(JSON.parse(stored));
    if (restaurantsId) setRestaurantId(restaurantsId);
  }, []);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quatity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, item];
    });
  };
  const incrementUtesils = () => {
    setUtensils(utensilQuantity + 1);
  };
  const decrementUtensils = () => {
    if (utensilQuantity > 1) setUtensils(utensilQuantity - 1);
  };

  const increment = (id: number, step = 1) =>
    setItems((prev) =>
      prev.map((i) => (i.id == id ? { ...i, quantity: i.quantity + step } : i)),
    );

  const decrement = (id: number, step = 1) =>
    setItems(
      (prev) =>
        prev
          .map((i) => (i.id === id ? { ...i, quantity: i.quantity - step } : i))
          .filter((i) => i.quantity > 0), // если стало 0 — удаляем
    );

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const utensils = utensilQuantity;
  const restaurantId = selectedRestaurantId;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        total,
        utensils,
        incrementUtesils,
        decrementUtensils,
        increment,
        decrement,
        restaurantId,
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
