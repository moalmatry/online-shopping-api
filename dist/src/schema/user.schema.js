"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersSchema = exports.deleteUserSchema = exports.restoreUserSchema = exports.updateUserSchema = exports.updateMeSchema = exports.updatePasswordSchema = exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.verifyUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        firstName: zod_1.z.string({ required_error: 'First name is required' }),
        lastName: zod_1.z.string({ required_error: 'Last name is required' }),
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password is too short - should be min 6 characters'),
        passwordConfirmation: zod_1.z.string({
            required_error: 'Please confirm your password',
        }),
        email: zod_1.z.string({ required_error: 'Email is required' }).email('Not valid email address'),
    })
        .refine((data) => data.password === data.passwordConfirmation, {
        message: "Password don't match",
        path: ['passwordConfirmation'],
    }),
});
exports.verifyUserSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
        verificationCode: zod_1.z.string(),
    }),
});
exports.forgotPasswordSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email('Not valid email address'),
    }),
});
exports.resetPasswordSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string(),
        passwordResetCode: zod_1.z.string(),
    }),
    body: zod_1.z
        .object({
        password: zod_1.z
            .string({ required_error: 'Password is required' })
            .min(6, 'Password is too short - should be min 6 characters'),
        passwordConfirmation: zod_1.z.string({
            required_error: 'Please confirm your password',
        }),
    })
        .refine((data) => data.password === data.passwordConfirmation, {
        message: "Password don't match",
        path: ['passwordConfirmation'],
    }),
});
exports.updatePasswordSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        currentPassword: zod_1.z
            .string({ required_error: 'Please enter current password' })
            .min(6, 'Password is too short - should be min 6 characters'),
        newPassword: zod_1.z
            .string({ required_error: 'Please enter current password' })
            .min(6, 'Password is too short - should be min 6 characters'),
        confirmNewPassword: zod_1.z
            .string({ required_error: 'Please enter current password' })
            .min(6, 'Password is too short - should be min 6 characters'),
    })
        .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Password don't match",
        path: ['passwordConfirmation'],
    }),
});
const Gender = ['MALE', 'FEMALE'];
exports.updateMeSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        email: zod_1.z.string().email('Not valid email address').optional(),
        phoneNumber: zod_1.z
            .string()
            .refine((val) => {
            const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?(\([0-9]{1,3}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
            return phoneRegex.test(val);
        }, {
            message: 'Invalid phone number format',
        })
            .optional(),
        gender: zod_1.z.enum(Gender).optional(),
        street: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        state: zod_1.z.string().optional(),
        zipCode: zod_1.z.string().optional(),
    }),
});
const Role = ['USER', 'ADMIN', 'EMPLOYEE'];
exports.updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        firstName: zod_1.z.string().optional(),
        lastName: zod_1.z.string().optional(),
        email: zod_1.z.string().email('Not valid email address'),
        fullAddress: zod_1.z.string().min(20, 'Address must be at least 20 characters').optional(),
        phoneNumber: zod_1.z
            .string()
            .refine((val) => {
            const phoneRegex = /^[+]?[0-9]{1,4}?[-.\s]?(\([0-9]{1,3}\)|[0-9]{1,4})[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
            return phoneRegex.test(val);
        }, {
            message: 'Invalid phone number format',
        })
            .optional(),
        gender: zod_1.z.enum(Gender).optional(),
        verified: zod_1.z.boolean().optional(),
        role: zod_1.z.enum(Role).optional(),
        active: zod_1.z.boolean().optional(),
        street: zod_1.z.string().optional(),
        city: zod_1.z.string().optional(),
        state: zod_1.z.string().optional(),
        zipCode: zod_1.z.string().optional(),
    }),
});
exports.restoreUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
    }),
});
exports.deleteUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email(),
    }),
});
exports.getAllUsersSchema = zod_1.z.object({
    query: zod_1.z.object({
        index: zod_1.z.string().min(1).optional(),
        limit: zod_1.z.string().min(1).optional(),
    }),
});
//# sourceMappingURL=user.schema.js.map