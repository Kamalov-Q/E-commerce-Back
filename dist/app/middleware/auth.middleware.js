"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const JWT_SECRET = config_1.default.jwtSecret;
const verifyToken = (req, res, next) => {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized",
                });
            }
            req.decoded = decoded;
            return next();
        });
    }
    catch (error) {
        console.error(error.message);
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
};
exports.verifyToken = verifyToken;
