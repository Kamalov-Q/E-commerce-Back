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
exports.UserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email });
    return user;
});
const createUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, role, password, }) {
    const hashPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield user_model_1.default.create({
        email,
        role,
        password: hashPassword,
    });
    if (!user) {
        return null;
    }
    return user;
});
const validatePassword = (password, email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield exports.UserService.findUserByEmail(email);
    const isValid = yield bcryptjs_1.default.compare(password, user.password);
    return isValid;
});
exports.UserService = { findUserByEmail, createUser, validatePassword };
