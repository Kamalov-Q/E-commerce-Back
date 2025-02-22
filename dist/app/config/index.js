"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGO_URI ||
        "mongodb+srv://kamalovquvomiddin:Rwx8znfhfDFR4ohe@commerce.vlmiw.mongodb.net/?retryWrites=true&w=majority&appName=Commerce",
};
//Rwx8znfhfDFR4ohe
