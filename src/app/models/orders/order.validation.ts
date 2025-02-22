import { z } from "zod";

const orderValidationSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  productId: z.string({ message: "Product ID is required" }),
  quantity: z
    .number({ message: "Quantity is required" })
    .positive({ message: "Quantity must be positive" }),
  price: z
    .number({ message: "Price is required" })
    .positive({ message: "Price must be positive" }),
});

export default orderValidationSchema;
