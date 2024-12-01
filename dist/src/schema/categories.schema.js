"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryByNameSchema = exports.deleteCategorySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Please enter category name' }).min(5, 'category should be least 5 characters'),
    }),
});
exports.updateCategorySchema = zod_1.z.object({
    body: zod_1.z
        .object({
        name: zod_1.z.string({ required_error: 'Please enter category name' }).min(5, 'category should be least 5 characters'),
        newName: zod_1.z
            .string({ required_error: 'Please enter category name' })
            .min(5, 'category should be least 5 characters'),
    })
        .refine((data) => data.name !== data.newName, {
        message: 'its the same name 😡',
    }),
});
exports.deleteCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Please enter category name' }).min(5, 'category should be least 5 characters'),
    }),
});
exports.categoryByNameSchema = zod_1.z.object({
    params: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Please enter category name' }).min(5, 'category should be least 5 characters'),
    }),
});
//# sourceMappingURL=categories.schema.js.map