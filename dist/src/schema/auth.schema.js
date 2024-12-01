"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSessionSchema = void 0;
const zod_1 = require("zod");
exports.createSessionSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }).email('Invalid email or password'),
        password: zod_1.z
            .string({
            required_error: 'Invalid email or password',
        })
            .min(6, 'Invalid email or password'),
    }),
});
//# sourceMappingURL=auth.schema.js.map