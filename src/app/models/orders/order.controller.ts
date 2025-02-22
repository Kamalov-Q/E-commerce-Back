import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { Product } from "../products/product.model";
import { OrderServices } from "./order.services";

const createOrder = async (req: Request, res: Response) => {
  try {
    const zodValidation = orderValidationSchema.safeParse(req.body);
    if (
      typeof zodValidation.error !== "undefined" &&
      zodValidation.error?.name === "ZodError"
    ) {
      const errorLists = zodValidation.error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path,
      }));
      return res.status(400).json({
        message: "Validation Error",
        success: false,
        error: errorLists,
      });
    }

    if (zodValidation.success) {
      const product = await Product.findById({
        _id: zodValidation.data.productId,
      });
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
          success: false,
        });
      }

      if (product && product.inventory.quantity < zodValidation.data.quantity) {
        return res.status(400).json({
          message: "Insufficient quantity available in this inventory",
          success: false,
        });
      }

      if (product) {
        product.inventory.quantity =
          product.inventory.quantity - zodValidation.data.quantity;
        product.inventory.inStock =
          product.inventory.quantity === 0 ? false : true;

        const newOrder = await OrderServices.createOrderFromDB(
          zodValidation.data
        );

        await product.save();

        return res.status(201).json({
          message: "Order created successfully",
          success: true,
          data: newOrder,
        });
      }
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error,
    });
  }
};

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
      });
    }

    const orders = await OrderServices.getAllOrdersFromDB(email);

    if (!orders) {
      return res.status(404).json({
        message: "No orders found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Orders retrieved successfully",
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({
      message: error.message || "Something went wrong",
      success: false,
      error,
    });
  }
};

export const OrderController = { createOrder, getAllOrders };
