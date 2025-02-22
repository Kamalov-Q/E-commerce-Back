import { TOrder } from "./order.interface";
import Order from "./order.model";

const createOrderFromDB = async (order: TOrder) => {
  return await Order.create(order);
};

const getAllOrdersFromDB = async (email: string) => {
  const orders = await Order.find({ email });
  return orders;
};

export const OrderServices = { createOrderFromDB, getAllOrdersFromDB };
