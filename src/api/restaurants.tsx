import React from "react";
import { supabase } from "../libs/supabaseClient";
import { restaurantsInfo } from "../types/restaurants";

export async function getRestaurants(): Promise<restaurantsInfo[]> {
  const { data, error } = await supabase
    .from("restaurants")
    .select("id, address, phone, city, workingHours, photo, link")
    .order("id");

  if (error) {
    console.error(error);
    throw error;
  }
  return data as restaurantsInfo[];
}
