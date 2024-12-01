"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSendToken = void 0;
const jwt_1 = require("./jwt");
/** @description create token and send response
 * @example  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      verificationCode: user?.verificationCode,
      createdAt: user?.createdAt,
    },
  });
 */
const createSendToken = (user, statusCode, res) => {
    const token = (0, jwt_1.signJWT)(user.id);
    const cookieOptions = {
        expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly: true,
    };
    if (process.env.PROJECT_ENV === 'production')
        cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user: {
                id: user.id,
                firstName: user === null || user === void 0 ? void 0 : user.profile.firstName,
                lastName: user === null || user === void 0 ? void 0 : user.profile.lastName,
                email: user.email,
                verificationCode: user === null || user === void 0 ? void 0 : user.verificationCode,
                createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
                phoneNumber: user.profile.phoneNumber,
            },
        },
    });
};
exports.createSendToken = createSendToken;
//# sourceMappingURL=createSendToken.js.map