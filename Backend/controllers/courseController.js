import Course from '../models/Course.js';

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ success: true, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }
    
    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create a new course
export const createCourse = async (req, res) => {
  try {
    let courseData = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      language: req.body.language,
      level: req.body.level,
      teacher: req.user._id,
      coverImage: req.files?.coverImage ? req.files.coverImage[0].path : null
    };

    if (req.body.sections) {
      const parsedSections = JSON.parse(req.body.sections);
      courseData.sections = parsedSections.map(section => ({
        title: section.title,
        description: section.description,
        resources: section.resources.map(resource => ({
          name: resource.name,
          type: resource.type,
          file: resource.file?.path || '',
          size: Number(resource.size) || 0
        }))
      }));
    }

    const course = await Course.create(courseData);
    res.status(201).json({
      success: true,
      data: course
    });

  } catch (error) {
    console.error('Course creation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating course'
    });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    // Handle file uploads
    const updateData = { ...req.body };
    
    // Update cover image if provided
    if (req.files && req.files.coverImage) {
      updateData.coverImage = req.files.coverImage[0].path;
    }

    // Parse and update sections if provided
    if (req.body.sections) {
      try {
        updateData.sections = JSON.parse(req.body.sections);
      } catch (err) {
        console.error('Error parsing sections:', err);
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid sections data format' 
        });
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedCourse
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating course'
    });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ 
        success: false, 
        message: 'Course not found' 
      });
    }

    // Check if the logged-in teacher owns this course
    if (course.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false, 
        message: 'Not authorized to delete this course' 
      });
    }

    await Course.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
      success: true, 
      message: 'Course deleted successfully' 
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Error deleting course' 
    });
  }
};

// Enroll a student in a course
export const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.students.includes(req.user.id)) {
      return res.status(400).json({ success: false, message: 'Already enrolled in this course' });
    }

    course.students.push(req.user.id);
    await course.save();

    res.status(200).json({ success: true, message: 'Enrolled successfully', data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get teacher's courses
export const getTeacherCourses = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id });
    res.status(200).json({ 
      success: true, 
      data: courses 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Get courses by teacher
export const getCoursesByTeacher = async (req, res) => {
  try {
    const courses = await Course.find({ teacher: req.user._id });
    res.status(200).json({
      success: true,
      data: courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get course count
export const getCourseCount = async (req, res) => {
  try {
    const count = await Course.countDocuments({ teacher: req.user._id });
    res.status(200).json({
      success: true,
      count
    });
  } catch (error) {
    res.status(500).json({
      success: false, 
      message: error.message
    });
  }
};

// Get teacher analytics
export const getTeacherAnalytics = async (req, res) => {
  try {
    const teacherId = req.user._id;
    
    const courses = await Course.find({ teacher: teacherId })
      .populate('students')
      .populate('enrollments.student')
      .populate('ratings.user');

    // Calculate statistics
    const stats = {
      totalStudents: 0,
      totalCourses: courses.length,
      totalRevenue: 0,
      averageRating: 0
    };

    let totalRatings = 0;
    let ratingCount = 0;

    courses.forEach(course => {
      // Count unique students
      stats.totalStudents += course.students?.length || 0;
      
      // Calculate revenue
      stats.totalRevenue += (course.price * (course.students?.length || 0));
      
      // Calculate average rating
      course.ratings?.forEach(rating => {
        totalRatings += rating.value;
        ratingCount++;
      });
    });

    stats.averageRating = ratingCount > 0 ? 
      (totalRatings / ratingCount).toFixed(1) : 
      0;

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching analytics',
      error: error.message
    });
  }
};
