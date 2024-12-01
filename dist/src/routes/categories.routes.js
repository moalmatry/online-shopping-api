"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_controller_1 = require("../controller/categories.controller");
const protectResource_1 = require("../middleware/protectResource");
const restrictTo_1 = require("../middleware/restrictTo");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const categories_schema_1 = require("../schema/categories.schema");
const router = express_1.default.Router();
router
    .route('/')
    .get(categories_controller_1.getAllCategoriesHandler)
    .post((0, validateResource_1.default)(categories_schema_1.createCategorySchema), protectResource_1.protect, (0, restrictTo_1.restrictTo)('ADMIN', 'EMPLOYEE'), categories_controller_1.createCategoryHandler)
    .patch((0, validateResource_1.default)(categories_schema_1.updateCategorySchema), protectResource_1.protect, (0, restrictTo_1.restrictTo)('ADMIN', 'EMPLOYEE'), categories_controller_1.updateCategoryHandler)
    .delete(protectResource_1.protect, (0, restrictTo_1.restrictTo)('ADMIN', 'EMPLOYEE'), categories_controller_1.deleteCategoryHandler);
router.get('/:name', (0, validateResource_1.default)(categories_schema_1.categoryByNameSchema), categories_controller_1.getCategoryByNameHandler);
exports.default = router;
//# sourceMappingURL=categories.routes.js.map