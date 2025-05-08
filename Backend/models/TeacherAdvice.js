import mongoose from 'mongoose';

const teacherAdviceSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  teacherName: {
    type: String,
    required: false // Make it optional since we'll get it from the teacher reference
  },
  type: {
    type: String,
    enum: ['text', 'video'],
    default: 'text' // Add default value
  },
  videoUrl: {
    type: String,
    required: function() {
      return this.type === 'video';
    }
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TeacherAdvice', teacherAdviceSchema);
