"use strict";
// import { z } from "zod";
Object.defineProperty(exports, "__esModule", { value: true });
// const variantsValidationSchema = z.object({
//   type: z.string(),
//   value: z.string(),
// });
// const inventoryValidationSchema = z.object({
//   quantity: z.number().positive(),
//   inStock: z.boolean(),
// });
// const ProductValidationSchema = z.object({
//   name: z.string(),
//   description: z.string(),
//   price: z.number().positive(),
//   category: z.string(),
//   tags: z.array(z.string()),
//   variants: z.array(variantsValidationSchema),
//   inventory: inventoryValidationSchema,
// });
// export default ProductValidationSchema;
const zod_1 = require("zod");
const variantsValidationSchema = zod_1.z.object({
    type: zod_1.z.string({ message: "Variant type is required" }),
    value: zod_1.z.string({ message: "Variant value is required" }),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .positive({ message: "Quantity must be a positive number" }),
    inStock: zod_1.z.boolean({ message: "InStock must be a boolean" }),
});
const ProductValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string({ message: "Name is required" })
        .min(1, "Name cannot be empty"),
    description: zod_1.z.string({ message: "Description is required" }),
    price: zod_1.z
        .number({ message: "Price is required" })
        .positive("Price must be a positive number"),
    category: zod_1.z.string({ message: "Category is required" }),
    tags: zod_1.z.array(zod_1.z.string()).nonempty({ message: "Tags cannot be empty" }),
    variants: zod_1.z.array(variantsValidationSchema),
    inventory: inventoryValidationSchema,
});
exports.default = ProductValidationSchema;
