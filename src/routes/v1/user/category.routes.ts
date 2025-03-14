import express from 'express';
import { getCategoryList } from './../../../controllers/category.controller';

const router = express.Router();

router.get('/', getCategoryList);
router.post('/', getCategoryList);

export default router;