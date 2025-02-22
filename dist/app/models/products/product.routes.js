"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const productcontroller_1 = require("./productcontroller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const admin_middleware_1 = require("../../middleware/admin.middleware");
const router = express_1.default.Router();
router.get("/", productcontroller_1.ProductController.getAllProducts);
router.get("/:productId", productcontroller_1.ProductController.getSingleProduct);
router.post("/", auth_middleware_1.verifyToken, admin_middleware_1.isAdmin, // only admin can create products
productcontroller_1.ProductController.createProduct);
router.put("/:productId", auth_middleware_1.verifyToken, admin_middleware_1.isAdmin, // only admin can update products
productcontroller_1.ProductController.updateProduct);
router.delete("/:productId", auth_middleware_1.verifyToken, admin_middleware_1.isAdmin, productcontroller_1.ProductController.deleteProduct);
exports.ProductRoutes = router;
