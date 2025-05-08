import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { getCourses, getCourseById, createCourse, deleteCourse, enrollInCourse, getTeacherCourses, updateCourse, getCoursesByTeacher, getCourseCount, getTeacherAnalytics } from '../controllers/courseController.js';

const router = express.Router();

// Teacher analytics route
router.get('/teacher/analytics', protect, authorize('teacher'), getTeacherAnalytics);

// Get all courses
router.get('/', getCourses);

// Protected teacher routes
router.use('/teacher-courses', protect, authorize('teacher'));
router.get('/teacher-courses', getCoursesByTeacher);
router.get('/teacher/courses/count', getCourseCount);

// Get teacher's courses
router.get('/teacher-courses', protect, authorize('teacher'), getTeacherCourses);

// Get single course
router.get('/:id', protect, authorize('teacher'), getCourseById);

// Create a new course (only teachers)
router.post('/', 
  protect, 
  authorize('teacher'), 
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'resources', maxCount: 10 }
  ]), 
  createCourse
);

// Update a course (only teachers)
router.put('/:id', 
  protect, 
  authorize('teacher'),
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'resources', maxCount: 10 }
  ]),
  updateCourse
);

// Delete a course (only teachers)
router.delete('/:id', protect, authorize('teacher'), deleteCourse);

// Enroll in a course
router.post('/:id/enroll', protect, authorize('student'), enrollInCourse);

export default router;
