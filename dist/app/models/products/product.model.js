"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const VariantsSchema = new mongoose_1.default.Schema({
    type: String,
    value: String,
});
const InventorySchema = new mongoose_1.default.Schema({
    quantity: Number,
    inStock: Boolean,
}, { timestamps: true });
const ProductSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: [VariantsSchema],
    inventory: InventorySchema,
}, { timestamps: true });
exports.Product = mongoose_1.default.models.Product || mongoose_1.default.model("Product", ProductSchema);
