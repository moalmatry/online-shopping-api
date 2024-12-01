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
exports.restoreUser = exports.deleteUser = exports.deleteMe = exports.updateUser = exports.updateMe = exports.getUsers = exports.updatePassword = exports.updatePasswordResetCode = exports.findUserByEmail = exports.verifyEmail = exports.findUserById = exports.createUser = void 0;
const argon2_1 = __importDefault(require("argon2"));
const db_1 = require("../db");
/** @description create user in database & hash password */
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield argon2_1.default.hash(input.password);
    const dbUser = yield db_1.db.user.findFirst({
        where: {
            id: input.email,
        },
    });
    if (!dbUser) {
        const user = yield db_1.db.user.create({
            data: {
                email: input.email,
                password: hashedPassword,
                verified: false,
                profile: {
                    create: {
                        firstName: input.firstName,
                        lastName: input.lastName,
                    },
                },
                address: {
                    create: {
                        city: '',
                        state: '',
                        street: '',
                        zipCode: '',
                    },
                },
            },
            include: {
                profile: true,
            },
        });
        return user;
    }
});
exports.createUser = createUser;
/** @description find user by id */
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db.user.findFirst({
        where: {
            id,
            active: true,
        },
        include: {
            profile: true,
            address: true,
        },
    });
    return user;
});
exports.findUserById = findUserById;
/** @description find user by id and set verified:true  */
const verifyEmail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.db.user.update({
        where: {
            id,
        },
        data: {
            verified: true,
        },
    });
});
exports.verifyEmail = verifyEmail;
/** @description find user by email and return user data  */
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // return UserModal.findOne({ email });
    const user = yield db_1.db.user.findFirst({
        where: {
            email,
            active: true,
        },
        include: {
            profile: true,
        },
    });
    return user;
});
exports.findUserByEmail = findUserByEmail;
/** @description find user by id and update password rest code valid for only 10 minutes  */
const updatePasswordResetCode = (id, passwordRestCode) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.db.user.update({
        where: {
            id,
            active: true,
        },
        data: {
            passwordRestCode,
            passwordRestExpires: String(Date.now() + 10 * 60 * 1000),
        },
    });
});
exports.updatePasswordResetCode = updatePasswordResetCode;
/** @description find user by id and update password and update updatedAt */
const updatePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield argon2_1.default.hash(password);
    yield db_1.db.user.update({
        where: {
            id,
            active: true,
        },
        data: {
            password: hashedPassword,
            updatedAt: new Date(),
        },
    });
});
exports.updatePassword = updatePassword;
/** @description return all users  */
const getUsers = (startIndex, startLimit) => __awaiter(void 0, void 0, void 0, function* () {
    const index = startIndex || 0;
    const limit = startLimit || 10;
    const allUsers = yield db_1.db.user.findMany({
        skip: index,
        take: limit,
        where: {
            active: true,
        },
        select: {
            email: true,
            verified: true,
            createdAt: true,
            password: false,
            verificationCode: false,
            profile: {
                select: {
                    firstName: true,
                    lastName: true,
                    phoneNumber: true,
                    gender: true,
                },
            },
        },
    });
    return allUsers;
});
exports.getUsers = getUsers;
/** @description find user by id and update its data does not update password*/
const updateMe = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { email, firstName, city, state, street, zipCode, gender, lastName, phoneNumber } = updatedData;
    const user = yield db_1.db.user.update({
        where: {
            id,
            active: true,
        },
        include: {
            profile: true,
            address: true,
        },
        data: {
            email,
            profile: {
                update: {
                    firstName,
                    lastName,
                    gender,
                    phoneNumber,
                },
            },
            address: {
                update: {
                    city,
                    state,
                    street,
                    zipCode,
                },
            },
        },
    });
    return {
        firstName: (_a = user.profile) === null || _a === void 0 ? void 0 : _a.firstName,
        lastName: (_b = user.profile) === null || _b === void 0 ? void 0 : _b.lastName,
        email: user.email,
        gender: (_c = user.profile) === null || _c === void 0 ? void 0 : _c.gender,
        phoneNumber: (_d = user.profile) === null || _d === void 0 ? void 0 : _d.phoneNumber,
        city: (_e = user.address) === null || _e === void 0 ? void 0 : _e.city,
        state: (_f = user.address) === null || _f === void 0 ? void 0 : _f.state,
        street: (_g = user.address) === null || _g === void 0 ? void 0 : _g.street,
        zipCode: (_h = user.address) === null || _h === void 0 ? void 0 : _h.zipCode,
    };
});
exports.updateMe = updateMe;
/** @description update user data but this one has more rules (does not update password) */
const updateUser = (email, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { active, city, firstName, gender, lastName, phoneNumber, role, state, street, verified, zipCode } = updatedData;
    const updatedUser = yield db_1.db.user.update({
        where: {
            email,
        },
        include: {
            profile: true,
            address: true,
        },
        data: {
            email,
            active,
            role,
            verified,
            profile: {
                update: {
                    firstName,
                    lastName,
                    gender,
                    phoneNumber,
                },
            },
            address: {
                update: {
                    city,
                    state,
                    street,
                    zipCode,
                },
            },
        },
    });
    return {
        email: updatedUser.email,
        firstName: (_a = updatedUser.profile) === null || _a === void 0 ? void 0 : _a.firstName,
        lastName: (_b = updatedUser.profile) === null || _b === void 0 ? void 0 : _b.lastName,
        gender: (_c = updatedUser.profile) === null || _c === void 0 ? void 0 : _c.gender,
        role: updatedUser.role,
        verified: updatedUser.verified,
        phoneNumber: (_d = updatedUser.profile) === null || _d === void 0 ? void 0 : _d.phoneNumber,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        active: updatedUser.active,
        street: (_e = updatedUser.address) === null || _e === void 0 ? void 0 : _e.street,
        city: (_f = updatedUser.address) === null || _f === void 0 ? void 0 : _f.city,
        state: (_g = updatedUser.address) === null || _g === void 0 ? void 0 : _g.state,
        zipCode: (_h = updatedUser.address) === null || _h === void 0 ? void 0 : _h.zipCode,
    };
});
exports.updateUser = updateUser;
/** @description disable user in database */
const deleteMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield db_1.db.user.update({
        where: {
            id,
        },
        data: {
            active: false,
        },
    });
    return !deletedUser.active;
});
exports.deleteMe = deleteMe;
/** @description disable user in database */
const deleteUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db.user.update({
        where: {
            email,
        },
        data: {
            active: false,
        },
    });
    return user;
});
exports.deleteUser = deleteUser;
/** @description restore deleted user */
const restoreUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.db.user.update({
        where: {
            email,
        },
        data: {
            active: true,
        },
    });
    return user.active;
});
exports.restoreUser = restoreUser;
//# sourceMappingURL=user.service.js.map