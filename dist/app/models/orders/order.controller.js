"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const product_model_1 = require("../products/product.model");
const order_services_1 = require("./order.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const zodValidation = order_validation_1.default.safeParse(req.body);
        if (typeof zodValidation.error !== "undefined" &&
            ((_a = zodValidation.error) === null || _a === void 0 ? void 0 : _a.name) === "ZodError") {
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
            const product = yield product_model_1.Product.findById({
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
                const newOrder = yield order_services_1.OrderServices.createOrderFromDB(zodValidation.data);
                yield product.save();
                return res.status(201).json({
                    message: "Order created successfully",
                    success: true,
                    data: newOrder,
                });
            }
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error,
        });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({
                message: "Email is required",
                success: false,
            });
        }
        const orders = yield order_services_1.OrderServices.getAllOrdersFromDB(email);
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
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error,
        });
    }
});
exports.OrderController = { createOrder, getAllOrders };
