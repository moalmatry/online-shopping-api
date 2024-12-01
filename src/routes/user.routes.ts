import express from 'express';
import validateResource from '../middleware/validateResource';
import {
  createUserSchema,
  deleteUserSchema,
  getAllUsersSchema,
  restoreUserSchema,
  updateMeSchema,
  updatePasswordSchema,
  updateUserSchema,
  verifyUserSchema,
} from '../schema/user.schema';

import { forgotPasswordSchema, resetPasswordSchema } from './../schema/user.schema';
import { createSessionSchema } from '../schema/auth.schema';
import {
  loginHandler,
  signupHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
  verifyUserHandler,
  updatePasswordHandler,
} from '../controller/auth.controller';
import {
  deleteMeHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getMeHandler,
  restoreUserHandler,
  updateMeHandler,
  updateUserHandler,
} from '../controller/user.controller';
import { protect } from '../middleware/protectResource';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();

// NOTE: Authentication Routes
router.post('/signup', validateResource(createUserSchema), signupHandler);

router.post('/login', validateResource(createSessionSchema), loginHandler);

// NOTE: Verification & Reset Password Routes &
router.post('/verify/:id/:verificationCode', validateResource(verifyUserSchema), verifyUserHandler);

router.post('/forgot-password', validateResource(forgotPasswordSchema), forgotPasswordHandler);

router.post('/reset-password/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordHandler);

router.patch('/update-password', validateResource(updatePasswordSchema), protect, updatePasswordHandler);

// NOTE: Update & delete user information

router.patch('/update-me', validateResource(updateMeSchema), protect, updateMeHandler);

router.delete('/delete-me', protect, deleteMeHandler);

router.get('/me', protect, getMeHandler);

// NOTE: Start admin routes
router.get('/', validateResource(getAllUsersSchema), protect, restrictTo('ADMIN', 'EMPLOYEE'), getAllUsersHandler);
router.patch(
  '/restore-user',
  validateResource(restoreUserSchema),
  protect,
  restrictTo('ADMIN', 'EMPLOYEE'),
  restoreUserHandler,
);
router.patch(
  '/update-user',
  validateResource(updateUserSchema),
  protect,
  restrictTo('ADMIN', 'EMPLOYEE'),
  updateUserHandler,
);
router.delete('/delete-user', validateResource(deleteUserSchema), protect, deleteUserHandler);

export default router;
