import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../stores";
import { CartItem } from "../../client/types/cart";

type CartState = {
  items: CartItem[];
  utensils: number;
  restaurantID: number;
};

const getSavedRestaurantId = () => {
  if (typeof window === "undefined") return 1;

  const restaurantId = Number(localStorage.getItem("restaurant_id"));
  return Number.isInteger(restaurantId) && restaurantId > 0 ? restaurantId : 1;
};

const initialState: CartState = {
  items: [],
  utensils: 1,
  restaurantID: getSavedRestaurantId(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (index) => action.payload.id === index.id,
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
    increaseItem: (state, action: PayloadAction<number>) => {
      const theItem = state.items.find((item) => item.id === action.payload);
      if (theItem) theItem.quantity += 1;
    },
    decreaseItem: (state, action: PayloadAction<number>) => {
      const theItem = state.items.find((item) => item.id === action.payload);
      if (!theItem) return;

      if (theItem.quantity > 1) {
        theItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    increaseUtensils: (state) => {
      state.utensils++;
    },
    decreaseUtensils: (state) => {
      state.utensils--;
    },
    setRestaurantId: (state, action: PayloadAction<number>) => {
      state.restaurantID = action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  clearCart,
  increaseItem,
  decreaseItem,
  increaseUtensils,
  decreaseUtensils,
  setRestaurantId,
} = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectUtensilsItem = (state: RootState) => state.cart.utensils;
export const selectRestaurantsID = (state: RootState) =>
  state.cart.restaurantID;

export const selectCartTotal = (state: RootState) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};
