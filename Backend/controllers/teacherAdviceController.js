import TeacherAdvice from '../models/TeacherAdvice.js';

export const getAllAdvice = async (req, res) => {
  try {
    const advice = await TeacherAdvice.find()
      .populate('teacher', 'fullName email profileImage specialty')
      .sort('-createdAt')
      .lean();

    res.status(200).json({
      success: true,
      data: advice
    });
  } catch (error) {
    console.error('Error fetching advice:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching teacher advice'
    });
  }
};

export const createAdvice = async (req, res) => {
  try {
    const { content, type, videoUrl } = req.body;
    
    const newAdvice = new TeacherAdvice({
      content,
      type,
      videoUrl,
      teacher: req.user._id // This comes from the auth middleware
    });

    const savedAdvice = await newAdvice.save();
    
    // Populate teacher details
    await savedAdvice.populate('teacher', 'fullName');

    res.status(201).json({
      success: true,
      data: savedAdvice
    });
  } catch (error) {
    console.error('Error creating advice:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating advice'
    });
  }
};
