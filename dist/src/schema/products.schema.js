"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productByNameSchema = exports.deleteProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Product name is required' }).min(5, 'Product name must be at least 5 characters'),
        price: zod_1.z.number({ required_error: 'Product price is required' }).min(1, 'Product price must be at least 1'),
        description: zod_1.z
            .string({ required_error: 'Product description is required' })
            .min(5, 'Product description must be at least 5 characters'),
        categoryName: zod_1.z
            .string({ required_error: 'Product category name is required' })
            .min(5, 'Product category must be at least 5 characters'),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'Product Id is required' }).min(1, 'Id should be at least character'),
        name: zod_1.z.string({ required_error: 'Product name is required' }).min(5, 'Product name must be at least 5 characters'),
        price: zod_1.z.number({ required_error: 'Product price is required' }).min(1, 'Product price must be at least 1'),
        description: zod_1.z
            .string({ required_error: 'Product description is required' })
            .min(5, 'Product description must be at least 5 characters'),
        categoryName: zod_1.z
            .string({ required_error: 'Product category is required' })
            .min(5, 'Product category must be at least 5 characters'),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.deleteProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        id: zod_1.z.string({ required_error: 'Product Id is required' }).min(1, 'Id should be at least character'),
    }),
});
exports.productByNameSchema = zod_1.z.object({
    params: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Please enter category name' }),
    }),
});
//# sourceMappingURL=products.schema.js.map