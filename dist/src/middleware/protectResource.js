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
exports.protect = void 0;
const user_service_1 = require("../services/user.service");
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jwt_1 = require("../utils/jwt");
/** @description middleware that protects private resources  */
exports.protect = (0, catchAsync_1.default)((req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1) Getting token and check of it's there
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError_1.default('You are not authorized to access please log in first', 401));
    }
    // 2) Verify token if its real or not and still valid
    const decoded = (0, jwt_1.verifyJwt)(token);
    // 3) If user still exists
    const freshUser = yield (0, user_service_1.findUserById)(decoded === null || decoded === void 0 ? void 0 : decoded.id);
    if (!freshUser) {
        return next(new AppError_1.default('The user belonging to this token does no longer exist', 401));
    }
    // 4) If user changed password after the JWT was issued
    const passwordChanged = (0, jwt_1.changedPasswordAfter)(decoded === null || decoded === void 0 ? void 0 : decoded.iat, freshUser.updatedAt);
    if (passwordChanged) {
        return next(new AppError_1.default('Password has changed. Please log in again', 401));
    }
    // Access protected route
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.user = freshUser;
    next();
}));
//# sourceMappingURL=protectResource.js.map