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
exports.deleteCategoryHandler = exports.updateCategoryHandler = exports.createCategoryHandler = exports.getCategoryByNameHandler = exports.getAllCategoriesHandler = void 0;
const categories_service_1 = require("../services/categories.service");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const AppError_1 = __importDefault(require("../utils/AppError"));
/**@description get all categories */
exports.getAllCategoriesHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield (0, categories_service_1.getCategories)(false);
    if (!categories) {
        return next(new AppError_1.default('Something went wong please try again later', 500));
    }
    res.status(200).json({
        status: 'success',
        results: categories.length,
        data: { categories },
    });
}));
exports.getCategoryByNameHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    const category = yield (0, categories_service_1.findCategoryByName)(name);
    if (!category) {
        return next(new AppError_1.default('Category not found', 404));
    }
    res.status(200).json({
        status: 'success',
        data: { category },
    });
}));
/**@description create new category */
exports.createCategoryHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const category = yield (0, categories_service_1.createCategory)(name);
    res.status(200).json({
        status: 'success',
        data: { category },
    });
}));
/**@description update existing category */
exports.updateCategoryHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, newName } = req.body;
    const updatedCategory = yield (0, categories_service_1.updateCategory)(name, newName);
    if (!updatedCategory) {
        return next(new AppError_1.default('Category not fount please make sure that is exists', 400));
    }
    res.status(200).json({
        status: 'success',
        data: { category: updatedCategory },
    });
}));
/**@description delete existing category */
exports.deleteCategoryHandler = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const deletedCategory = yield (0, categories_service_1.deleteCategory)(name);
    if (!deletedCategory) {
        return next(new AppError_1.default('Category not fount please make sure that is exists', 400));
    }
    res.status(201).json({
        status: 'success',
        data: { category: deletedCategory },
    });
}));
//# sourceMappingURL=categories.controller.js.map