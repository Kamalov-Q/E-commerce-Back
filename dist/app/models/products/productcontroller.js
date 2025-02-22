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
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
};
