import express from 'express';
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from './../../../controllers/category.controller';

const router = express.Router();

//router.post('/', protect, authorize('admin'), categoryValidationRules.create(), createCategory);
router.post('/', createCategory);
router.get('/', getCategories);
router.get('/:id', getCategoryById);
//router.put('/:id', protect, authorize('admin'), categoryValidationRules.update(), updateCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;