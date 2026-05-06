import z from "zod";
import { CartItem } from "./cart";

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

export type FormFields = z.infer<typeof schema>;

export interface OrderRequest {
  restaurantId : number | null,
  dataForm: {
    name: string;
    phone: string;
    email: string;
    address: string;
    payment: string;
    comment?: string;
  },

  utensils:number,
  items : CartItem[]
}

export type StatusValue =  "idle" | "success" | "error";