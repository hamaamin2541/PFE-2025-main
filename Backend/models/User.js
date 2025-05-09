import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'teacher'],
    required: true
  },
  studentCard: {
    type: String,
    required: function() { return this.role === 'student' }
  },
  teacherId: {
    type: String,
    required: function() { return this.role === 'teacher' }
  },
  paymentInfo: {
    cardNumber: {
      type: String,
      required: function() { return this.role === 'teacher' }
    },
    expiryMonth: {
      type: String,
      required: function() { return this.role === 'teacher' }
    },
    expiryYear: {
      type: String,
      required: function() { return this.role === 'teacher' }
    },
    cardHolderName: {
      type: String,
      required: function() { return this.role === 'teacher' }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model('User', userSchema);
