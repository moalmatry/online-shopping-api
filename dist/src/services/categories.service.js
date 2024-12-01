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
exports.findCategoryByName = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategories = void 0;
const db_1 = require("../db");
/** @description return all categories  */
const getCategories = (products) => __awaiter(void 0, void 0, void 0, function* () {
    const allCategories = yield db_1.db.category.findMany({
        include: {
            products,
        },
    });
    return allCategories;
});
exports.getCategories = getCategories;
const createCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const newCategory = yield db_1.db.category.create({
        data: {
            name,
        },
    });
    return newCategory;
});
exports.createCategory = createCategory;
const updateCategory = (name, newName) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedCategory = yield db_1.db.category.update({
        where: {
            name,
        },
        data: {
            name: newName,
        },
    });
    return updatedCategory;
});
exports.updateCategory = updateCategory;
const deleteCategory = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedCategory = yield db_1.db.category.delete({
        where: {
            name,
        },
    });
    return deletedCategory;
});
exports.deleteCategory = deleteCategory;
const findCategoryByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield db_1.db.category.findFirst({
        where: {
            name,
        },
        include: {
            products: true,
        },
    });
    return category;
});
exports.findCategoryByName = findCategoryByName;
//# sourceMappingURL=categories.service.js.map