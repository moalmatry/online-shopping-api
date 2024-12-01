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
exports.changedPasswordAfter = exports.correctPassword = exports.signJWT = exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("./logger"));
const argon2_1 = __importDefault(require("argon2"));
const AppError_1 = __importDefault(require("./AppError"));
// export const signJwt = (object: object, options?: Jwt.SignOptions | undefined) => {
//   return Jwt.sign(object, process.env.JWT_SECRET!, {
//     ...(options && options),
//   });
// };
/** @description verify jwt & payload */
const verifyJwt = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return decoded;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        logger_1.default.error(error);
        throw new AppError_1.default(`${error.message}`, 401);
    }
};
exports.verifyJwt = verifyJwt;
/** @description sign jwt and return token valid to process.env.JWT_EXPIRES value */
const signJWT = (id, options) => {
    const token = jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, Object.assign({ expiresIn: process.env.JWT_EXPIRES }, (options && options)));
    return token;
};
exports.signJWT = signJWT;
/** @description verify if password is correct using argon2 */
const correctPassword = (candidatePassword, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield argon2_1.default.verify(password, candidatePassword);
    }
    catch (error) {
        logger_1.default.error(error, 'Could not validate password');
        return false;
    }
});
exports.correctPassword = correctPassword;
const changedPasswordAfter = (jwtTimeStamp, updatedAt) => {
    const updateTimestamp = Math.floor(updatedAt.getTime() / 1000);
    if (updateTimestamp > jwtTimeStamp) {
        return true;
    }
    return false;
};
exports.changedPasswordAfter = changedPasswordAfter;
//# sourceMappingURL=jwt.js.map