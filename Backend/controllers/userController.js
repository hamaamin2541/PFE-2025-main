import User from '../models/User.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage: storage });

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Store the complete path
    user.profileImage = `uploads/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile image uploaded successfully',
      imagePath: user.profileImage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error uploading profile image',
      error: error.message
    });
  }
};

export const getUser = (req, res) => {
    res.status(200).json({ success: true, message: 'User fetched successfully' });
};
  
export const updateUser = (req, res) => {
    res.status(200).json({ success: true, message: 'User updated successfully' });
};

export const updateUserProfile = async (req, res) => {
  try {
    const { fullName, email, phone, bio } = req.body;

    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Update fields if provided
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        bio: user.bio,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating profile'
    });
  }
};
  
export const deleteUserAccount = (req, res) => {
    res.status(200).json({ success: true, message: 'User account deleted successfully' });
};

export const getDashboard = async (req, res, next) => {
  try {
    console.log('Fetching dashboard data for user:', req.user._id);
    
    const user = await User.findById(req.user._id)
      .select('-password')
      .lean();

    if (!user) {
      console.log('User not found:', req.user._id);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    console.log('User data found:', user);
    return res.status(200).json({
      success: true,
      data: {
        ...user,
        phone: user.phone || '',
        bio: user.bio || '',
        courses: [],
        isNewStudent: true
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    next(error);
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Error changing password'
    });
  }
};

export const getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role })
      .select('fullName email profileImage phone bio')
      .lean();

    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    console.error('Error fetching users by role:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('fullName email profileImage specialty bio')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user'
    });
  }
};

export const getTeacherProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    const user = await User.findById(req.user._id)
      .select('fullName email profileImage specialty bio phone role')
      .lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Teacher not found'
      });
    }

    if (user.role !== 'teacher') {
      return res.status(403).json({
        success: false,
        message: 'User is not a teacher'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get teacher profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};