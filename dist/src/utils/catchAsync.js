"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
/** catch all errors in asynchronous function */
function default_1(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
}
//# sourceMappingURL=catchAsync.js.map