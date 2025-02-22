"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    const userRole = req.decoded.role;
    if (userRole !== "admin") {
        return res
            .status(403)
            .json({ message: "You are not authorized to perform this action" });
    }
    next();
};
exports.isAdmin = isAdmin;
