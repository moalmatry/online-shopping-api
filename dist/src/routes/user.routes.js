"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const user_schema_1 = require("../schema/user.schema");
const user_schema_2 = require("./../schema/user.schema");
const auth_schema_1 = require("../schema/auth.schema");
const auth_controller_1 = require("../controller/auth.controller");
const user_controller_1 = require("../controller/user.controller");
const protectResource_1 = require("../middleware/protectResource");
const restrictTo_1 = require("../middleware/restrictTo");
const router = express_1.default.Router();
// NOTE: Authentication Routes
router.post('/signup', (0, validateResource_1.default)(user_schema_1.createUserSchema), auth_controller_1.signupHandler);
router.post('/login', (0, validateResource_1.default)(auth_schema_1.createSessionSchema), auth_controller_1.loginHandler);
// NOTE: Verification & Reset Password Routes &
router.post('/verify/:id/:verificationCode', (0, validateResource_1.default)(user_schema_1.verifyUserSchema), auth_controller_1.verifyUserHandler);
router.post('/forgot-password', (0, validateResource_1.default)(user_schema_2.forgotPasswordSchema), auth_controller_1.forgotPasswordHandler);
router.post('/reset-password/:id/:passwordResetCode', (0, validateResource_1.default)(user_schema_2.resetPasswordSchema), auth_controller_1.resetPasswordHandler);
router.patch('/update-password', (0, validateResource_1.default)(user_schema_1.updatePasswordSchema), protectResource_1.protect, auth_controller_1.updatePasswordHandler);
// NOTE: Update & delete user information
router.patch('/update-me', (0, validateResource_1.default)(user_schema_1.updateMeSchema), protectResource_1.protect, user_controller_1.updateMeHandler);
router.delete('/delete-me', protectResource_1.protect, user_controller_1.deleteMeHandler);
router.get('/me', protectResource_1.protect, user_controller_1.getMeHandler);
// NOTE: Start admin routes
router.get('/', (0, validateResource_1.default)(user_schema_1.getAllUsersSchema), protectResource_1.protect, (0, restrictTo_1.restrictTo)('ADMIN', 'EMPLOYEE'), user_controller_1.getAllUsersHandler);
router.patch('/restore-user', (0, validateResource_1.default)(user_schema_1.restoreUserSchema), protectResource_1.protect, (0, restrictTo_1.restrictTo)('ADMIN', 'EMPLOYEE'), user_controller_1.restoreUserHandler);
router.patch('/update-user', (0, validateResource_1.default)(user_schema_1.updateUserSchema), protectResource_1.protect, (0, restrictTo_1.restrictTo)('ADMIN', 'EMPLOYEE'), user_controller_1.updateUserHandler);
router.delete('/delete-user', (0, validateResource_1.default)(user_schema_1.deleteUserSchema), protectResource_1.protect, user_controller_1.deleteUserHandler);
exports.default = router;
//# sourceMappingURL=user.routes.js.map