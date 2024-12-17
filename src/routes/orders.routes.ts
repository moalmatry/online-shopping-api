import express from 'express';
import {
  createOrderHandler,
  deleteOrderHandler,
  getAllOrdersHandler,
  updateOrderHandler,
} from '../controller/order.controller';
import { protect } from '../middleware/protectResource';
import { restrictTo } from '../middleware/restrictTo';

const router = express.Router();

// NOTE: user routes
router
  .route('/')
  .get(protect, getAllOrdersHandler)
  .post(protect, createOrderHandler)
  .delete(protect, deleteOrderHandler)
  .patch(protect, restrictTo('ADMIN', 'EMPLOYEE'), updateOrderHandler);
router.get('/:id');
export default router;
