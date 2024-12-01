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
/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();
const config_1 = __importDefault(require("config"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const AppError_1 = __importDefault(require("./utils/AppError"));
const logger_1 = __importDefault(require("./utils/logger"));
const error_controller_1 = __importDefault(require("./controller/error.controller"));
const app = (0, express_1.default)();
// NOTE: Global Middleware
// Security HTTP Headers
app.use((0, helmet_1.default)());
// Rate Limiter for requests from the same ip
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour! ',
});
app.use('/api', limiter);
// Body parser , reading data from body int req.body
app.use(express_1.default.json({ limit: '10kb' }));
// TODO: Data sanitization against SQL XSS
// app.use(xss());
// Prevent parameter pollution
// Serving static files
app.use(express_1.default.static(`${__dirname}/public`));
// Test Middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    // console.log(req.headers);
    next();
});
// start routes
app.use(routes_1.default);
// NOTE: this route will catch all undefined routes
app.all('*', (req, res, next) => {
    next(new AppError_1.default(`Can't find on this server! ${req.originalUrl}`, 404));
});
app.use(error_controller_1.default);
//
// Server configurations
const port = config_1.default.get('port');
const server = app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Listening on port http://localhost:${port}`);
    // connectToDb();
}));
////////////////////////////////////////////////////////////////////////////
/* handle Unhandled Rejection  */
process.on('unhandledRejection', (err) => {
    logger_1.default.error(err);
    logger_1.default.error('Unhandled Rejection 💥 shutting down.....');
    server.close(() => {
        process.exit(1);
    });
});
/* handle Uncaught Exception  */
process.on('uncaughtException', (err) => {
    logger_1.default.error(err);
    logger_1.default.error('Uncaught Exception 💥 shutting down.....');
    process.exit(1);
});
exports.default = app;
//# sourceMappingURL=app.js.map