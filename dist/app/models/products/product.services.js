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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const createAProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(productData);
    return result;
});
const getProductsFromDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (searchTerm = "") {
    const query = searchTerm
        ? {
            $or: [
                {
                    name: { $regex: searchTerm, $options: "i" },
                },
                {
                    description: { $regex: searchTerm, $options: "i" },
                },
            ],
        }
        : {};
    const products = yield product_model_1.Product.find(query);
    return products;
});
const getOneProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const productOne = yield product_model_1.Product.findById(productId);
    return productOne;
});
const updateProductIntoDB = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.Product.findByIdAndUpdate(productId, productData, {
        new: true,
    });
    return product;
});
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield product_model_1.Product.findByIdAndDelete(productId);
    return deletedProduct;
});
exports.ProductServices = {
    createAProductIntoDB,
    getProductsFromDB,
    getOneProductFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
};
