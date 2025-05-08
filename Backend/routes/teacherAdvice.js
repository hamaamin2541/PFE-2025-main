import express from 'express';
import { protect } from '../middleware/auth.js';
import { getAllAdvice, createAdvice } from '../controllers/teacherAdviceController.js';

const router = express.Router();

// Public routes
router.get('/all', getAllAdvice);

// Protected routes
router.use(protect);
router.post('/', createAdvice);

export default router;
