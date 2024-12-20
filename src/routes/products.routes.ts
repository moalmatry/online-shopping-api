import express from 'express';
import {
  createNewProductHandler,
  deleteProductHandler,
  getAllProductsHandler,
  getProductByIdHandler,
  updateProductHandler,
} from '../controller/products.controller';
import { protect } from '../middleware/protectResource';
import { restrictTo } from '../middleware/restrictTo';
import validateResource from '../middleware/validateResource';
import { createProductSchema, deleteProductSchema, productById, updateProductSchema } from '../schema/products.schema';

const router = express.Router();
router
  .route('/')
  .get(getAllProductsHandler)
  .post(validateResource(createProductSchema), protect, restrictTo('ADMIN', 'EMPLOYEE'), createNewProductHandler)
  .patch(validateResource(updateProductSchema), protect, restrictTo('ADMIN', 'EMPLOYEE'), updateProductHandler)
  .delete(validateResource(deleteProductSchema), protect, restrictTo('ADMIN', 'EMPLOYEE'), deleteProductHandler);

router.get('/:id', validateResource(productById), getProductByIdHandler);

export default router;
