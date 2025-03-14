import express from 'express';
import { protect, authorize } from './../../../middlewares/auth.middleware';
import { asyncHandler } from './../../../utils/asyncHandler.util';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from './../../../controllers/category.controller';
import { categoryValidationRules } from './../../../utils/validation.util';

const router = express.Router();

//router.post('/', protect, authorize('admin'), categoryValidationRules.create(), createCategory);
router.post('/', categoryValidationRules.create(), createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
//router.put('/:id', protect, authorize('admin'), categoryValidationRules.update(), updateCategory);
router.put('/:id', categoryValidationRules.update(), updateCategory);
router.delete('/:id', protect, authorize('admin'), deleteCategory);

export default router;