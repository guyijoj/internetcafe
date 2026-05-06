import { FormFields, OrderRequest } from "../types/checkoutForm";

type apiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export async function postOrder(data: OrderRequest): Promise<apiResponse<any>> {
  try {
    const response = await fetch("http://loalhost:4000/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.dataForm.name,
        phone: data.dataForm.phone,
        email: data.dataForm.email,
        payment_method: data.dataForm.payment,
        restaurantId: data.restaurantId,
        comment: data.dataForm.comment,
        utensils: data.utensils,
        items: data.items,
      }),
    });

    if (!response.ok)
      return {
        success: false,
        error: "Ошибка отправки заказа",
      };
    const result = await response.json();
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Сетевая Ошибка",
    };
  }
}
