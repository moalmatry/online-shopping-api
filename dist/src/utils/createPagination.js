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
exports.createPaginationPrisma = void 0;
// createPagination;
const createPaginationPrisma = (currentPage, currentLimit, document) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const page = (_a = parseInt(String(currentPage))) !== null && _a !== void 0 ? _a : 1;
    const limit = (_b = parseInt(String(currentLimit))) !== null && _b !== void 0 ? _b : 10;
    const startIndex = (page - 1) * limit;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   @ts-expect-error
    const total = yield document.count();
    return { startIndex, limit, total };
});
exports.createPaginationPrisma = createPaginationPrisma;
//# sourceMappingURL=createPagination.js.map