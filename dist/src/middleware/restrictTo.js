"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = void 0;
const AppError_1 = __importDefault(require("../utils/AppError"));
const restrictTo = (...roles) => (req, res, next) => {
    // @ts-expect-error
    const restrictedRoles = roles.includes(req.user.role);
    if (!restrictedRoles) {
        return next(new AppError_1.default("You don't have permission to perform this action", 403));
    }
    next();
};
exports.restrictTo = restrictTo;
//# sourceMappingURL=restrictTo.js.map