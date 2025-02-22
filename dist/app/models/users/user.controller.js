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
exports.UserController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const user_services_1 = require("./user.services");
const JWT_SECRET = config_1.default.jwtSecret;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false,
            });
        }
        const existingUser = yield user_services_1.UserService.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({
                message: "User email already exists",
                success: false,
            });
        }
        const userRole = role || "user";
        const data = {
            email,
            password,
            role: userRole,
        };
        const user = yield user_services_1.UserService.createUser(data);
        if (!user) {
            return res.status(500).json({
                message: "User registration failed",
                success: false,
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user === null || user === void 0 ? void 0 : user._id }, JWT_SECRET, {
            expiresIn: "1d",
        });
        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            data: { user, token },
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
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill in all fields",
                success: false,
            });
        }
        const user = yield user_services_1.UserService.findUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        const isValid = yield user_services_1.UserService.validatePassword(password, email);
        if (!isValid) {
            return res.status(401).json({
                message: "Invalid credentials",
                success: false,
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id, email, role: user.role }, JWT_SECRET, {
            expiresIn: "1d",
        });
        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            data: { user, token },
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error,
        });
    }
});
exports.UserController = { register, loginUser };
