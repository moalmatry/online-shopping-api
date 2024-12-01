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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createNewProduct = exports.findProductByName = exports.getAllProducts = void 0;
const db_1 = require("../db");
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const allProducts = db_1.db.product.findMany({});
    return allProducts;
});
exports.getAllProducts = getAllProducts;
const findProductByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const products = db_1.db.product.findMany({
        where: {
            OR: [{ name: { contains: name, mode: 'insensitive' } }],
            // { description: { contains: name, mode: 'insensitive' } }
        },
    });
    return products;
});
exports.findProductByName = findProductByName;
const createNewProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield db_1.db.product.create({
        data: {
            name: productData.name,
            description: productData.description,
            categoryName: productData.categoryName,
            price: productData.price,
            images: productData.images,
            tags: productData.tags,
        },
    });
    return newProduct;
});
exports.createNewProduct = createNewProduct;
const updateProduct = (updateProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, price, categoryName, description, images, name, tags } = updateProduct;
    const updatedProduct = yield db_1.db.product.update({
        where: {
            id,
        },
        data: {
            price,
            categoryName,
            description,
            images,
            name,
            tags,
        },
    });
    return updatedProduct;
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProduct = yield db_1.db.product.delete({
        where: {
            id,
        },
    });
    return deletedProduct;
});
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=products.service.js.map