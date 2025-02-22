import mongoose from "mongoose";
import { TInvetory, TProduct, TVariant } from "./product.interface";

const VariantsSchema = new mongoose.Schema<TVariant>({
  type: String,
  value: String,
});

const InventorySchema = new mongoose.Schema<TInvetory>(
  {
    quantity: Number,
    inStock: Boolean,
  },
  { timestamps: true }
);

const ProductSchema = new mongoose.Schema<TProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: [VariantsSchema],
    inventory: InventorySchema,
  },
  { timestamps: true }
);

export const Product =
  mongoose.models.Product || mongoose.model<TProduct>("Product", ProductSchema);
