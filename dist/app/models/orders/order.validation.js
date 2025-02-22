"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({ message: "Email is required" })
        .email({ message: "Invalid email" }),
    productId: zod_1.z.string({ message: "Product ID is required" }),
    quantity: zod_1.z
        .number({ message: "Quantity is required" })
        .positive({ message: "Quantity must be positive" }),
    price: zod_1.z
        .number({ message: "Price is required" })
        .positive({ message: "Price must be positive" }),
});
exports.default = orderValidationSchema;
