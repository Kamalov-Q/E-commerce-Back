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
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/RegisterRequest"
 *           example:
 *             email: "user@example.com"
 *             password: "securepassword123"
 *             role: "user"
 *     responses:
 *       "201":
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User registered successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: "#/components/schemas/User"
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsIn..."
 *       "400":
 *         description: Validation error - missing fields.
 *         content:
 *           application/json:
 *             example:
 *               message: "Please fill in all fields"
 *               success: false
 *       "409":
 *         description: Email already exists.
 *         content:
 *           application/json:
 *             example:
 *               message: "User email already exists"
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
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "securepassword123"
 *         role:
 *           type: string
 *           enum: ["admin", "user"]
 *           default: "user"
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "65adf8c9c5e3d123456789ab"
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         role:
 *           type: string
 *           example: "user"
 */
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
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginRequest"
 *           example:
 *             email: "user@example.com"
 *             password: "securepassword123"
 *     responses:
 *       "200":
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged in successfully"
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: "#/components/schemas/User"
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsIn..."
 *       "400":
 *         description: Validation error - missing fields.
 *         content:
 *           application/json:
 *             example:
 *               message: "Please fill in all fields"
 *               success: false
 *       "404":
 *         description: User not found.
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 *               success: false
 *       "401":
 *         description: Invalid credentials.
 *         content:
 *           application/json:
 *             example:
 *               message: "Invalid credentials"
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
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           format: password
 *           example: "securepassword123"
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "65adf8c9c5e3d123456789ab"
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         role:
 *           type: string
 *           example: "user"
 */
exports.UserController = { register, loginUser };
