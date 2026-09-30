export type OrderType = {
  id: number;
  order_number: string;
  restaurant_id: number;
  payment_method: "cash" | "online";
  total_price: string;
  utensils: number;
};
