"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/create-account", user_controller_1.UserController.register);
router.post("/login", user_controller_1.UserController.loginUser);
const UserRoutes = router;
exports.default = UserRoutes;
