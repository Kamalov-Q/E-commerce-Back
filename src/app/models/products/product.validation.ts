// import { z } from "zod";

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

import { z } from "zod";

const variantsValidationSchema = z.object({
  type: z.string({ message: "Variant type is required" }),
  value: z.string({ message: "Variant value is required" }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .positive({ message: "Quantity must be a positive number" }),
  inStock: z.boolean({ message: "InStock must be a boolean" }),
});

const ProductValidationSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(1, "Name cannot be empty"),
  description: z.string({ message: "Description is required" }),
  price: z
    .number({ message: "Price is required" })
    .positive("Price must be a positive number"),
  category: z.string({ message: "Category is required" }),
  tags: z.array(z.string()).nonempty({ message: "Tags cannot be empty" }),
  variants: z.array(variantsValidationSchema),
  inventory: inventoryValidationSchema,
});

export default ProductValidationSchema;
