import express from 'express';
import {
  createCategoryHandler,
  deleteCategoryHandler,
  getAllCategoriesHandler,
  getCategoryByIdHandler,
  updateCategoryHandler,
} from '../controller/categories.controller';
import { protect } from '../middleware/protectResource';
import { restrictTo } from '../middleware/restrictTo';
import validateResource from '../middleware/validateResource';
import { categoryByIdSchema, createCategorySchema, updateCategorySchema } from '../schema/categories.schema';

const router = express.Router();

router
  .route('/')
  .get(getAllCategoriesHandler)
  .post(validateResource(createCategorySchema), protect, restrictTo('ADMIN', 'EMPLOYEE'), createCategoryHandler)
  .patch(validateResource(updateCategorySchema), protect, restrictTo('ADMIN', 'EMPLOYEE'), updateCategoryHandler)
  .delete(protect, restrictTo('ADMIN', 'EMPLOYEE'), deleteCategoryHandler);
router.get('/:id', validateResource(categoryByIdSchema), getCategoryByIdHandler);

export default router;
