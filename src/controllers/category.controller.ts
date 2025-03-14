import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Category from '../models/category.model';
import { ICategory } from '../interfaces/category.interface';

// Mock data for testing
const mockCategories: ICategory[] = [
  {
    _id: '60d21b4667d0d8992e610c85',
    name: 'Electronics',
    description: 'All electronic devices and accessories',
    image: 'https://example.com/images/electronics.jpg',
    isActive: true,
    isFavorite: true
  },
  {
    _id: '60d21b4667d0d8992e610c86',
    name: 'Clothing',
    description: 'Men, women, and children apparel',
    image: 'https://example.com/images/clothing.jpg',
    isActive: true,
    isFavorite: false
  },
  {
    _id: '60d21b4667d0d8992e610c87',
    name: 'Books',
    description: 'Fiction and non-fiction books',
    image: 'https://example.com/images/books.jpg',
    isActive: true,
    isFavorite: true
  },
  {
    _id: '60d21b4667d0d8992e610c88',
    name: 'Home & Kitchen',
    description: 'Home decor and kitchen appliances',
    image: 'https://example.com/images/home.jpg',
    isActive: false,
    isFavorite: false
  },
  {
    _id: '60d21b4667d0d8992e610c89',
    name: 'Sports',
    description: 'Sports equipment and accessories',
    image: 'https://example.com/images/sports.jpg',
    isActive: true,
    isFavorite: false
  }
];

// Helper function to simulate database operations with delay
const simulateDelay = (ms: number = 200) => new Promise(resolve => setTimeout(resolve, ms));

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Simulate database operation
    await simulateDelay();
    
    const { name, description, image, isActive, isFavorite } = req.body;
    
    // Create a new mock category
    const newCategory: ICategory = {
      _id: `mock_${Date.now()}`,
      name,
      description,
      image,
      isActive: isActive !== undefined ? isActive : true,
      isFavorite: isFavorite !== undefined ? isFavorite : false
    };
    
    // Add to mock data (for in-memory persistence during testing)
    mockCategories.push(newCategory);
    
    res.status(201).json(newCategory);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    // Simulate database operation
    await simulateDelay();
    
    // Return all mock categories
    res.json(mockCategories);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get active categories for displaying in app
export const getCategoryList = async (req: Request, res: Response) => {
  try {
    // Simulate database operation
    await simulateDelay();
    
    // Filter only active categories and sort by name
    const activeCategories = mockCategories
      .filter(category => category.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
    
    res.json(activeCategories);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    // Simulate database operation
    await simulateDelay();
    
    const category = mockCategories.find(cat => cat._id === req.params.id);
    
    if (category) {
      res.json(category);
    } else {
      //
    }
  } catch (error: any) {
    
    res.status(500).json({ message: 'Server error' });
  }
};

// Update category by ID
export const updateCategory = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Simulate database operation
    await simulateDelay();
    
    const { name, description, image, isActive, isFavorite } = req.body;
    const categoryIndex = mockCategories.findIndex(cat => cat._id === req.params.id);
    
    if (categoryIndex !== -1) {
      // Update category fields
      const updatedCategory = {
        ...mockCategories[categoryIndex],
        name: name !== undefined ? name : mockCategories[categoryIndex].name,
        description: description !== undefined ? description : mockCategories[categoryIndex].description,
        image: image !== undefined ? image : mockCategories[categoryIndex].image,
        isActive: isActive !== undefined ? isActive : mockCategories[categoryIndex].isActive,
        isFavorite: isFavorite !== undefined ? isFavorite : mockCategories[categoryIndex].isFavorite
      };
      
      // Replace in the mock data array
      mockCategories[categoryIndex] = updatedCategory;
      
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete category by ID
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    // Simulate database operation
    await simulateDelay();
    
    const categoryIndex = mockCategories.findIndex(cat => cat._id === req.params.id);
    
    if (categoryIndex !== -1) {
      // Remove from mock data array
      mockCategories.splice(categoryIndex, 1);
      
      res.json({ message: 'Category removed' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Toggle category favorite status
export const toggleFavorite = async (req: Request, res: Response) => {
  try {
    // Simulate database operation
    await simulateDelay();
    
    const categoryIndex = mockCategories.findIndex(cat => cat._id === req.params.id);
    
    if (categoryIndex !== -1) {
      // Toggle the isFavorite property
      mockCategories[categoryIndex].isFavorite = !mockCategories[categoryIndex].isFavorite;
      
      res.json(mockCategories[categoryIndex]);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get only favorite categories
export const getFavoriteCategories = async (req: Request, res: Response) => {
  try {
    // Simulate database operation
    await simulateDelay();
    
    // Filter only favorite and active categories
    const favoriteCategories = mockCategories
      .filter(category => category.isFavorite && category.isActive)
      .sort((a, b) => a.name.localeCompare(b.name));
    
    res.json(favoriteCategories);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error' });
  }
};