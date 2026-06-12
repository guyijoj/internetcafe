import { restaurantsInfo } from "../types/restaurants";

export async function getRestaurants(): Promise<restaurantsInfo[]> {
  try {
    const response = await fetch(`http://localhost:4000/api/restaurants`);

    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }
    const result = await response.json();
    return result as restaurantsInfo[];
  } catch (e) {
    console.error(e);
    return [];
  }
}
