"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./user.routes"));
const categories_routes_1 = __importDefault(require("./categories.routes"));
const products_routes_1 = __importDefault(require("./products.routes"));
const logger_1 = __importDefault(require("../utils/logger"));
const router = express_1.default.Router();
router.get('/healthCheck', (_, res) => {
    logger_1.default.info('The Api is Working');
    res.sendStatus(200);
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
router.get('/', (req, res) => {
    return res.send('Express Typescript on Vercel !!!!!');
});
router.use('/api/users', user_routes_1.default);
router.use('/api/categories', categories_routes_1.default);
router.use('/api/products', products_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map