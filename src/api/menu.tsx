import { categoryWithMenu } from "../types/cart";

export async function loadMenu(): Promise<categoryWithMenu[]> {
  try {
    const response = await fetch("http://localhost:4000/api/menu");
    const result = await response.json();
    return result as categoryWithMenu[];
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}
