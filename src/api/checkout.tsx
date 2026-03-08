import React from "react";
import { supabase } from "../libs/supabaseClient";
import z, { uuid } from "zod";
import { FormFields } from "../components/ui/Checkout/Checkout";
import { CartItem } from "../types/cart";

export const schema = z.object({
  name: z.string().min(1, "Напишите ваше имя!"),
  phone: z
    .string()
    .regex(
      /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
      {
        message: "Неверный формат номера телефона!",
      },
    )
    .transform((val) => {
      const cleaned = val.replace(/\D/g, "");
      if (cleaned.length === 10) {
        return `+7${cleaned}`;
      }
      if (cleaned.length === 11 && cleaned.startsWith("7")) {
        return `+${cleaned}`;
      }
      if (cleaned.length === 11 && cleaned.startsWith("8")) {
        return `+7${cleaned.substring(1)}`;
      }

      return val;
    }),
  email: z.email("Неправильный формат email!"),
  address: z.string().min(1, "Выберите адрес!"),
  payment: z.string().min(1, "Выберите способ оплаты!"),
  comment: z.string().max(200),
});

type OrderInfo = {
  userinfo: FormFields;
  sum: number;
  utensils: number;
  items: CartItem[];
};

export async function pushCheckout(fullOrderInfo: OrderInfo) {
  const { email, name, phone, payment, comment } = fullOrderInfo.userinfo;
  const user = await UserValidate(email, name, phone);

  const { data: address } = await supabase
    .from("restaurants")
    .select("id")
    .eq("city", fullOrderInfo.userinfo.address)
    .single();

  const { data, error } = await supabase
    .from("orders")
    .insert({
      restaurant_id: address?.id,
      user_id: user.user_id,
      payment_method: payment,
      comment: comment,
      utensils: fullOrderInfo.utensils,
      total_price: fullOrderInfo.sum,
      status: "active",
    })
    .select();

  if (error) {
    console.error("Ошибка:", error);
    return;
  }
  console.log("Успех:", data);

  return;
}

const UserValidate = async (email: string, name: string, phone: string) => {
  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("user_email", email)
    .maybeSingle();

  if (existingUser) return existingUser;

  const { data, error } = await supabase
    .from("users")
    .insert({
      user_email: email,
      user_name: name,
      user_phone: phone,
      created_at: new Date(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating user:", error);
    throw error;
  }
  console.log("New user created!");
  return data;
};
