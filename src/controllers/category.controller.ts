import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Category from '../models/category.model';
import logger from '../config/logger';
import { AppError } from '../utils/appError.util';

export const createCategory = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, description, image } = req.body;
        const category = new Category({ name, description, image });
        await category.save();
        res.status(201).json(category);
    } catch (error: any) {
        logger.error(`Error in creating category: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find().sort({name: 1});
        res.json(categories);
    } catch (error: any) {
        logger.error(`Error in fetching categories: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            res.json(category);
        } else {
            //res.status(404).json({ message: 'Category not found' });
            throw new AppError('Category not found', 404);
        }
    } catch (error: any) {
        logger.error(`Error in fetching category: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, description, image } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { name, description, image },
            { new: true }
        );
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error: any) {
        logger.error(`Error in updating category: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (category) {
            res.json({ message: 'Category removed' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (error: any) {
        logger.error(`Error in deleting category: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};


// General functions
export const getCategoryList = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({
            isActive: true
        }).sort({name: 1});
        console.log("Categories request from app", categories)
        res.json(categories);
    } catch (error: any) {
        logger.error(`Error in fetching categories: ${error.message}`);
        res.status(500).json({ message: 'Server error' });
    }
};