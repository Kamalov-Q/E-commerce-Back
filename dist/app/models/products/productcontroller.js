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
exports.ProductController = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_services_1 = require("./product.services");
const product_model_1 = require("./product.model");
// Create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const existingProduct = yield product_model_1.Product.findOne({
            name,
        });
        if (existingProduct) {
            return res.status(400).json({
                message: "Product already exists",
                success: false,
            });
        }
        const zodParser = product_validation_1.default.parse(req.body);
        const result = yield product_services_1.ProductServices.createAProductIntoDB(zodParser);
        res.status(201).json({
            message: "Product created successfully",
            success: true,
            data: result,
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
 * openapi: 3.0.0
 * info:
 *   title: E-commerce API
 *   description: API documentation for managing products
 *   version: 1.0.0
 * servers:
 *   - url: http://localhost:5000/api
 *     description: Local Development Server
 *   - url: https://your-deployed-api.com/api
 *     description: Production Server
 * paths:
 *   /products:
 *     post:
 *       summary: Create a new product
 *       description: Adds a new product to the database.
 *       tags:
 *         - Products
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *             examples:
 *               example1:
 *                 value:
 *                   name: "Smartphone X"
 *                   price: 699.99
 *                   description: "A high-end smartphone with advanced features."
 *                   category: "Electronics"
 *                   tags: ["smartphone", "tech", "gadgets"]
 *                   variants:
 *                     - type: "Color"
 *                       value: "Black"
 *                   inventory:
 *                     quantity: 100
 *                     inStock: true
 *       responses:
 *         "201":
 *           description: Product created successfully.
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: "#/components/schemas/ProductResponse"
 *               example:
 *                 message: "Product created successfully"
 *                 success: true
 *                 data:
 *                   id: "65adf8c9c5e3d123456789ab"
 *                   name: "Smartphone X"
 *                   price: 699.99
 *                   description: "A high-end smartphone with advanced features."
 *                   category: "Electronics"
 *                   tags: ["smartphone", "tech", "gadgets"]
 *                   variants:
 *                     - type: "Color"
 *                       value: "Black"
 *                   inventory:
 *                     quantity: 100
 *                     inStock: true
 *         "400":
 *           description: Product already exists.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Product already exists"
 *                 success: false
 *         "500":
 *           description: Internal server error.
 *           content:
 *             application/json:
 *               example:
 *                 message: "Something went wrong"
 *                 success: false
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - description
 *         - category
 *         - tags
 *       properties:
 *         name:
 *           type: string
 *           example: "Smartphone X"
 *         price:
 *           type: number
 *           example: 699.99
 *         description:
 *           type: string
 *           example: "A high-end smartphone with advanced features."
 *         category:
 *           type: string
 *           example: "Electronics"
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *
 */
// Get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const products = yield product_services_1.ProductServices.getProductsFromDB(q);
        res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            data: products,
            count: products.length,
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
 * /products:
 *   get:
 *     summary: Get all products
 *     description: Fetches a list of products from the database. Supports optional query filtering.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: Search query to filter products by name, category, or tags.
 *     responses:
 *       "200":
 *         description: Products fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Products fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Product"
 *       "500":
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             example:
 *               message: "Something went wrong"
 *               success: false
 */
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const product = yield product_services_1.ProductServices.getOneProductFromDB(productId);
        if (!product) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            data: product,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error,
        });
    }
});
/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get a single product
 *     description: Fetches a product from the database by its unique ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the product to retrieve.
 *     responses:
 *       "200":
 *         description: Product fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product fetched successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Product"
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
 */
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = req.body;
        const updProduct = yield product_services_1.ProductServices.updateProductIntoDB(productId, data);
        if (!updProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            data: updProduct,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error,
        });
    }
});
/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Update a product
 *     description: Updates an existing product in the database by its unique ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the product to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *           example:
 *             name: "Updated Smartphone X"
 *             price: 749.99
 *             description: "An updated high-end smartphone with better features."
 *             category: "Electronics"
 *             tags: ["smartphone", "tech", "gadgets", "updated"]
 *             variants:
 *               - type: "Color"
 *                 value: "Blue"
 *             inventory:
 *               quantity: 50
 *               inStock: true
 *     responses:
 *       "200":
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product updated successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Product"
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
 */
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const deletedProduct = yield product_services_1.ProductServices.deleteProductFromDB(productId);
        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
            });
        }
        res.status(200).json({
            message: "Product deleted successfully",
            success: true,
            data: deletedProduct,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error,
        });
    }
});
/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes an existing product from the database using its unique ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique ID of the product to delete.
 *     responses:
 *       "200":
 *         description: Product deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product deleted successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: "#/components/schemas/Product"
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
 */
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
