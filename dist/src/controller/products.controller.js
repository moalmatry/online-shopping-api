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
exports.deleteProductHandler = exports.updateProductHandler = exports.createNewProductHandler = exports.findProductByNameHandler = exports.getAllProductsHandler = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const products_service_1 = require("../services/products.service");
/** @description return all products */
exports.getAllProductsHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, products_service_1.getAllProducts)();
    res.status(200).json({
        status: 'success',
        results: products.length,
        data: { products },
    });
}));
exports.findProductByNameHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const products = yield (0, products_service_1.findProductByName)(name);
    res.status(200).json({
        status: 'success',
        results: products.length,
        data: { products },
    });
}));
/** @description create new product */
exports.createNewProductHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, description, name, price, images, tags } = req.body;
    const product = yield (0, products_service_1.createNewProduct)({
        categoryName,
        description,
        name,
        price,
        images,
        tags,
    });
    res.status(200).json({
        status: 'success',
        data: { product },
    });
}));
/** @description update product */
exports.updateProductHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryName, description, id, name, price, images, tags } = req.body;
    const updatedProduct = yield (0, products_service_1.updateProduct)({
        id,
        categoryName,
        description,
        name,
        price,
        images,
        tags,
    });
    res.status(200).json({
        status: 'success',
        data: { product: updatedProduct },
    });
}));
/** @description delete product */
exports.deleteProductHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    const deletedProduct = yield (0, products_service_1.deleteProduct)(id);
    res.status(200).json({
        status: 'success',
        data: { product: deletedProduct },
    });
}));
//# sourceMappingURL=products.controller.js.map