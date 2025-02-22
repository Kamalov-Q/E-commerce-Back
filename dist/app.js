"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_routes_1 = require("./app/models/products/product.routes");
const order_routes_1 = require("./app/models/orders/order.routes");
const user_routes_1 = __importDefault(require("./app/models/users/user.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//Routes
app.use("/api/users", user_routes_1.default);
app.use("/api/products", product_routes_1.ProductRoutes);
app.use("/api/orders", order_routes_1.OrderRoutes);
app.get("/", (_, res) => {
    res.send("Hello World again!");
});
exports.default = app;
