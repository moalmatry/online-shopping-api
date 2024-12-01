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
exports.updatePasswordHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.verifyUserHandler = exports.signupHandler = exports.loginHandler = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const argon2_1 = __importDefault(require("argon2"));
const nanoid_1 = require("nanoid");
const user_service_1 = require("../services/user.service");
const AppError_1 = __importDefault(require("../utils/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const createSendToken_1 = require("../utils/createSendToken");
const jwt_1 = require("../utils/jwt");
const logger_1 = __importDefault(require("../utils/logger"));
const mailer_1 = __importDefault(require("../utils/mailer"));
/** @description login controller that returns token if it success
 *  @example res.status(200).json({ status: 'success', token });
 */
exports.loginHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield (0, user_service_1.findUserByEmail)(email);
    if (!user) {
        return next(new AppError_1.default('Invalid email or password', 401));
    }
    if (!user.verified) {
        return next(new AppError_1.default('Email not verified', 400));
    }
    const isCorrect = yield (0, jwt_1.correctPassword)(password, user.password);
    if (!isCorrect) {
        return next(new AppError_1.default('Invalid email or password', 401));
    }
    // send tokens
    // const token = signJWT(user?.id as string);
    // res.status(200).json({ status: 'success', token });
    (0, createSendToken_1.createSendToken)(user, 201, res);
    return;
}));
/** @description signup controller that returns token if it success  and also returns user data
 * @example
 * res.status(201).json({
      status: 'success',
      token,
      data: {
        firstName: "Mohamed",
        lastName: "Almatry",
        email: "test@test.com",
        verificationCode: "xxxxxxxxxxxxxxxxxxx",
        createdAt: "2024-14-10",
      },
    });
 *
*/
exports.signupHandler = (0, catchAsync_1.default)((req, res, _) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email, firstName, lastName, password } = req.body;
    // create user
    const user = yield (0, user_service_1.createUser)({ email, firstName, lastName, password });
    yield new mailer_1.default(user === null || user === void 0 ? void 0 : user.email, (_a = user === null || user === void 0 ? void 0 : user.profile) === null || _a === void 0 ? void 0 : _a.firstName, user === null || user === void 0 ? void 0 : user.verificationCode).sendWelcome();
    (0, createSendToken_1.createSendToken)(user, 201, res);
    return;
}));
/** @description  sends email to users to verify your email
 * @example res.status(200).json({
        status: 'success',
        message: 'User verified successfully',
      });
 *
*/
exports.verifyUserHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, verificationCode } = req.params;
    // try {
    // Find the user by id
    const user = yield (0, user_service_1.findUserById)(id);
    if (!user) {
        return next(new AppError_1.default('Could not verify user', 400));
    }
    // Check to see if they are already verified
    if (user.verified) {
        return next(new AppError_1.default('Email already verified', 400));
    }
    // Check to see if the verification code matches
    if (user.verificationCode === verificationCode) {
        yield (0, user_service_1.verifyEmail)(id);
        res.status(200).json({
            status: 'success',
            message: 'User verified successfully',
        });
        return;
    }
    else {
        return next(new AppError_1.default('Invalid verification code or something went wrong', 400));
    }
}));
/** @description sends email to users to request rest password
 * @example
 * res.status(200).json({
        status: 'success',
        message: 'Email has been sent to your email. Please check your inbox.',
      });
 */
exports.forgotPasswordHandler = (0, catchAsync_1.default)(
// TODO: make token expiration time 10 minutes
(req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { email } = req.body;
    // 1) Get user
    const user = yield (0, user_service_1.findUserByEmail)(email);
    if (!user) {
        res.status(200).json({
            status: 'success',
            message: 'Email has been sent to your email. Please check your inbox.',
        });
        return;
    }
    if (!user.verified) {
        return next(new AppError_1.default('User is not verified. Please verify your email first.', 400));
    }
    // 2) generate random token
    const passwordResetCode = (0, nanoid_1.nanoid)();
    const hashedPasswordResetCode = yield argon2_1.default.hash(passwordResetCode);
    yield (0, user_service_1.updatePasswordResetCode)(user.id, hashedPasswordResetCode);
    // 3) send email to user
    try {
        yield new mailer_1.default(user.email, (_a = user === null || user === void 0 ? void 0 : user.profile) === null || _a === void 0 ? void 0 : _a.firstName, passwordResetCode).sendPasswordReset();
        res.status(200).json({
            status: 'success',
            message: 'Email has been sent to your email. Please check your inbox.',
        });
    }
    catch (err) {
        logger_1.default.error(err);
        yield (0, user_service_1.updatePasswordResetCode)(user.id, null);
        return next(new AppError_1.default('There was an error sending email. Try again later', 500));
    }
    return;
}));
/** @description reset user password
 * @example
 *    res.status(200).json({ status: 'success', message: 'Password updated successfully' });
 */
exports.resetPasswordHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, passwordResetCode } = req.params;
    const { password } = req.body;
    // 1) Get user based on id
    const user = yield (0, user_service_1.findUserById)(id);
    const isOldPassword = yield (0, jwt_1.correctPassword)(password, user === null || user === void 0 ? void 0 : user.password);
    const correctResetCode = yield (0, jwt_1.correctPassword)(passwordResetCode, user === null || user === void 0 ? void 0 : user.passwordRestCode);
    if (!user || !user.passwordRestCode || !correctResetCode) {
        return next(new AppError_1.default('Could not reset user password', 400));
    }
    // 2) check if password reset code is valid and not expired
    if (Number(user.passwordRestExpires) < Date.now()) {
        return next(new AppError_1.default('reset code has expired', 400));
    }
    // 3) new password not same with old password
    if (isOldPassword) {
        return next(new AppError_1.default('New Password can not be as old password', 400));
    }
    // 3) update password
    (0, user_service_1.updatePasswordResetCode)(id, null);
    (0, user_service_1.updatePassword)(user.id, password);
    res.status(200).json({ status: 'success', message: 'Password updated successfully' });
    return;
}));
/** @description update password for logged in users */
exports.updatePasswordHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, id } = req.user;
    const { currentPassword, newPassword } = req.body;
    // 2) Check if posted current password is correct
    const isCurrentCorrectPassword = yield (0, jwt_1.correctPassword)(currentPassword, password);
    if (!isCurrentCorrectPassword) {
        return next(new AppError_1.default('Invalid current password', 401));
    }
    // 3) if so, update password
    (0, user_service_1.updatePasswordResetCode)(id, null);
    (0, user_service_1.updatePassword)(id, newPassword);
    // Log user in , send JWt
    (0, createSendToken_1.createSendToken)(req.user, 200, res);
}));
//# sourceMappingURL=auth.controller.js.map