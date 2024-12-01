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
exports.getMeHandler = exports.restoreUserHandler = exports.deleteUserHandler = exports.deleteMeHandler = exports.updateUserHandler = exports.updateMeHandler = exports.getAllUsersHandler = void 0;
const user_service_1 = require("../services/user.service");
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const createPagination_1 = require("../utils/createPagination");
const db_1 = require("../db");
/** @description returns all users from db
 *  @example   res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
 */
exports.getAllUsersHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { index: clientIndex, limit: ClientLimit } = req.query;
    const { limit, startIndex, total } = yield (0, createPagination_1.createPaginationPrisma)(clientIndex, ClientLimit, db_1.db.user);
    const users = yield (0, user_service_1.getUsers)(startIndex, limit);
    res.status(200).json({
        status: 'success',
        results: users.length,
        totalResults: total,
        data: { users },
    });
}));
/**@description update user data without password and returns updated user */
exports.updateMeHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const { phoneNumber, city, state, street, zipCode, email, firstName, lastName, gender } = req.body;
    if (!phoneNumber && !city && state && street && zipCode && !email && !firstName && !lastName && !gender) {
        return next(new AppError_1.default('There is no data to update', 400));
    }
    const updatedUser = yield (0, user_service_1.updateMe)(id, {
        phoneNumber,
        city,
        state,
        street,
        zipCode,
        email,
        firstName,
        lastName,
        gender,
    });
    res.status(200).json({
        status: 'success',
        data: {
            user: Object.assign({}, updatedUser),
        },
    });
}));
/** @description makes admin update user data */
exports.updateUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, fullAddress, gender, lastName, phoneNumber, role, verified, active, city, state, street, zipCode, } = req.body;
    if (!phoneNumber && !fullAddress && !email && !firstName && !lastName && !gender && role && verified) {
        return next(new AppError_1.default('There is no data to update', 400));
    }
    const updatedUser = yield (0, user_service_1.updateUser)(email, {
        email,
        firstName,
        gender,
        lastName,
        phoneNumber,
        role,
        verified,
        active,
        city,
        state,
        street,
        zipCode,
    });
    res.status(200).json({
        status: 'success',
        data: {
            user: Object.assign({}, updatedUser),
        },
    });
}));
/** @description delete user by id  (make active false in db)*/
exports.deleteMeHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const isDeleted = yield (0, user_service_1.deleteMe)(id);
    if (!isDeleted) {
        return next(new AppError_1.default('Can not delete user right now. Please try again later', 500));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
}));
exports.deleteUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const checkUser = yield (0, user_service_1.findUserByEmail)(email);
    if (!checkUser) {
        return next(new AppError_1.default('User Not found or already deleted', 404));
    }
    yield (0, user_service_1.deleteUser)(email);
    res.status(204).json({
        status: 'success',
        data: null,
    });
}));
/** @description reactivate deleted users  */
exports.restoreUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const isRestored = yield (0, user_service_1.restoreUser)(email);
    if (!isRestored) {
        return next(new AppError_1.default('Can not restore user right now. Please try again later', 500));
    }
    res.status(200).json({
        status: 'success',
        message: 'user restored successfully',
    });
}));
/** @description returns user info  */
exports.getMeHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res.status(200).json({
        status: 'success',
        data: {
            user: {
                id: user.id,
                email: user.email,
                firstName: user.profile.firstName,
                lastName: user.profile.lastName,
                phoneNumber: user.profile.phoneNumber,
                gender: user.profile.gender,
                createdAt: user.createdAt,
                verified: user.verified,
            },
        },
    });
}));
//# sourceMappingURL=user.controller.js.map