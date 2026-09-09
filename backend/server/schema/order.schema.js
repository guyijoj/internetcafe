const { z } = require("zod");

const OrderSchema = z.object({
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.email(),

  restaurantId: z.number().int().positive(),
  payment_method: z.enum(["online", "cash"]),
  comment: z.string().max(200).optional(),
  utensils: z.number().int().min(0).max(20),

  items: z
    .array(
      z.object({
        id: z.number().int().positive(),
        quantity: z.number().int().min(1).max(30),
      }),
    )
    .min(1),
});

module.exports = { OrderSchema };
