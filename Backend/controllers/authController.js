import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const { email, fullName, password, role, studentCard, teacherId, paymentInfo } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
    }

    // Create user object with required fields
    const userData = {
      fullName,
      email,
      password,
      role,
    };

    // Add role-specific data
    if (role === 'student' && studentCard) {
      userData.studentCard = studentCard;
    } else if (role === 'teacher') {
      if (teacherId) {
        userData.teacherId = teacherId;
      }
      if (paymentInfo) {
        userData.paymentInfo = paymentInfo;
      }
    }

    // Create a new user
    const user = await User.create(userData);

    const token = user.getSignedJwtToken();

    // Return the user data
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        studentCard: user.studentCard,
        teacherId: user.teacherId,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.getSignedJwtToken();
    res.json({ success: true, token, role: user.role });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
