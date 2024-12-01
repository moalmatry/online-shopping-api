"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controller/products.controller");
const protectResource_1 = require("../middleware/protectResource");
const restrictTo_1 = require("../middleware/restrictTo");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const categories_schema_1 = require("../schema/categories.schema");
const products_schema_1 = require("../schema/products.schema");
const router = express_1.default.Router();
router
    .route('/')
    .get(products_controller_1.getAllProductsHandler)
    .post((0, validateResource_1.default)(products_schema_1.createProductSchema), protectResource_1.protect, (0, restrictTo_1.restrictTo)('ADMIN', 'EMPLOYEE'), products_controller_1.createNewProductHandler)
    .patch((0, validateResource_1.default)(categories_schema_1.updateCategorySchema), protectResource_1.protect, (0, restrictTo_1.restrictTo)('ADMIN', 'EMPLOYEE'))
    .delete((0, validateResource_1.default)(products_schema_1.deleteProductSchema), protectResource_1.protect, (0, restrictTo_1.restrictTo)('ADMIN', 'EMPLOYEE'), products_controller_1.deleteProductHandler);
router.get('/:name', (0, validateResource_1.default)(products_schema_1.productByNameSchema), products_controller_1.findProductByNameHandler);
exports.default = router;
//# sourceMappingURL=products.routes.js.map