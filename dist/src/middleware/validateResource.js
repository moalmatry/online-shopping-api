"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const validateResource = (schema) => (req, res, next) => {
    schema
        .parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
    })
        .catch((err) => {
        next(new AppError_1.default(err.errors[0].message, 400));
    })
        .finally(() => next());
};
exports.default = validateResource;
//# sourceMappingURL=validateResource.js.map