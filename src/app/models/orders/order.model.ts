import mongoose, { models, Schema } from "mongoose";
import { TOrder } from "./order.interface";
const OrderSchema = new Schema<TOrder>({
  email: { type: String, required: true },
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const Order = models.Order || mongoose.model<TOrder>("Order", OrderSchema);
export default Order;
