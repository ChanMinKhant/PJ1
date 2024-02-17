const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Please enter a student name'],
    trim: true,
    minlength: 3,
  },
  studentEmail: {
    type: String,
    required: [true, 'Please enter an email'],
    trim: true,
    lowercase: true,
    studentEmail: {
      type: String,
      required: [true, 'Please enter an email'],
      trim: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return (
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
            email.endsWith('@ucspyay.edu.mm')
          );
        },
        message: 'Please enter a valid UCSPYAY email address without spaces',
      },
    },
  },
  rollNo: {
    type: String,
    required: [true, 'Please enter a roll number'],
    unique: [true, 'Roll number already exists'],
  },
  section: {
    type: String,
    enum: ['A', 'B', 'C', 'D'],
    required: [true, 'Please enter a section'],
  },
  year: {
    type: String,
    enum: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    required: [true, 'Please enter a grade'],
  },
  major: {
    type: String,
    enum: ['CS', 'CT'],
    required: [true, 'Please enter a major'],
  },
  semester: {
    type: String,
    enum: ['First', 'Second'],
    required: [true, 'Please enter a semester'],
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
