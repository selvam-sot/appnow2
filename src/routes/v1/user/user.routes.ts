// src/routes/user.routes.ts

import express from 'express';
import { 
    signupUser,
    loginUser,
    activateUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    deleteUserAccount
} from '@controllers/user.controller';
import { protect, authorize } from '@middlewares/auth.middleware';
import { 
    userValidationRules
} from '@utils/validation.util';
import { validate } from '@middlewares/validator.middleware';

const router = express.Router();

//router.use(protect);

// Public routes
//router.post('/', vendorValidationRules.create(), createVendor);

router.post('/signup', userValidationRules.create(), signupUser);
router.post('/login', userValidationRules.login(), validate, loginUser);
router.get('/activate/:activationToken', activateUser);

// Protected routes
router.post('/logout', protect, logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, userValidationRules.update(), validate, updateUserProfile);
router.delete('/account', authorize('admin'), deleteUserAccount);

export default router;