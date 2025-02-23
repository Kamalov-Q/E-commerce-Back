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
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Places a new order and updates product inventory.
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/OrderRequest"
 *           example:
 *             email: "customer@example.com"
 *             productId: "65adf8c9c5e3d123456789ab"
 *             quantity: 2
 *             price: 1399.98
 *     responses:
 *       "201":
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Order created successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Order"
 *       "400":
 *         description: Validation error or insufficient inventory.
 *         content:
 *           application/json:
 *             examples:
 *               validationError:
 *                 summary: Validation Error
 *                 value:
 *                   message: "Validation Error"
 *                   success: false
 *                   error:
 *                     - message: "Product ID is required"
 *                       path: ["productId"]
 *               insufficientStock:
 *                 summary: Insufficient stock
 *                 value:
 *                   message: "Insufficient quantity available in this inventory"
 *                   success: false
 *       "404":
 *         description: Product not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found"
 *               success: false
 *       "500":
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *               success: false
 *
 * components:
 *   schemas:
 *     OrderRequest:
 *       type: object
 *       required:
 *         - email
 *         - productId
 *         - quantity
 *         - price
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "customer@example.com"
 *         productId:
 *           type: string
 *           example: "65adf8c9c5e3d123456789ab"
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           example: 1399.98
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "70bdf9a8c1e4f654321789cd"
 *         email:
 *           type: string
 *           example: "customer@example.com"
 *         productId:
 *           type: string
 *           example: "65adf8c9c5e3d123456789ab"
 *         quantity:
 *           type: integer
 *           example: 2
 *         price:
 *           type: number
 *           example: 1399.98
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-02-22T14:30:00Z"
 */
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
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders by email
 *     description: Retrieves all orders associated with a given email address.
 *     tags:
 *       - Orders
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *         description: The email address associated with the orders.
 *     responses:
 *       "200":
 *         description: Orders retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Orders retrieved successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Order"
 *       "400":
 *         description: Email is required.
 *         content:
 *           application/json:
 *             example:
 *               message: "Email is required"
 *               success: false
 *       "404":
 *         description: No orders found for the given email.
 *         content:
 *           application/json:
 *             example:
 *               message: "No orders found"
 *               success: false
 *       "500":
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *               success: false
 */
exports.OrderController = { createOrder, getAllOrders };
